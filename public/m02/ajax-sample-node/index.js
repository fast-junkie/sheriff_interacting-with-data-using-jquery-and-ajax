((fj) => {
  fj.action = {};
  fj.action.get = _get;
  fj.action.getProduct = _getProduct;
  fj.action.insertProduct = _insertProduct;
  fj.action.updateProduct = _updateProduct;
  fj.action.deleteProduct = _deleteProduct;
  const uri = `${fj.config.serverUri}:${fj.config.serverPort}/api/products`;

  function _get() {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function _onReadyStateChange() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        fj.app.debug('this.response', JSON.parse(this.response));
        fj.common.displayMessage('Products Retrieved');
      }
    };
    req.open('get', uri);
    req.send();
  }

  function _getProduct() {

  }

  function _insertProduct() {

  }

  function _updateProduct() {

  }

  function _deleteProduct() {

  }
})(window.fj || (window.fj = {}));
