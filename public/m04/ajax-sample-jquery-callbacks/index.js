((fj) => {
  // Server URI...
  const uri = `${fj.config.serverUri}:${fj.config.serverPort}/api/products`;
  const { debug } = fj.app;
  const { displayMessage, handleAjaxError } = fj.common;
  /* const { clearInput, getFromInput, setInput } = fj.product; */

  // Actions
  fj.action = {

    // Get all products...
    get() {
      $.ajax({
        url: uri,
        type: 'GET',
        contentType: 'application/json',
        success(data) {
          displayMessage('message', 'Products Retrieved');
          debug('data', data);
        },
        error(error) {
          handleAjaxError(error);
        },
        complete() {
          debug('complete', 'In the complete function');
        },
      });
    },

    // Get a product...
    getProduct() {

    },

    // Insert...
    insertProduct() {

    },

    // Update...
    updateProduct() {

    },

    // Delete...
    deleteProduct() {

    },
  };
})(window.fj || (window.fj = {}));
