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
      $.ajax(uri)
        .done((data) => {
          displayMessage('message', 'Products retrieved...');
          debug('data', data);
        })
        .fail((error) => {
          handleAjaxError(error);
        })
        .always(() => {
          debug('always', 'In the always() method');
        });
    },

    // Get a product...
    getProduct() {
      $.ajax(`${uri}/${getValue('productID')}`)
        .done((data) => {
          displayMessage('message', 'Product retrieved...');
          debug('data', data);
          setInput(data);
        })
        .fail((error) => {
          handleAjaxError(error);
        })
        .always(() => {
          debug('always', 'In the always() method');
        });
    },

    // Insert...
    insertProduct() {
      const product = getFromInput();
      $.ajax({
        url: uri,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(product),
      })
        .done((data) => {
          displayMessage('message', 'Product inserted...');
          debug('data', data);
          setInput(data);
        })
        .fail((error) => {
          handleAjaxError(error);
        })
        .always(() => {});
    },

    // Update...
    updateProduct() {
      const product = getFromInput();
      $.ajax({
        url: `${uri}/${product.productID}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(product),
      })
        .done((data) => {
          displayMessage('message', 'Product updated...');
          debug('data', data);
          setInput(data);
        })
        .fail((error) => {
          handleAjaxError(error);
        })
        .always(() => {});
    },

    // Delete...
    deleteProduct() {
      $.ajax({
        url: `${uri}/${getValue('productID')}`,
        type: 'DELETE',
      })
        .done((data) => {
          displayMessage('message', 'Product deleted...');
          debug('data', data);
          clearInput();
        })
        .fail((error) => {
          handleAjaxError(error);
        })
        .always(() => {});
    },
  };
})(window.fj || (window.fj = {}));
