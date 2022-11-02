import React, { Component } from 'react';

import { Row, Col } from 'react-bootstrap';
import CfbTable from '../components/Table';


class Top25Teams extends Component {
    state = {
        data: null,
        teams: null,
        conferences: null,
    };



    componentDidMount() {
        this.getNcaaConferences()
            .then(conferences => this.setState({ conferences }));

        this.getTop25TeamsByStandings()
            .then(teams => this.setState({ teams }));
    }
    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        // const response = await fetch('/express_backend');
        const response = await fetch('/api/cfb/teams');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    getNcaaConferences = async () => {
        const response = await fetch('/api/cfb/conferences');
        const conferences = await response.json();

        if (response.status !== 200) {
            throw Error(conferences)
        }
        return conferences;
    }

    getTop25TeamsByStandings = async () => {
        const response = await fetch('/api/cfb/teams/standings/top25');
        const teams = await response.json();

        if (response.status !== 200) {
            throw Error(teams)
        }
        return teams;
    }

    handleConferenceTableClick = async (row_id, e) => {
        console.log({ row_id, e });
        const conference_id = row_id ?? e.target.id;
        const response = await fetch(`/api/cfb/teams/conference/${conference_id}`)
        const teams = await response.json();

    }

    // history = useHistory();

    handleTeamTableClick = async (row_id) => {

        window.location.href = `/team/${row_id}`;

    }

    createTableDefinitions(objectArray) {
        const firstEntry = objectArray[0];
        const cols = Object.keys(firstEntry).filter(col => col != "id");
        const rows = objectArray.map((row, i) => {

            const hasId = row.hasOwnProperty("id");
            const rowId = hasId ? row.id : i;
            var rowCopy = { ...row };
            hasId && delete rowCopy.id;
            const rowValues = Object.values(rowCopy);
            return {
                id: rowId,
                content: rowValues,
            }
        })

        return {
            cols,
            rows
        }

    }

    // listAllNcaaTeams = async () => {
    //   const response = await fetch('/api/cfb/teams');
    //   const teams = await response.json();
    //   console.log({ teams });
    //   if (response.status !== 200) {
    //     throw Error(teams.message)
    //   }
    //   return teams;
    // }


    render() {
        return (


            <Row>
                <Col className={"bg-dark text-light text-center"}>
                    <h3>
                        Click a team in the table to see stats for their next game
                    </h3>
                </Col>
                <Col xs={12}>
                    {this.state.teams && Array.isArray(this.state.teams) ? <CfbTable {...this.createTableDefinitions(this.state.teams)} handleClick={this.handleTeamTableClick} className={"top-25"} /> : <p>LOADING...</p>
                    }
                </Col>
            </Row>

        );
    }
}

export default Top25Teams;