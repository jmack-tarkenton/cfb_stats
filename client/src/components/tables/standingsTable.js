import Table from 'react-bootstrap/Table';

const standingsTable = (props) =>
    <Table size={'sm'} className={"standings-table"} hover={true}>
        <thead>
        <tr>
            <th>#</th>
            <th></th>
            <th>Team</th>
            <th>Conference</th>
            <th>Overall</th>
        </tr>
        </thead>
        <tbody>
        {props.standings?.map((team, index) => <tr key={index} onClick={(e) => window.location.replace(`/team/${team.id}`)}
                                                   style={props?.activeTeam?.id === team?.id ? {...props?.activeTeam?.style, backgroundColor:'lightblue' } : {}}>
            <td>{index + 1}</td>
            <td><img src={team.logo} alt={team.name} style={{width: '30px'}}/></td>
            <td><span></span>{team.name}</td>
            <td>{team.conferenceRecord}</td>
            <td>{team.record}</td>
        </tr>)}
        </tbody>
    </Table>


export default standingsTable;