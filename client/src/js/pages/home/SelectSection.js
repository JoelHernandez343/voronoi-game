import '../../../css/SelectSection.css';
import MainButton from '../../components/MainButton.js';

const SelectSection = ({ states }) => {
  const [, setSection] = states.section;

  return (
    <div className="w-full flex-grow-0 flex-shrink-0">
      <h2 className="text-3xl font-bold">Conquista el</h2>
      <h1 className="text-8xl font-bold -m-1.5">Mundo</h1>
      <p>Bienvenido, seleccione alguna opción</p>
      <p className="mb-3"></p>
      <div className="flex space-x-3 justify-center md:justify-start">
        <MainButton icon="sports_esports" onClick={() => setSection('create')}>
          Crear juego
        </MainButton>
        <MainButton
          icon="supervised_user_circle"
          onClick={() => setSection('join')}
        >
          Unirse a partida
        </MainButton>
      </div>
    </div>
  );
};

export default SelectSection;
