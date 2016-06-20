import base from './webpack.base.config.babel.js';

const devServer = {
  port: 8088,
  host: 'localhost',
  contentBase: `${__dirname}/source`,
  stats: {
    chunks: false,
    colors: true,
    children: false,
  },
};

const config = base.getConfig({
  devServer,
  devtool: 'eval',
  debug: true,
});

export default config;
