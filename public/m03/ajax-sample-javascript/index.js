((fj) => {
  // Server URI...
  const uri = `${fj.config.serverUri}:${fj.config.serverPort}/api/products`;
  const { debug } = fj.app;
  const { displayMessage, getValue, handleAjaxError } = fj.common;
  const { clearInput, getFromInput, setInput } = fj.product;

  // Actions
  fj.action = {

    // Get all products...
    get() {
      const req = new XMLHttpRequest();
      req.onreadystatechange = function _onReadyStateChange() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          const data = JSON.parse(this.response);
          displayMessage('message', `${data.length} products retrieved...`);
          debug('products', data);
        }
      };
      req.open('get', uri);
      req.send();
    },

    // Get a product...
    getProduct() {
      const req = new XMLHttpRequest();
      req.onreadystatechange = function _onReadyStateChange() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          const data = JSON.parse(this.response);
          setInput(data);
          displayMessage('message', `Product '${data.name}' retrieved...`);
          debug('product', data);
        } else if (this.readyState === XMLHttpRequest.DONE && this.status >= 400) {
          handleAjaxError({
            status: this.status,
            statusText: this.statusText,
            response: this.response,
            responseText: this.responseText,
          });
        }
      };
      req.open('get', `${uri}/${getValue('productID')}`);
      req.send();
    },

    // Insert...
    insertProduct() {
      let product = getFromInput();
      const req = new XMLHttpRequest();

      req.onerror = () => { handleAjaxError(new Error('There was a network error...')); };
      req.onreadystatechange = function _onReadyStateChange() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
          product = JSON.parse(this.response);
          displayMessage('message', `Product '${product.name}' inserted...`);
          setInput(product);

          debug('insert: product', product);
        } else if (this.readyState === XMLHttpRequest.DONE && this.status >= 400) {
          handleAjaxError({
            status: this.status,
            statusText: this.statusText,
            response: this.response,
            responseText: this.responseText,
          });
        }
      };
      req.open('post', uri);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(product));
    },

    // Update...
    updateProduct() {
      let product = getFromInput();
      const req = new XMLHttpRequest();

      req.onerror = () => { handleAjaxError(new Error('There was a network error...')); };
      req.onreadystatechange = function _onReadyStateChange() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          product = JSON.parse(this.response);
          displayMessage('message', `Product '${product.name}' updated...`);
          setInput(product);
          debug('update: product', product);
        } else if (this.readyState === XMLHttpRequest.DONE && this.status >= 400) {
          handleAjaxError({
            status: this.status,
            statusText: this.statusText,
            response: this.response,
            responseText: this.responseText,
          });
        }
      };
      req.open('put', `${uri}/${product.productID}`);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(product));
    },

    // Delete...
    deleteProduct() {
      const product = getFromInput();
      const req = new XMLHttpRequest();

      req.onerror = () => { handleAjaxError(new Error('There was a network error...')); };
      req.onreadystatechange = function _onReadyStateChange() {
        debug('this', this);
        if (this.readyState === XMLHttpRequest.DONE && this.status === 204) {
          displayMessage('message', `Product '${product.name}' deleted...`);
          clearInput();
        } else if (this.readyState === XMLHttpRequest.DONE && this.status >= 400) {
          handleAjaxError({
            status: this.status,
            statusText: this.statusText,
            response: this.response,
            responseText: this.responseText,
          });
        }
      };
      req.open('delete', `${uri}/${product.productID}`);
      req.send(JSON.stringify(product));
    },
  };
})(window.fj || (window.fj = {}));
