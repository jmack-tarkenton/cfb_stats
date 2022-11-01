import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import CfbTable from '../components/Table';
import CfbNav from '../components/Navbar';


function Team(props) {
    const [team, setTeam] = useState({});
    const { team_id } = useParams();

    const getTeamInfo = async (team_id) => {

        const response = await fetch(`/api/cfb/team/${team_id}/information`);
        const team = await response.json();
        console.log(team);
        if (response.status !== 200) {
            throw Error(team)
        }
        return team;

    }



    React.useEffect(() => {
        getTeamInfo(team_id)
            .then(setTeam)
    }, [team_id])
    const createTeamSummary = function (team) {
        console.log({ team });
        let { id, abbreviation, displayName, logos, nextEvent, record, standingSummary } = team;

        const short_date = new Date(nextEvent[0].date).toLocaleDateString('en-US')
        return {
            id,
            abbreviation,
            title: displayName,
            logo: logos[0]?.href,
            "Next Game": `${nextEvent[0].shortName} on ${short_date}`,
            record: record.items[0].summary,
            standing: standingSummary
        }
    }

    function createTableDefinitions(team) {

        const cols = Object.keys(team).filter(col => col != "id");
        const rows = Object.values(team);
        console.log({ rows })

        return {
            cols,
            rows
        }

    }

    const { color, alternateColor } = team;
    const style = { color: "#" + alternateColor, backgroundColor: "#" + color };

    return (
        <>
            {team && team.hasOwnProperty("displayName") && <CfbNav style={style} {...createTeamSummary(team)} />}
            <Row >

                <Col xs={12} sm={6}>
                  
                </Col>
            </Row>


        </>
    );

}

export default Team;