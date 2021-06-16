import '../../../css/GamePage.css';

import Page from '../Page.js';
import PlayerSide from './PlayerSide.js';
import Canvas from './Canvas.js';

const GamePage = ({ states, game }) => {
  const [localPlayer] = states.localPlayer;
  const [opponentPlayer] = states.opponentPlayer;
  const [playerInTurn] = states.playerInTurn;
  const [turnsNumber] = states.turnsNumber;

  return (
    <Page>
      <div className="h-full max-h-full grid game-main">
        <PlayerSide player={localPlayer} turn={playerInTurn} states={states} />
        <div className="overflow-y-auto flex flex-col items-center justify-center">
          <h1>Turnos restantes: {turnsNumber}</h1>
          <Canvas states={states} game={game}></Canvas>
        </div>
        <PlayerSide
          player={opponentPlayer}
          turn={playerInTurn}
          states={states}
        />
      </div>
    </Page>
  );
};

export default GamePage;
