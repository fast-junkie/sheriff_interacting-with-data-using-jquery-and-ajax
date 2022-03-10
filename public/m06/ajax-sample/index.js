((fj) => {
  // Server URI...
  const uri = `${fj.config.serverUri}:${fj.config.serverPort}/api/products`;
  const { debug } = fj.app;
  const { displayMessage, getValue, handleAjaxError } = fj.common;
  const { getFromInput, setInput } = fj.product;

  // Actions
  fj.action = {

    // Get all products...
    get() {
      $.get(uri)
        .done((data) => {
          displayMessage('message', 'Products retrieved...');
          debug('data', data);
        })
        .fail((error) => {
          handleAjaxError(error);
        })
        .always(() => {});
    },

    // Get a product...
    getProduct() {
      $.get(`${uri}/${getValue('productID')}`)
        .done((data) => {
          displayMessage('message', 'Product retrieved...');
          setInput(data);
        })
        .fail((error) => {
          handleAjaxError(error);
        })
        .always(() => {});
    },

    // Insert...
    insertProduct() {
      const product = getFromInput();
      const settings = {
        url: uri,
        contentType: 'application/json',
        data: JSON.stringify(product),
      };
      $.post(settings)
        .done((data) => {
          displayMessage('message', 'Product inserted...');
          setInput(data);
        })
        .fail((error) => {
          handleAjaxError(error);
        })
        .always(() => {});
    },

    // Update...
    updateProduct() {
      displayMessage('error', 'updateProduct(): Not enabled...');
    },

    // Delete...
    deleteProduct() {
      displayMessage('error', 'deleteProduct(): Not enabled...');
    },

    // Get JSON...
    getJSON() {
      const url = '/assets/static/productCategory.json';
      $.getJSON(url)
        .done((data) => {
          displayMessage('message', 'Categories retrieved...');
          debug('data', data);
        })
        .fail((error) => {
          handleAjaxError(error);
        })
        .always(() => {});
    },

    // Load html...
    loadHTML() {
      const url = '/assets/static/header.html';
      $('#header')
        .load(url, null, (response, status, xhr) => {
          if (status === 'error') {
            const msg = 'Sorry but there was an error: ';
            displayMessage('error', `${msg + xhr.status} - ${xhr.statusText}`);
          }
        });
    },
  };
})(window.fj || (window.fj = {}));
