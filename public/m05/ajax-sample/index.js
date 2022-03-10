((fj) => {
  // Server URI...
  const uri = `${fj.config.serverUri}:${fj.config.serverPort}/api/products`;
  const { debug } = fj.app;
  const { displayMessage, handleAjaxError } = fj.common;
  const { getFromInput, setInput } = fj.product;

  // Actions
  fj.action = {
    // Get all products...
    get() {
      $.ajax({
        url: uri,
        type: 'GET',
        contentType: 'application/json',
        success(data) {
          displayMessage('message', 'Products retrieved...');
          debug('data', data);
        },
        error(error) {
          handleAjaxError(error);
        },
        complete() {
          debug('complete', 'complete() executed...');
          // throw new Error('Ooops... world is coming unraveled...!');
        },
      });
    },

    // Get a product...
    getProduct() {

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

    },

    // Delete...
    deleteProduct() {

    },
  };

  const $doc = $(document);
  $doc
    .ajaxStart(() => {
      debug('ajaxStart', 'The first Ajax call is being fired...');
    })
    .ajaxStop(() => {
      debug('ajaxStop', 'The last Ajax call has completed...');
    })
    .ajaxSend(() => {
      debug('ajaxSend', 'Ajax call is being sent...');
    })
    .ajaxSend((...args) => {
      const [,, settings] = args;
      debug('ajaxSend settings', settings);
    })
    .ajaxSuccess(() => {
      debug('ajaxSuccess', 'An Ajax call has finished successfully...');
    })
    .ajaxSuccess((...args) => {
      const [,, settings] = args;
      debug('ajaxSuccess settings', settings);
    })
    .ajaxComplete(() => {
      debug('ajaxComplete', 'Ajax call is complete...');
    })
    .ajaxComplete((...args) => {
      const [, xhr, settings] = args;
      debug('ajaxComplete settings', settings);
      debug('ajaxComplete xhr', xhr);
    })
    .ajaxError(() => {
      debug('ajaxError', 'Ajax call had an ERROR...');
    })
    .ajaxError((...args) => {
      const [, , settings, thrownErrror] = args;
      debug('ajaxError settings', settings);
      debug('ajaxError thrownErrror', thrownErrror);
    });
})(window.fj || (window.fj = {}));
