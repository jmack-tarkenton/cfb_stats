import React, { Component, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';


import CfbDataTable from '../components/CfbDataTable';

const AllTeams = (props) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [loading, setLoading] = useState(false);



    const [teams, setTeams] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [season, setSeason] = useState(null);

    const [tableEntries, setTableEntries] = useState(null);


    const handleSetSeason = () => {
        const seasonParam = searchParams.get("season");
        setSeason(seasonParam);
    };

    const getNcaaConferences = async () => {
        const response = await fetch(`/api/cfb/conferences?season=${season}`);
        const conferences = await response.json();

        if (response.status !== 200) {
            throw Error(conferences)
        }
        return setConferences(conferences);
    }

    const handleTeamTableClick = (e, row, rowIndex) => {
        const row_id = row.id;
        if (row_id) {
            window.location.href = `/team/${row_id}?season=${season}`;
        }

    }

    const createTableDefinitions = (teamArray) => {
        var table_order = ["id", "name", "abbreviation"];
        const firstEntry = teamArray[0];
        var cols = Object.keys(firstEntry)
            .sort((a, b) => table_order.indexOf(a) - table_order.indexOf(b))
            .map(col => {
                return {
                    dataField: col,
                    text: col.toUpperCase(),
                    sort: (col !== "id" && col !== "logo"),
                    hidden: col === "id"
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

    const listAllNcaaTeams = async () => {
        const response = await fetch(`/api/cfb/teams?season=${season}`);
        const teams = await response.json();
        if (response.status !== 200) {
            throw Error(teams.message)
        }
        setTableEntries(createTableDefinitions(teams));
        return setTeams(teams);
    }

    useEffect(() => {
        handleSetSeason();

    }, [searchParams])

    useEffect(() => {
        if (season) {
            setLoading(true);
            getNcaaConferences().then(listAllNcaaTeams).then(() => setLoading(false)).catch(err => console.error(err));
        
        }
    }, [season])



    return (

        <>
        {loading &&  <Row style={{ height: '90vh' }} className='justify-content-center' >
                    <Spinner animation="grow" role='status' className='mx-auto' />
                </Row>}
            {season && tableEntries && !loading ? <Row>
                <Col className={"bg-dark text-light text-center"}>
                    <h3>
                        Season: {season}
                    </h3>
                </Col>
                <Col xs={12}>
                   <CfbDataTable {...tableEntries} handleClick={handleTeamTableClick} className={"top-25"} /> 
                </Col>
            </Row> : <></>}
        </>
    );

}


// class AllTeams extends Component {
//     state = {

//         teams: [],
//         conferences: null,
//         season: null,
//     };

//     setSeason = () => {
//         const searchParams = new URLSearchParams(window.location.search);
//         const season = searchParams.get("season");
//         if (season) {
//             this.setState({ season });
//         }
//     }

//     componentDidMount() {
//         this.setSeason();
//         this.getNcaaConferences()
//             .then(conferences => this.setState({ conferences }));

//         this.listAllNcaaTeams()
//             .then(teams => this.setState({ teams }));

//     }
//     componentDidUpdate(prevProps, prevState) {
//         this.setSeason();
//         if (prevState.season !== this.state.season) {
//             this.listAllNcaaTeams().then(teams => this.setState({ teams }));    
//         }
//     }

//     getNcaaConferences = async () => {
//         const response = await fetch(`/api/cfb/conferences?season=${this.state.season}`);
//         const conferences = await response.json();

//         if (response.status !== 200) {
//             throw Error(conferences)
//         }
//         return conferences;
//     }

//     handleTeamTableClick = (e, row, rowIndex) => {
//         const row_id = row.id;
//         if (row_id) {
//             window.location.href = `/team/${row_id}?season=${this.state.season}`;
//         }

//     }

//     createTableDefinitions(teamArray) {
//         var table_order = ["id", "name", "abbreviation"];
//         const firstEntry = teamArray[0];
//         var cols = Object.keys(firstEntry)
//             .sort((a, b) => table_order.indexOf(a) - table_order.indexOf(b))
//             .map(col => {
//                 return {
//                     dataField: col,
//                     text: col.toUpperCase(),
//                     sort: (col !== "id" && col !== "logo"),
//                     hidden: col === "id"
//                 }
//             });
//         const rows = teamArray.map((row, i) => {

//             row["rank"] = row["rank"] == 0 ? "Not Ranked" : row["rank"];
//             return row;
//         })

//         return {
//             cols,
//             rows
//         }

//     }

//     listAllNcaaTeams = async () => {
//         const response = await fetch(`/api/cfb/teams?season=${this.state.season}`);
//         const teams = await response.json();
//         if (response.status !== 200) {
//             throw Error(teams.message)
//         }
//         return teams;
//     }


//     render() {
//         return (


//             <Row>
//                 <Col className={"bg-dark text-light text-center"}>
//                     <h3>
//                        Season: {this.state.season}
//                     </h3>
//                 </Col>
//                 <Col xs={12}>
//                     {this.state.teams && this.state.teams.length > 0 && this.state.season ? <CfbDataTable {...this.createTableDefinitions(this.state.teams)} handleClick={this.handleTeamTableClick} className={"top-25"} /> : <p>LOADING...</p>}
//                 </Col>
//             </Row>

//         );
//     }
// }

export default AllTeams;