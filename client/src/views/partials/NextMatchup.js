import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import BarChart from '../../components/charts/BarChart';

const NextMatchup = (props) => {
    const { name, competitions, date, id } = props;

    const [matchup, setMatchup] = useState(null);
    const [game, setGame] = useState(null);
    const [gameInfo, setGameInfo] = useState(null);
    const [boxScore, setBoxScore] = useState(null);

    const getMatchupData = async function (game_id) {
        const result = await fetch(`/api/cfb/games/${game_id}`)
        const matchup = await result.json();
        console.log({ matchup });
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



    const createDataSetFromBoxScore = (boxScore) => {
        
        const { teams } = boxScore;

        console.log({teams},'teams',teams);
        return teams;
    }

    return (<div>
        <p>{name}</p>
        {game && <p>{game.id}</p>}
        {gameInfo && gameInfo["venue"] && <p>{gameInfo.venue.fullName}</p>}
        {matchup && matchup["game"] && game && boxScore &&  boxScore["teams"] && <BarChart teams={boxScore.teams}/>}
    </div>
    )

}

export default NextMatchup;