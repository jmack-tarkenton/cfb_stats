import Table from 'react-bootstrap/Table';

const standingsTable = (props) =>
    <Table size={'sm'} className={"standings-table"} hover={true}>
        <thead>
        <tr>
            <th className='fw-bold'>Week</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {props.schedule?.map((game, index) => <tr key={index}>
                {index > 0 && game.week - props.schedule[index - 1].week > 1 ?
                    <td colSpan={6} className={'text-center'}>BYE</td> :
                    <>
                        <td>{game.week}</td>
                        <td>{game?.away_team} <span className={'fw-bold'}>{game?.away_points}</span></td>
                        <td>@</td>
                        <td>{game?.home_team} <span className={'fw-bold'}> {game?.home_points}</span></td>
                        <td>{game?.conference_game &&
                            <img src={props.conference?.logo} className='table-image' alt={props.conference?.name}/>}
                        </td>

                        <td></td>
                    </>
                }
            </tr>
        )}
        </tbody>
    </Table>


export default standingsTable;