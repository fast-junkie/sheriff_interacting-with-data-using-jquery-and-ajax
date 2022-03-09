((fj) => {
  const { debug } = fj.app;
  fj.common = {
    lastStatus: {
      status: 0,
      statusText: '',
      ok: false,
    },
    displayAllData(resp) {
      if (fj.common.lastStatus.ok) {
        for (let i = 0; i < 10; i += 1) {
          debug(`resp[${i}]`, resp[i]);
        }
      }
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
    displayResponse(resp) {
      debug('displayResponse resp', resp);
    },
    getValue(id) {
      return document.getElementById(id).value;
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
    processResponse(resp) {
      debug('resp', resp);
      fj.common.lastStatus.status = resp.status;
      fj.common.lastStatus.statusText = resp.statusText;
      fj.common.lastStatus.ok = resp.ok;

      debug('lastStatus', fj.common.lastStatus);
      if (fj.common.lastStatus.ok) {
        return resp.json() ?? 'No response JSON...';
      }
      return null;
    },
    setValue(id, value) {
      document.getElementById(id).value = value;
    },
  };
})(window.fj || (window.fj = {}));
