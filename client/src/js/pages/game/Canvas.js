import { useEffect, useRef } from 'react';

const Canvas = ({ states, game, interfactive = true }) => {
  const [board] = states.board;
  const [status, setStatus] = states.status;
  const [localPlayer] = states.localPlayer;

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw here
    board.renderOnCanvas(canvas);
  }, [board]);

  const getLocation = e => {
    if (!interfactive) {
      return;
    }

    const canvas = canvasRef?.current;

    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();

    const location = {
      x: (e.clientX - rect.left) | 0,
      y: (e.clientY - rect.top) | 0,
    };

    if (status.status === 'waiting') {
      console.log('damage logic');
    }
    if (status.status === 'placement') {
      if (board.isInQuarantineZone(location)) {
        console.log('error');
        return;
      }

      const request = {
        nickname: localPlayer.nickname,
        turn: {
          type: 'placement',
          site: status.site,
          location,
        },
      };

      setStatus({ status: 'waiting' });

      game.playerTurn(request);
    }
  };

  return (
    <canvas
      className="canvasGame"
      width="800px"
      height="500px"
      onClick={getLocation}
      ref={canvasRef}
    ></canvas>
  );
};

export default Canvas;
