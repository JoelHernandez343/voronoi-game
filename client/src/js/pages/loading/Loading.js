import '../../../css/Loading.css';

const Loading = ({ code }) => {
  return (
    <div className="loading-bg flex text-gray-100 quicksand">
      <div className="md:m-7 w-full loading-modal">
        <div className="p-7 h-full max-h-full flex items-center">
          <div className="m-11">
            <h1 className="font-bold text-5xl">Esperando a otro jugador</h1>
            <h2 className="font-extrabold text-9xl mt-10">YYYY</h2>
            <p>
              Dile a un amigo o a un compañero que ingrese el siguiente código
              para poder unirse a la partida
            </p>
          </div>
          <div className="flex-grow flex justify-center items-center">
            <span className="material-icon text-9xl loading-anim">
              hourglass_bottom
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
