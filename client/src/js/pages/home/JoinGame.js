import { useState } from 'react';

// Components
import Input from '../../components/Input.js';
import Button from '../../components/Button.js';

const JoinGame = ({ game }) => {
  const [formData, setFormData] = useState({ nickname: '', room: '' });

  const formChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const joinToGame = () => {
    if (formData.nickname !== '' && formData.room !== '') {
      game.joinToGame(formData);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold">Unirse a una partida</h1>
      <form>
        <label className="text-base" htmlFor="nicknameJoin">
          Ingresa un nombre de usuario:
        </label>
        <Input
          maxLength={10}
          name="nickname"
          id="nicknameJoin"
          type="text"
          onChange={formChange}
          value={formData.nickname}
        />

        <label className="text-base" htmlFor="room">
          Ingresa el código de 4 caracteres:
        </label>
        <Input
          maxLength={4}
          name="room"
          id="roomJoin"
          type="text"
          onChange={formChange}
          value={formData.room}
        />
        <Button icon="group_add" onClick={joinToGame} type="button">
          Unirse a la partida
        </Button>
      </form>
    </div>
  );
};

export default JoinGame;
