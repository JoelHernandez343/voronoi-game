import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    useLocalIp: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:9000',
    },
  },
  stats: 'minimal',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
  },
});
