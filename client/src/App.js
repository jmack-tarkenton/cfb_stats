import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CfbTable from './components/Table';

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    data: null,
    teams: null,
    conferences: null,
  };

  componentDidMount() {
    // this.callBackendAPI()
    //   .then(res => this.setState({ data: res.express }))
    //   .catch(err => console.log(err));

    // this.listAllNcaaTeams()
    //   .then(teams => this.setState({ teams }))
    //   .catch(err => console.log(err));

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
    console.log({ body });
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  getNcaaConferences = async () => {
    const response = await fetch('/api/cfb/conferences');
    const conferences = await response.json();
    console.log({ conferences });
    if (response.status !== 200) {
      throw Error(conferences)
    }
    return conferences;
  }

  getTop25TeamsByStandings = async () => {
    const response = await fetch('/api/cfb/teams/standings/top25');
    const teams = await response.json();
    console.log({ teams });
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
    console.log({ teams });
    // this.setState({ teams });
  }

  createTableDefinitions(objectArray) {
    const firstEntry = objectArray[0];
    const cols = Object.keys(firstEntry).filter(col=>col!="id");
    const rows = objectArray.map((row, i) => {
      console.log({row})
      const hasId = row.hasOwnProperty("id");
      const rowId = hasId ? row.id : i;
      var rowCopy = row;
      hasId && delete rowCopy.id;
      const rowValues = Object.values(rowCopy);
      return {
        id: rowId,
        content: rowValues,
      }
    })
    console.log({ rows })

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
      <Container fluid className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}

        <Row>
          <Col xs={12} sm={6}>
            {this.state.teams && Array.isArray(this.state.teams) ? <CfbTable {...this.createTableDefinitions(this.state.teams)} handleClick={this.handleConferenceTableClick} /> : <p>LOADING...</p>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;