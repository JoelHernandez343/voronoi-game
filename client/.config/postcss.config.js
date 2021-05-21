import Autoprefixer from 'autoprefixer';
import Tailwindcss from 'tailwindcss';

import tailwindcssOptions from '../tailwind.config.cjs';

export default {
  plugins: [Autoprefixer, Tailwindcss(tailwindcssOptions)],
};
