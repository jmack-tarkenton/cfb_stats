const express = require('express')
const router = express.Router();
const NodeCache = require("node-cache");
const sdv = require("sportsdataverse");

const fbsTeamGroupId = 80;
const currentYear = new Date().getFullYear();
const cfbCache = new NodeCache();

router.get('/teams', async (req, res) => {
    try {

        if (cfbCache.has('teams')) {
            const cachedTeams = cfbCache.get('teams');
            return res.json(JSON.parse(cachedTeams));
        }

        const teamList = await sdv.cfb.getTeamList(fbsTeamGroupId);

        const teams = teamList.sports[0].leagues[0].teams;

        const {standings} = await sdv.cfb.getStandings(currentYear);
        const top25 = standings.entries.filter(({team}) => team.rank <= 25 && team.rank > 0);

        var ncaaTeams = teams.map(({team}) => {
            return {
                id: team.id,
                abbreviation: team.abbreviation,
                name: team.displayName,
                rank: team.rank ?? 0,
                logo: team.logos[0]?.href ?? ""

            }
        })

        //Accurate rankings aren't included in the sdv.cfb.getTeamList() method 
        top25.forEach(({team}) => {
            const matchingTeam = ncaaTeams.find(({id}) => id == team.id);
            matchingTeam.rank = team.rank;
        })


        const sortedTeams = ncaaTeams.filter((team) => team.rank <= 25 && team.rank > 0)
            .sort((a, b) => (a.rank == 0 || b.rank == 0) ? 0 : a.rank > b.rank ? 1 : -1);

        const unrankedTeams = ncaaTeams.filter((team) => team.rank == 0);

        ncaaTeams = [...sortedTeams, ...unrankedTeams];

        cfbCache.set('teams', JSON.stringify(ncaaTeams));
        res.json(ncaaTeams);

    } catch (error) {
        console.error({error})
        // console.log({status:response.status})
        res.status(error.response.status).json({error})
    }
});

router.get('/conferences', async (req, res) => {
    try {
        const {conferences} = await sdv.cfb.getConferences(currentYear, fbsTeamGroupId);

        const ncaaConferences = conferences.map(({groupId, name, shortName, logo}) => {
            return {
                id: groupId,
                abbreviation: shortName,
                name,
                logo
            }
        }).filter(({id}) => id < fbsTeamGroupId);


        res.json(ncaaConferences);

    } catch (error) {
        console.error({error})
        res.status(error.response.status).json({error})
    }
});

router.get('/conferences/:conference_id/standings', async (req, res) => {
    try {
        const {conference_id} = req.params;
        const result = await sdv.cfb.getStandings({year:currentYear, group:conference_id});


        res.json(result);

    } catch (error) {
        console.error({error})
        res.status(error.response.status).json({error})
    }
});

router.get('/teams/conference/:conference_id', async (req, res) => {
    const {conference_id} = req.params;
    const fbsDivision = 11;
    try {
        const teams = await sdv.cfb.getTeamList(conference_id);


        const ncaaTeams = teams;

        // ncaaTeams.sort((a, b) => parseInt(a.team.id) - parseInt(b.team.id));
        res.json(ncaaTeams);

    } catch (error) {
        console.error({error})
        res.status(error.response.status).json({error})
    }
});


router.get('/team/:team_id/information', async (req, res) => {
    const {team_id} = req.params;
    try {
        if (cfbCache.has(`teamInfo_${team_id}`)) {
            const cachedTeamInfo = cfbCache.get(`teamInfo_${team_id}`);
            return res.json(JSON.parse(cachedTeamInfo));
        }

        const {team} = await sdv.cfb.getTeamInfo(team_id);
        cfbCache.set(`teamInfo_${team_id}`, JSON.stringify(team));
        res.json(team);

    } catch (error) {
        console.error({error})
        res.status(error.response.status).json({error})
    }
});

router.get('/team/:team_id/players', async (req, res) => {
    const {team_id} = req.params;
    try {
        const {players} = await sdv.cfb.getTeamPlayers(team_id);
        res.json(players);

    } catch (error) {
        console.error({error})
        res.status(error.response.status).json({error})
    }
});

router.get('/games/:game_id', async (req, res) => {
    const {game_id} = req.params;
    try {

        if (cfbCache.has(`game_${game_id}`)) {
            const cachedGame = cfbCache.get(`game_${game_id}`);
            return res.json(JSON.parse(cachedGame));
        }
        const game = await sdv.cfb.getSummary(game_id);
        const picks = await sdv.cfb.getPicks(game_id);
        cfbCache.set(`game_${game_id}`, JSON.stringify({game, picks}))
        res.json({game, picks});

    } catch (error) {
        console.error({error})
        res.status(error.response.status).json({error})
    }
});


module.exports = router;
