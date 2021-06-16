import '../../../css/Site.css';

// Modules
import { getInfoSite } from '../../modules/Site.js';
import { icons32x32 as icons } from '../../imports/icons.js';

const Site = ({ site, quantity, states, isTurn, turn }) => {
  const [status, setStatus] = states.status;
  const [localPlayer] = states.localPlayer;

  const info = getInfoSite(site);
  const icon32x32 = icons[`${site}32x32`];

  const changeStatus = () => {
    console.log(status);
    if (status.status === 'waiting') {
      setStatus({
        status: 'placement',
        site,
      });
    } else if (status.status === 'placement') {
      if (status.site === site) {
        setStatus({
          status: 'waiting',
        });
      } else {
        setStatus({
          status: 'placement',
          site,
        });
      }
    }
  };

  return (
    <button
      type="button"
      className={`w-full flex items-center p-2 site ease-in-out duration-150 ${
        isTurn && status.site === site ? 'site-selected' : ''
      } ${
        isTurn && localPlayer.socketId === turn && quantity > 0
          ? ''
          : 'cursor-not-allowed'
      }`}
      onClick={changeStatus}
      disabled={!(isTurn && localPlayer.socketId === turn && quantity > 0)}
    >
      <div className="">
        <img src={icon32x32} alt="" />
      </div>
      <div className="pl-4 flex-grow text-left">
        <h1>{info.name}</h1>
      </div>
      <div className="w-11">
        <h1>{quantity}</h1>
      </div>
    </button>
  );
};

export default Site;
