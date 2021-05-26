import '../../../css/SelectSection.css';
import MainButton from '../../components/MainButton.js';

const SelectSection = ({ states }) => {
  const [, setMovingRight] = states.movingRight;
  const [, setSection] = states.section;

  const createGame = () => {
    setMovingRight(true);
    setSection('create');
  };

  const joinGame = () => {
    setMovingRight(true);
    setSection('join');
  };

  return (
    <div className="w-full flex-grow-0 flex-shrink-0">
      <p>
        Puedes crear una nueva partida e invitar a un amigo o unirte a una
        partida a la que te hayan invitado!
      </p>
      <p className="mb-4"></p>
      <div className="flex space-x-3 justify-center py-10">
        <MainButton icon="sports_esports" onClick={createGame}>
          Crear juego
        </MainButton>
        <MainButton icon="supervised_user_circle" onClick={joinGame}>
          Unirse a partida
        </MainButton>
      </div>
    </div>
  );
};

export default SelectSection;
