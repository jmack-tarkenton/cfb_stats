import Table from 'react-bootstrap/Table';
import {Card, Row, Col} from "react-bootstrap";

import { BsHouseFill, BsSignpost2Fill } from "react-icons/bs";

function isHomeTeam(game, team) {
    return game.home_team === team;
}

function IconForTeam({game, team}) {
    return isNeutralSite(game) ? <></>:isHomeTeam(game, team) ? <BsHouseFill/> : <BsSignpost2Fill/>
}

function teamWon(game, team) {
    return game.home_team === team && game.home_points > game.away_points || game.away_team === team && game.away_points > game.home_points;
}

function isNeutralSite(game) {
    return !!game.neutral_site;
}

function variantColor(game, teamName) {
  return isNeutralSite(game)?'warning': isHomeTeam(game, teamName) ? "none" : "danger";
}

function textColor(game, teamName) {
    return isHomeTeam(game, teamName) ? "dark" : "dark";
}

const standingsTable = (props) => <>
    <Row className={"g-3"}>
        {props.schedule?.map((game, index) => <Col key={index} xs={12} sm={6} md={6} lg={6} xl={4}>
                <Card border={variantColor(game, props?.teamName)}
                      text={textColor(game,props?.teamName)}>
                    <Card.Header
                        className={'d-flex justify-content-between'}><div className={'my-auto d-flex gap-1 align-items-center'}><span>Week {game.week} </span> {game?.conference_game &&
                        <span> <img src={props.conference?.logo} className='table-image'
                                    alt={props.conference?.name}/></span>}
                        </div>

                            <div className={'my-auto d-flex gap-1 align-items-center'}><span>{game.venue} </span><IconForTeam game={game}
                                                                                                                              team={props.teamName}/></div>


                    </Card.Header>
                    <Card.Body>
                        <Row className={'d-flex justify-content-between'}>
                            <Col xs={8} className={'my-auto'}>
                                <Table  size={'sm'}
                                       className={""} hover={false}>
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

                            <Col className={'my-auto text-center small'}>
                                {game?.completed && (teamWon(game, props.teamName) ?
                                    <h3 className={'fw-bold ' + 'text-success'}>W</h3> :
                                    <h3 className={'fw-bold ' + 'text-danger'}>L</h3>)}
                                {game?.start_date && <div> {new Date(game?.start_date).toLocaleDateString('en-us')}</div>}
                                {game.start_time_tbd ? <div>TBD</div> :
                                    <div>{new Date(game?.start_date).toLocaleTimeString('en-us', {timeStyle: "short"})}</div>}
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>
            </Col>
        )}
    </Row>
</>


export default standingsTable;