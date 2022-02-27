((fj) => {
  const { debug } = fj.app;
  fj.common = {
    getValue(id) {
      return document.getElementById(id).value;
    },
    setValue(id, value) {
      document.getElementById(id).value = value;
    },
    displayMessage(...args) {
      const [id, msg] = args;
      const container = document.getElementById(id);
      $(container).removeClass('d-none');
      container.innerHTML = (id !== 'message') ? JSON.stringify(msg) : msg;

      setTimeout(() => {
        $(container)
          .fadeOut(25e2, function _complete() {
            $(this).prop('style', false).addClass('d-none');
          });
      }, 4e3);
    },
    handleAjaxError(error) {
      fj.common.displayMessage('error', error.responseText);
      switch (error.status) {
        case 404:
          debug('404', error.responseText);
          break;
        case 500:
          debug('500', error.responseText);
          break;
        default:
          debug('default', error);
          break;
      }
    },
  };
})(window.fj || (window.fj = {}));
