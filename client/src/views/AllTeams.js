import React, { Component } from 'react';

import { Row, Col } from 'react-bootstrap';


import CfbDataTable from '../components/CfbDataTable';


class AllTeams extends Component {
    state = {

        teams: [],
        conferences: null,
    };



    componentDidMount() {
        this.getNcaaConferences()
            .then(conferences => this.setState({ conferences }));

        this.listAllNcaaTeams()
            .then(teams => this.setState({ teams }));

    }

    getNcaaConferences = async () => {
        const response = await fetch('/api/cfb/conferences');
        const conferences = await response.json();

        if (response.status !== 200) {
            throw Error(conferences)
        }
        return conferences;
    }

    handleTeamTableClick = (e, row, rowIndex) => {
        const row_id = row.id;
        if (row_id) {
            window.location.href = `/team/${row_id}`;
        }

    }

    createTableDefinitions(teamArray) {
        var table_order = ["id", "name", "abbreviation", "logo"];
        const firstEntry = teamArray[0];
        var cols = Object.keys(firstEntry)
            .sort((a, b) => table_order.indexOf(a) - table_order.indexOf(b))
            .map(col => {
                return {
                    dataField: col,
                    text: col.toUpperCase(),
                    sort: (col != "id" && col != "logo"),
                    hidden: col == "id"
                }
            });
        const rows = teamArray.map((row, i) => {

            row["rank"] = row["rank"] == 0 ? "Not Ranked" : row["rank"];
            return row;
        })

        return {
            cols,
            rows
        }

    }

    listAllNcaaTeams = async () => {
        const response = await fetch('/api/cfb/teams');
        const teams = await response.json();
        if (response.status !== 200) {
            throw Error(teams.message)
        }
        return teams;
    }


    render() {
        return (


            <Row>
                <Col className={"bg-dark text-light text-center"}>
                    <h3>
                        Click a team in the table to see stats for their next game
                    </h3>
                </Col>
                <Col xs={12}>
                    {this.state.teams && this.state.teams.length > 0 ? <CfbDataTable {...this.createTableDefinitions(this.state.teams)} handleClick={this.handleTeamTableClick} className={"top-25"} /> : <p>LOADING...</p>}
                </Col>
            </Row>

        );
    }
}

export default AllTeams;