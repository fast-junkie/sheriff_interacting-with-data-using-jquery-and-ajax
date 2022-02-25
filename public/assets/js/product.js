((fj) => {
  fj.product = {};
  fj.product.getFromInput = _getFromInput;
  fj.product.setInput = _setInput;
  fj.product.clearInput = _clearInput;

  function _getFromInput() {
    return {
      productID: fj.common.getValue('productID'),
      name: fj.common.getValue('name'),
      productNumber: fj.common.getValue('productNumber'),
      color: fj.common.getValue('color'),
      standardCost: fj.common.getValue('standardCost'),
      listPrice: fj.common.getValue('listPrice'),
      sellStartDate: new Date(fj.common.getValue('sellStartDate')),
    };
  }
  function _setInput(product) {
    fj.common.setValue('productID', product.productID);
    fj.common.setValue('name', product.name);
    fj.common.setValue('productNumber', product.productNumber);
    fj.common.setValue('color', product.color);
    fj.common.setValue('standardCost', product.standardCost);
    fj.common.setValue('listPrice', product.listPrice);
    fj.common.setValue('sellStartDate', product.sellStartDate);
  }
  function _clearInput() {
    fj.common.setValue('productID', '0');
    fj.common.setValue('name', '');
    fj.common.setValue('productNumber', '');
    fj.common.setValue('color', '');
    fj.common.setValue('standardCost', '0');
    fj.common.setValue('listPrice', '0');
    fj.common.setValue('sellStartDate', new Date().toLocaleDateString());
  }
})(window.fj || (window.fj = {}));
