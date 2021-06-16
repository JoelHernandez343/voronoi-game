import Site from './Site.js';

const PlayerSide = ({ player, turn, states }) => {
  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl">{player.nickname}</h1>
      <h2 className="font-light text-xs mb-3">Conexión {player.socketId}</h2>

      <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-lg">{player.area | 0}</h2>
        <h3 className="mb-3">Área conquistada</h3>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="font-semibold text-lg">
          {parseFloat(`${player.percentage}`).toFixed(1)}%
        </h2>
        <h3 className="">Porcentaje</h3>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div
          className="w-6 h-6"
          style={{
            backgroundColor: player.color.slice(0, player.color.length - 2),
          }}
        ></div>
        <h3 className="">Color</h3>
      </div>

      <h2
        className={`font-bold text-yellow-400 my-2 ${
          turn === player.socketId ? '' : 'invisible'
        }`}
      >
        TURNO ACTUAL
      </h2>

      {renderSites(player, turn, states)}
    </div>
  );
};

const renderSites = ({ sites, nickname, socketId }, turn, states) =>
  Object.entries(sites).map(([site, quantity]) => (
    <Site
      site={site}
      quantity={quantity}
      key={`${site}_${nickname}`}
      states={states}
      isTurn={socketId === turn}
      turn={turn}
    />
  ));

export default PlayerSide;
