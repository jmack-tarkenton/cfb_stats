import { useState, useEffect } from 'react';
import { Row, Col} from 'react-bootstrap';
import ImageCard from '../../components/cards/ImageCard';
import PlayerCard from '../../components/cards/PlayerCard';
import BarChart from '../../components/charts/BarChart';

const NextMatchup = (props) => {
    const { name, id } = props;

    const [matchup, setMatchup] = useState(null);
    const [game, setGame] = useState(null);
    const [gameInfo, setGameInfo] = useState(null);
    const [boxScore, setBoxScore] = useState(null);

    const getMatchupData = async function (game_id) {
        const result = await fetch(`/api/cfb/games/${game_id}`)
        const matchup = await result.json();
        let { game } = matchup;
        if (game) {
            setGame(game);
            let { gameInfo, boxScore } = game;
            if (gameInfo) {
                setGameInfo(gameInfo);
            }

            if (boxScore) {
                setBoxScore(boxScore);
            }

        }
        return matchup;
    }

    useEffect(() => {
        getMatchupData(id)
            .then(matchup => setMatchup(matchup))
    }, [id]);

    const createPlayerCardsForTeamLeaders = (leaders) => {
        const team_leaders = leaders.map(leader => {

            const { team, leaders } = leader;
            team["statLeaders"] = {};
            const playerProps = leaders.map(({ name, displayName, leaders }) => {
                const { athlete, displayValue } = leaders[0];
                athlete["team"] = team;
                const propsObject = {
                    player: athlete,
                    stats: {
                        stat_type: displayName,
                        stat: displayValue
                    }
                };

                return propsObject;
            })
            team["statLeaders"] = playerProps;
            return team;


        })


        return <Row >
            {team_leaders.map(team => {
                const { statLeaders } = team;
                console.log({})

             
                return <Row className="mb-3">
                    <h5 className={'text-center text-light'}>{team.abbreviation} Key Players</h5>
                    {statLeaders.map((playerStats) => <Col xs={6} sm={4}>
                        <PlayerCard {...playerStats} />
                    </Col>)}
                </Row>

            })}
        </Row>
   


    }

    const createPropsForImgCard = (matchup) => {
        let { game } = matchup;
        let { gameInfo } = game;
        if (!game || !gameInfo) {
            return;
        }
        const venueName = gameInfo?.venue?.fullName;
        const temp = gameInfo?.weather?.temperature;
        const chanceOfRain = gameInfo?.weather?.precipitation;
        const weatherSummary = `${temp} degrees with a ${chanceOfRain}% chance of rain`;

        return {
            title: name,
            imgSrc: gameInfo?.venue?.images[0]?.href,
            imgName: venueName,
            text: venueName,
            sub_text: weatherSummary
        }
    }

    const createDataSetsFromBoxScore = (boxScore) => {

        const { teams } = boxScore;
        const labels = teams[0].statistics.map(({ label }) => label)
        const datasets = teams.map(({ team, statistics }) => {
            return {
                label: team.displayName,
                backgroundColor: "#" + team.color,
                borderColor: "#" + team.alternateColor,

                data: statistics.map(({ displayValue }) => parseFloat(displayValue)),
            }
        })
        return {
            labels,
            datasets
        }
    }

    return (<Row>
        {matchup && gameInfo && gameInfo["venue"] && <Col xs={12}>
            <ImageCard {...createPropsForImgCard(matchup)}>

            </ImageCard>
        </Col>
        }
        <Col sm={6}>
            {matchup && createPlayerCardsForTeamLeaders(matchup.picks.leaders)}
        </Col>
        {matchup && matchup["game"] && game && boxScore && boxScore["teams"] &&
            <Col sm={6}>
                <h5 className={"text-center"}>Team Comparison</h5>
                <BarChart {...createDataSetsFromBoxScore(boxScore)} style={{ backgroundColor: 'white' }} />
            </Col>
        }
    </Row>
    )

}

export default NextMatchup;