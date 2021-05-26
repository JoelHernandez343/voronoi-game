import Input from '../../components/Input.js';
import Button from '../../components/Button.js';

const JoinGame = () => {
  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold">Unirse a una partida</h1>
      <form>
        <label className="text-base" htmlFor="username">
          Ingresa un nombre de usuario:
        </label>
        <Input maxLength={10} name="username" id="username" />

        <label className="text-base" htmlFor="code">
          Ingresa el código de 4 caracteres:
        </label>
        <Input maxLength={4} name="code" id="code" />
        <Button
          icon="group_add"
          onClick={() => console.log('Hello world')}
          type="button"
        >
          Unirse a la partida
        </Button>
      </form>
    </div>
  );
};

export default JoinGame;
