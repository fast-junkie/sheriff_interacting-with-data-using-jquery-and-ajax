((fj) => {
  fj.common = {};
  fj.common.getValue = _getValue;
  fj.common.setValue = _setValue;
  fj.common.displayMessage = _displayMessage;
  fj.common.displayError = _displayError;
  fj.common.handleAjaxError = _handleAjaxError;

  function _getValue(id) {
    return document.getElementById(id).value;
  }
  function _setValue(id, value) {
    document.getElementById(id).value = value;
  }
  function _displayMessage(msg) {
    const message = document.getElementById('message');
    $(message)
      .removeClass('d-none');
    message.innerHTML = msg;

    setTimeout(() => {
      $(message)
        .fadeOut(25e2, function _complete() {
          $(this).prop('style', false).addClass('d-none');
        });
    }, 4e3);
  }
  function _displayError(error) {
    document.getElementById('error').innerHTML = JSON.stringify(error);
  }
  function _handleAjaxError(error) {
    _displayError(error);
    switch (error.status) {
      case 404:
        console.debug('404', error.responseText);
        break;
      case 500:
        console.debug('500', error.responseText);
        break;
      default:
        console.debug('default', error);
        break;
    }
  }
})(window.fj || (window.fj = {}));
