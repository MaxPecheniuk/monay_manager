import path from 'path';
import paths from '../../../tools/webpack/paths';
import { appHandler as handler } from '../handlers/appHandler';

let sources = path.resolve(paths.appDist);
if (process.env.NODE_ENV === 'production') {
  sources = path.resolve(paths.appPublic);
}

const SsrRoutes = [
  {
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: sources,
        index: true
      }
    }
  },

  {
    method: 'GET',
    path: '/{param*}',
    config: {
      description: 'SSR handler'
    },
    handler
  }
];

module.exports = SsrRoutes;