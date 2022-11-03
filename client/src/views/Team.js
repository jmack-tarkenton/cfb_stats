import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import NextEvent from './partials/NextMatchup';
import TeamCard from '../components/cards/TeamCard';
import BarChart from '../components/charts/BarChart';



function Team(props) {
    const { team_id } = useParams();

    const [team, setTeam] = useState({});
    const [nextMatchup, setNextMatchup] = useState(null);

    const getTeamInfo = async (team_id) => {

        const response = await fetch(`/api/cfb/team/${team_id}/information`);
        const team = await response.json();
        console.log({ team });
        if (response.status !== 200) {
            throw Error(team)
        }
        let { nextEvent, displayName } = team;
        if (nextEvent) {
            setNextMatchup(nextEvent);
        }
        return team;

    }



    useEffect(() => {
        getTeamInfo(team_id)
            .then(setTeam)
    }, [team_id]);


    const createTeamSummary = function (team) {
        console.log({ team })
        let { id, abbreviation, displayName, logos, nextEvent, record, standingSummary, rank } = team;

        let short_date;
        let short_name;
        if (nextEvent && nextEvent[0]) {
            short_date = nextEvent[0]?.date;
            short_name = nextEvent[0]?.name;
            if (short_date) {
                short_date = new Date(nextEvent[0].date).toLocaleDateString('en-US')
            }
        }
        return {
            id,
            abbreviation,
            title: displayName,
            logo: logos[0]?.href,
            "Next Game": `${short_name} on ${short_date}`,
            record: record.items[0],
            rank,
            standing: standingSummary
        }
    }

    const createDataSetsFromTeamRecordStats = (stats, teamInfo) => {
        const { color, alternateColor, abbreviation } = teamInfo;
        var data = stats.map((stat) => stat.value >= 5 && stat.name.toLowerCase().includes("points") && stat)
            .filter(x => x);

        const labels = data.map(({ name }) => name);

        const datasets = [{
            label: abbreviation,
            backgroundColor: "#" + color,
            borderColor: "#" + alternateColor,
            data: data.map(({ value }) => value),
        }]

        return {
            labels,
            datasets
        }
    }

    const { color, alternateColor, abbreviation } = team;
    const style = { color: "#" + color, backgroundColor: "#" + alternateColor };



    return (
        <Row >

            <Col xs={12} sm={12}>
                {team && team["displayName"] && <TeamCard customStyle={style} {...createTeamSummary(team)}>
                    <Row>
                        <Col sm={6}>

                        </Col>
                        <Col sm={6}>
                            <BarChart {...createDataSetsFromTeamRecordStats(team.record.items[0].stats, { color, alternateColor, abbreviation })} />
                        </Col>
                    </Row>
                </TeamCard>}
            </Col>
            <Col xs={12} sm={12}>
                {nextMatchup && nextMatchup[0] ? <NextEvent {...nextMatchup[0]} /> : <p>This team is coming up on a bye week. Check back next week.</p>}

            </Col>
        </Row>
    );

}

export default Team;