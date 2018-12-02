var Item = require('../models/item');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true });

var count=0;
var items = [
    new Item({
        imageRoute: 'https://images-na.ssl-images-amazon.com/images/I/91cBBjTizmL.jpg',
        item_title: 'Rich Dad Poor Dad',
        item_detail: 'A book by Robert Kiyosaki',
        item_price: 49
    }),

    new Item({
        imageRoute: 'https://images.gr-assets.com/books/1295670969l/634583.jpg',
        item_title: 'Wings of Fire',
        item_detail: 'A book by Abdul Kalam',
        item_price: 59
    }),

    new Item({
        imageRoute: 'https://images-na.ssl-images-amazon.com/images/I/511wMMedbhL._SX327_BO1,204,203,200_.jpg',
        item_title: 'Five Point Someone',
        item_detail: 'A book by Chetan Bhagat',
        item_price: 69
    }),

    new Item({
        imageRoute: 'https://images-na.ssl-images-amazon.com/images/I/51V%2BYXQM9sL._SX334_BO1,204,203,200_.jpg',
        item_title: 'Art of Networking',
        item_detail: 'A book by Warren Buffet',
        item_price: 79
        })
];

for(var z = 0; z < items.length; z++ ){

    items[z].save(function(err, result){
        count++;
        if (count == items.length)
            saveComplete();
    });

}

function saveComplete(){
    mongoose.disconnect();
}
