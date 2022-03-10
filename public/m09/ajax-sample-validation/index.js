((fj) => {
  // Server URI...
  const uri = `${fj.config.serverUri}:${fj.config.serverPort}/api/products`;
  const { debug } = fj.app;
  const {
    displayMessage, displayResponse, getValue,
    handleAjaxError, lastStatus, processResponse,
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
            // displayAllData(data);
            debug('data', data);
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

  // Validate
  const $form = $('form');
  if ($form.length) {
    $form
      .validate({
        errorElement: 'span',
        rules: {
          name: {
            required: true,
            minlength: 4,
          },
          productNumber: {
            required: true,
            minlength: 3,
          },
          color: {
            required: true,
            minlength: 3,
          },
          standardCost: {
            required: true,
            number: true,
            min: 9.99,
          },
          listPrice: {
            required: true,
            number: true,
            min: 24.99,
          },
          sellStartDate: {
            required: true,
            date: true,
          },
        },
        messages: {
          name: {
            required: 'Please enter a product name...',
            minlength: 'The name must be at least 4 characters long...',
          },
          productNumber: {
            required: 'Please enter a product number...',
            minlength: 'The product number must be at least 3 characters long...',
          },
          color: {
            required: 'Please enter a product color...',
            minlength: 'The color must be at least 3 characters long...',
          },
          standardCost: {
            required: 'Please enter a cost...',
            min: 'Enter a value greater than $9.99...',
          },
          listPrice: {
            required: 'Please enter a price...',
            min: 'Enter a value greater than $24.99...',
          },
          sellStartDate: 'Please enter a sell start date...',
        },
        submitHandler() {
          if ($(document.activeElement).data('type') === 'post') {
            fj.action.insertProduct();
          } else {
            fj.action.updateProduct();
          }
        },
      });

    /*
    $form
      .on('submit', (event) => {
        event.preventDefault();
        if ($('form').valid()) {
          if ($(document.activeElement).data('type') === 'post') {
            fj.action.insertProduct();
          } else {
            fj.action.updateProduct();
          }
        }
      });
    */
  }
})(window.fj || (window.fj = {}));
