import Input from '../../components/Input.js';
import Button from '../../components/Button.js';

const CreateGame = () => {
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold">Creando una partida</h1>
      <form>
        <label className="text-base" htmlFor="username">
          Ingresa un nombre de usuario:
        </label>
        <Input maxLength={10} name="username" id="username" />
        <Button
          icon="videogame_asset"
          onClick={() => console.log('Hello world')}
          type="button"
        >
          Crear partida
        </Button>
      </form>
    </div>
  );
};

export default CreateGame;
