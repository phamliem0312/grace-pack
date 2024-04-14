define('grace-pack:views/product/fields/product-stock-total', ['views/fields/base'], function(Dep) {
    return Dep.extend({
        detailTemplate: 'grace-pack:product/fields/product-stock-total',
        editTemplate: 'grace-pack:product/fields/product-stock-total',

        data: function(){
            return {
                value: this.value
            }
        },

        setup: function(){
            Dep.prototype.setup.call(this);
            this.value = 0;

            if (this.model.id) {
                this.wait(true);
                Espo.Ajax.getRequest(`Product/${this.model.id}/productStocks`, {
                    select: 'quantity',
                    primaryFilter: '',
                    maxSize: 200,
                    offset: 0,
                }).then(response => {
                    for (let i = 0; i < response.list.length; i++) {
                        const element = response.list[i];
                        this.value += element.quantity ?? 0;
                    }
    
                    this.wait(false);
                });
            }
        }
    })
});