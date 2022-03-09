((fj) => {
  // Server URI...
  const uri = `${fj.config.serverUri}:${fj.config.serverPort}/api/products`;
  const {
    displayAllData, displayMessage, displayResponse,
    getValue, handleAjaxError, lastStatus, processResponse,
  } = fj.common;
  const { clearInput, getFromInput, setInput } = fj.product;

  // Actions
  fj.action = {

    // Get all products...
    get() {
      fetch(uri)
        .then((response) => processResponse(response))
        .then((data) => {
          if (lastStatus.ok) {
            displayMessage('message', 'Products retrieved...');
            displayAllData(data);
          } else {
            displayMessage('error', lastStatus);
          }
        })
        .catch((error) => handleAjaxError(error));
    },

    // Get a product...
    getProduct() {
      fetch(`${uri}/${getValue('productID')}`)
        .then((response) => processResponse(response))
        .then((data) => {
          if (lastStatus.ok) {
            displayMessage('message', 'Product retrieved...');
            setInput(data);
          } else {
            displayMessage('error', lastStatus);
          }
        })
        .catch((error) => handleAjaxError(error));
    },

    // Insert...
    insertProduct() {
      const product = getFromInput();
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      };
      fetch(uri, options)
        .then((response) => processResponse(response))
        .then((data) => {
          if (lastStatus.ok) {
            displayMessage('message', 'Product inserted...');
            displayResponse(data);
            setInput(data);
          } else {
            displayMessage('error', lastStatus);
          }
        })
        .catch((error) => handleAjaxError(error));
    },

    // Update...
    updateProduct() {
      const product = getFromInput();
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      };
      fetch(`${uri}/${product.productID}`, options)
        .then((response) => processResponse(response))
        .then((data) => {
          if (lastStatus.ok) {
            displayMessage('message', 'Product updated...');
            displayResponse(data);
            setInput(data);
          } else {
            displayMessage('error', lastStatus);
          }
        })
        .catch((error) => handleAjaxError(error));
    },

    // Delete...
    deleteProduct() {
      const product = getFromInput();
      const options = {
        method: 'DELETE',
      };
      fetch(`${uri}/${product.productID}`, options)
        .then((response) => processResponse(response))
        .then((data) => {
          if (lastStatus.ok) {
            displayMessage('message', 'Product deleted...');
            displayResponse(data);
            clearInput();
          } else {
            displayMessage('error', lastStatus);
          }
        })
        .catch((error) => handleAjaxError(error));
    },
  };
})(window.fj || (window.fj = {}));
