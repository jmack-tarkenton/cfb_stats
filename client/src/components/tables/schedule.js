import Table from 'react-bootstrap/Table';
import {Card, Row, Col} from "react-bootstrap";

function isHomeTeam(game, team) {
    return game.home_team === team;
}

function teamWon(game, team) {
    return game.home_team === team && game.home_points > game.away_points || game.away_team === team && game.away_points > game.home_points;
}

const standingsTable = (props) => <>
    <Row className={"g-3"}>
        {props.schedule?.map((game, index) => <Col key={index} xs={12} sm={6} md={6} lg={6} xl={4}>
                <Card bg={"dark"} text={"white"}>
                    <Card.Header className={'d-flex justify-content-between'}><span>Week {game.week}</span> {game?.conference_game &&
                        <span> <img src={props.conference?.logo} className='table-image'
                                    alt={props.conference?.name}/></span>}
                    </Card.Header>
                    <Card.Body>
                        <Row className={'d-flex justify-content-between'}>
                            <Col xs={9}>
                            <Table variant={"dark"} size={'sm'} className={""} hover={false}>
                                <thead>
                                <th></th>
                                <th></th>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{game?.away_team}</td>
                                    <td className={'text-end fw-bold'}>{game?.away_points}</td>

                                </tr>
                                <tr>
                                    <td>{game?.home_team}</td>
                                    <td className={'text-end fw-bold'}>{game?.home_points}</td>

                                </tr>
                                </tbody>
                            </Table>
                            </Col>

                            <Col className={'my-auto text-center'}>
                                {game?.completed && (teamWon(game,props.teamName) ? <h3 className={'fw-bold ' + 'text-success'}>W</h3>: <h3 className={'fw-bold ' + 'text-danger'}>L</h3>)}

                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </Col>
        )}
    </Row>
</>


export default standingsTable;