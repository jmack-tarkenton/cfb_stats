import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import CfbTable from '../components/Table';
import CfbNav from '../components/Navbar';
import NextEvent from './partials/NextMatchup';
import TeamCard from '../components/cards/TeamCard';
import BarChart from '../components/charts/BarChart';


function Team(props) {
    const [team, setTeam] = useState({});
    const [nextMatchup, setNextMatchup] = useState(null);
    const { team_id } = useParams();

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

        let { id, abbreviation, displayName, logos, nextEvent, record, standingSummary } = team;

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
            record: record.items[0].summary,
            standing: standingSummary
        }
    }

    function createTableDefinitions(team) {

        const cols = Object.keys(team).filter(col => col != "id");
        const rows = Object.values(team);

        return {
            cols,
            rows
        }

    }

    const { color, alternateColor } = team;
    const style = { width: "100%", color: "#" + color, backgroundColor: "#" + alternateColor };



    return (
        <>
            {/* {team && team.hasOwnProperty("displayName") && <CfbNav style={style} {...createTeamSummary(team)} />} */}
            <Row >

                <Col xs={12} sm={12}>
                    {team && team["displayName"] && <TeamCard style={style} {...createTeamSummary(team)} />}
                </Col>
                <Col xs={12} sm={12}>
                    {nextMatchup && nextMatchup[0] ? <NextEvent {...nextMatchup[0]} /> : <p>No Upcoming Events</p>}

                </Col>
            </Row>


        </>
    );

}

export default Team;