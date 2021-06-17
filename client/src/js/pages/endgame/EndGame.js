import '../../../css/EndGame.css';

import Page from '../Page.js';

// Components
import Canvas from './../game/Canvas.js';
import Button from './../../components/Button.js';
import { useHistory } from 'react-router-dom';

const EndGame = ({ states }) => {
  const [winner] = states.winner;
  const [localPlayer] = states.localPlayer;

  const history = useHistory();
  const backToHome = () => {
    history.push('/');
  };

  return (
    <Page>
      <div className="h-full max-h-full p-8 grid endgame-container">
        <div className="flex flex-col items-center justify-center">
          <h2>EL GANADOR ES</h2>
          <p className="text-9xl">
            <span className="material-icon">emoji_events</span>
          </p>
          <h1 className="text-yellow-400 font-extrabold text-3xl">
            {winner.nickname}
          </h1>
          <p>Con un aplastante</p>
          <h2 className="text-yellow-400 font-extrabold text-7xl">
            {parseFloat(`${winner.percentage}`).toFixed(1)}%
          </h2>
          <p className="mb-4">
            {localPlayer.socketId === winner.socketId
              ? 'Muy bien hecho'
              : 'Suerte para la próxima'}
          </p>
          <Button icon="home" type="button" onClick={backToHome}>
            Regresar a inicio
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <Canvas states={states} interfactive={false} />
        </div>
      </div>
    </Page>
  );
};

export default EndGame;
