((fj) => {
  fj.config = {
    serverUri: 'http://localhost',
    serverPort: 3000,
    mongoUri: 'mongodb://localhost',
    mongoPort: 27017,
    mongoDb: 'productsApi',
  };
})(window.fj || (window.fj = {}));
