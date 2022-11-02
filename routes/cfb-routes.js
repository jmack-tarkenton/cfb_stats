const express = require('express')
const router = express.Router()
const sdv = require("sportsdataverse");

const fbsTeamGroupId = 80;
const currentYear = 2022;
router.get('/teams', async (req, res) => {
    try {
        const teams = await sdv.cfb.getTeamList(fbsTeamGroupId);
        const ncaaTeams = teams.sports[0].leagues[0].teams;
        ncaaTeams.sort((a, b) => parseInt(a.team.id) - parseInt(b.team.id));
        res.json(ncaaTeams);

    } catch (error) {
        console.error({ error })
        res.json({ error })
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
        res.json({ error })
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
        res.json({ error })
    }
});

router.get('/teams/standings/top25', async (req, res) => {
    try {
        // const teams = await sdv.cfb.getTeamList(conference_id);
        const { standings } = await sdv.cfb.getStandings(currentYear);
        const entries = standings.entries.filter(({ team }) => team.rank <= 25 && team.rank > 0);

        entries.sort((a, b) => a.team.rank - b.team.rank);

        // const ncaaTeams = teams.sports[0].leagues[0].teams;
        const ncaaTeams = entries.slice(0, 25).map(({ team, stats }) => {
            return {
                id: team.id,
                abbreviation: team.abbreviation,
                name: team.displayName,
                rank: team.rank,
                logo: team.logos[0]?.href ?? ""

            }
        });

        res.json(ncaaTeams);

    } catch (error) {
        console.error({ error })
        res.json({ error })
    }
});


router.get('/team/:team_id/information', async (req, res) => {
    const { team_id } = req.params;
    try {
        const { team } = await sdv.cfb.getTeamInfo(team_id);
        // const {team} = await sdv.cfb.getTeamPlayers(team_id);
        // team.players=players;
        res.json(team);

    } catch (error) {
        console.error({ error })
        res.json({ error })
    }
});

router.get('/team/:team_id/players', async (req, res) => {
    const { team_id } = req.params;
    try {
        const { players } = await sdv.cfb.getTeamPlayers(team_id);
        res.json(players);

    } catch (error) {
        console.error({ error })
        res.json({ error })
    }
});

router.get('/games/:game_id', async (req, res) => {
    const { game_id } = req.params;
    try {
        const game=await sdv.cfb.getSummary(game_id);
        const picks=await sdv.cfb.getPicks(game_id);
        res.json({game,picks});

    } catch (error) {
        console.error({ error })
        res.json({ error })
    }
});



module.exports = router;