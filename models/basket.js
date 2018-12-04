module.exports = function Basket(prevBasket) {

    this.items = prevBasket.items;
    this.finalQty = prevBasket.finalQty;
    this.finalPrice = prevBasket.finalPrice;

    

    this.add = function (item, id) {
        var addedItem = this.items[id];
        if (!addedItem) {
            addedItem = {item: item, qty: 0, price: 0};
            this.items[id] = {item: item, qty: 0, price: 0};
        }
        addedItem.qty++;
        addedItem.price = addedItem.item.price * addedItem.qty;
        this.finalQty++;
        this.finalPrice = this.finalPrice + addedItem.price;
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};