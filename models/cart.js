module.exports = function Cart(oldCart) {

    /** Properties from last cart to new cart */
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = Math.round(oldCart.totalPrice * Math.pow(10, 2))/Math.pow(10, 2) || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];

        /** Creates an object if the same item was not already in cart */
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }

        /** Individual item price and rounds it to two digits after point*/
        storedItem.qty++;
        storedItem.price = Math.round((storedItem.item.price * storedItem.qty) * Math.pow(10, 2))/Math.pow(10, 2);

        /** Updates total quantity and price */
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.increaseByOne = function(id) {
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.price;
        this.totalQty++;
        this.totalPrice += this.items[id].item.price;
    };
    this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    /** Stores items objects in an array */
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};
