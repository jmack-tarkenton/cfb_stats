import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const NextMatchup = (props) => {
    const { name, competitions, date, id } = props;

    const [matchup, setMatchup] = useState();

    const getMatchupData = async function (game_id) {
        const result = await fetch(`/api/cfb/games/${game_id}`)
        const matchup = await result.json();
        console.log({ matchup });
        return matchup;
    }

    useEffect(() => {
        getMatchupData(id)
            .then(matchup => setMatchup(matchup))
    }, [id]);

    return (<div>
        <p>{name}</p>
        {matchup && matchup["game"] && <p>{matchup.game.id}</p>}
        </div>
    )

}