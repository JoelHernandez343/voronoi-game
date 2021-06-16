import { useState } from 'react';

// Components
import Input from '../../components/Input.js';
import Button from '../../components/Button.js';

const CreateGame = ({ game }) => {
  const [formData, setFormData] = useState({ nickname: '' });

  const formChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const createGame = () => {
    game.createGame(formData);
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold">Creando una partida</h1>
      <form>
        <label className="text-base" htmlFor="nickname">
          Ingresa un nombre de usuario:
          <Input
            maxLength={10}
            name="nickname"
            id="nickname"
            type="text"
            onChange={formChange}
            value={formData.nickname}
          />
        </label>

        <Button icon="videogame_asset" onClick={createGame} type="button">
          Crear partida
        </Button>
      </form>
    </div>
  );
};

export default CreateGame;
