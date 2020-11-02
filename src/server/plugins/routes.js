exports.plugin = {
  name: 'routesPlugin',
  register: (server) => {
    server.route(require('../routes/ssrRoutes'));
    server.route(require('../routes/incomeBill'));
  }
};
