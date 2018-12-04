module.exports = function Basket(prevBasket) {

    this.items = prevBasket.items || {};
    this.finalQty = prevBasket.finalQty || 0;
    this.finalPrice = prevBasket.finalPrice || 0;

    var a=0;
    var b=0;

    this.add = function (item, id) {
        var addedItem = this.items[id];
        //console.log(this.items[id]);
        if (!addedItem) {
            addedItem = this.items[id] = {item: item, qty: 0, item_price: 0};
             
        }
        //console.log(Object.values(addedItem.items.item));
        addedItem.qty++;
        addedItem.price = addedItem.item.item_price * addedItem.qty;
        this.finalQty++;
        // a = parseFloat(this.finalPrice);
        // b = parseFloat(addedItem.price);
        // console.log(typeof(this.finalQty));
        this.finalPrice += addedItem.item.item_price;
    };

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};