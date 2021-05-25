import Button from './../../components/Button.js';

const JoinGame = ({ states }) => {
  const [, setSection] = states.section;

  return (
    <div className="w-full flex-grow-0 flex-shrink-0 pl-px">
      <Button icon="arrow_back" onClick={() => setSection('content')} />
      <p>Join to Game</p>
    </div>
  );
};

export default JoinGame;
