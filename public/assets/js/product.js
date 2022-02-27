((fj) => {
  const { getValue, setValue } = fj.common;

  fj.product = {
    getFromInput() {
      return {
        productID: getValue('productID'),
        name: getValue('name'),
        productNumber: getValue('productNumber'),
        color: getValue('color'),
        standardCost: getValue('standardCost'),
        listPrice: getValue('listPrice'),
        sellStartDate: (new Date(getValue('sellStartDate')).toISOString()),
      };
    },
    setInput(product) {
      setValue('productID', product._id);
      setValue('name', product.name);
      setValue('productNumber', product.productNumber);
      setValue('color', product.color);
      setValue('standardCost', product.standardCost);
      setValue('listPrice', product.listPrice);
      setValue('sellStartDate', product.sellStartDate);
    },
    clearInput() {
      setValue('productID', '0');
      setValue('name', '');
      setValue('productNumber', '');
      setValue('color', '');
      setValue('standardCost', '0');
      setValue('listPrice', '0');
      setValue('sellStartDate', (new Date()).toISOString());
    },
  };
})(window.fj || (window.fj = {}));
