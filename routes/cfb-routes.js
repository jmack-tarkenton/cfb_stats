const express = require('express')
const router = express.Router()
const sdv = require("sportsdataverse");

const fbsTeamGroupId = 80;
const currentYear = 2022;
const cfbRouter = function (cfbCache) {
    router.get('/teams', async (req, res) => {
        try {

            if (cfbCache.has('teams')) {
                const cachedTeams = cfbCache.get('teams');
                return res.json(JSON.parse(cachedTeams));
            }

            const teams = await sdv.cfb.getTeamList(fbsTeamGroupId);
            const ncaaTeams = teams.sports[0].leagues[0].teams;
            ncaaTeams.sort((a, b) => parseInt(a.team.id) - parseInt(b.team.id));
            cfbCache.set('teams', JSON.parse(ncaaTeams));
            res.json(ncaaTeams);

        } catch (error) {
            console.error({ error })
            res.status(err.response.status).json({ error })
        }
    });

    router.get('/conferences', async (req, res) => {
        try {
            const { conferences } = await sdv.cfb.getConferences(currentYear, fbsTeamGroupId);

            const ncaaConferences = conferences.map(({ groupId, name, shortName, logo }) => {
                return {
                    id: groupId,
                    abbreviation: shortName,
                    name,
                    logo
                }
            }).filter(({ id }) => id < fbsTeamGroupId);


            res.json(ncaaConferences);

        } catch (error) {
            console.error({ error })
            res.status(err.response.status).json({ error })
        }
    });

    router.get('/teams/conference/:conference_id', async (req, res) => {
        const { conference_id } = req.params;
        const fbsDivision = 11;
        try {
            const teams = await sdv.cfb.getTeamList(conference_id);


            const ncaaTeams = teams;

            // ncaaTeams.sort((a, b) => parseInt(a.team.id) - parseInt(b.team.id));
            res.json(ncaaTeams);

        } catch (error) {
            console.error({ error })
            res.status(err.response.status).json({ error })
        }
    });

    router.get('/teams/standings/top25', async (req, res) => {
        try {
            // const teams = await sdv.cfb.getTeamList(conference_id);
            if (cfbCache.has('top25')) {
                const cachedTop25 = cfbCache.get('top25');
                return res.json(JSON.parse(cachedTop25));
            }
            const { standings } = await sdv.cfb.getStandings(currentYear);
            const entries = standings.entries.filter(({ team }) => team.rank <= 25 && team.rank > 0);

            entries.sort((a, b) => a.team.rank - b.team.rank);

            // const ncaaTeams = teams.sports[0].leagues[0].teams;
            // const ncaaTeams = entries.slice(0, 25).map(({ team, stats }) => {
            //     return {
            //         id: team.id,
            //         abbreviation: team.abbreviation,
            //         name: team.displayName,
            //         rank: team.rank,
            //         logo: team.logos[0]?.href ?? ""

            //     }
            // });
            var ncaaTeams = standings.entries.map(({ team, stats }) => {
                return {
                    id: team.id,
                    abbreviation: team.abbreviation,
                    name: team.displayName,
                    rank: team.rank || 0,
                    logo: team.logos[0]?.href ?? ""

                }
            })
            const sortedTeams = ncaaTeams.filter((team) => team.rank <= 25 && team.rank > 0)
                .sort((a, b) => (a.rank == 0 || b.rank == 0) ? 0 : a.rank > b.rank ? 1 : -1);

            const unrankedTeams = ncaaTeams.filter((team) => team.rank == 0);

            ncaaTeams = [...sortedTeams, ...unrankedTeams];

            cfbCache.set('top25', JSON.stringify(ncaaTeams));

            res.json(ncaaTeams);

        } catch (error) {
            console.error({ error })
            res.status(err.response.status).json({ error })
        }
    });


    router.get('/team/:team_id/information', async (req, res) => {
        const { team_id } = req.params;
        try {
            if (cfbCache.has(`teamInfo_${team_id}`)) {
                const cachedTeamInfo = cfbCache.get(`teamInfo_${team_id}`);
                return res.json(JSON.parse(cachedTeamInfo));
            }

            const { team } = await sdv.cfb.getTeamInfo(team_id);
            cfbCache.set(`teamInfo_${team_id}`, JSON.stringify(team));
            res.json(team);

        } catch (error) {
            console.error({ error })
            res.status(err.response.status).json({ error })
        }
    });

    router.get('/team/:team_id/players', async (req, res) => {
        const { team_id } = req.params;
        try {
            const { players } = await sdv.cfb.getTeamPlayers(team_id);
            res.json(players);

        } catch (error) {
            console.error({ error })
            res.status(err.response.status).json({ error })
        }
    });

    router.get('/games/:game_id', async (req, res) => {
        const { game_id } = req.params;
        try {

            if (cfbCache.has(`game_${game_id}`)) {
                const cachedGame = cfbCache.get(`game_${game_id}`);
                return res.json(JSON.parse(cachedGame));
            }
            const game = await sdv.cfb.getSummary(game_id);
            const picks = await sdv.cfb.getPicks(game_id);
            cfbCache.set(`game_${game_id}`, JSON.stringify({ game, picks }))
            res.json({ game, picks });

        } catch (error) {
            console.error({ error })
            res.status(err.response.status).json({ error })
        }
    });

    return router;
}




// module.exports = router;
module.exports = cfbRouter;