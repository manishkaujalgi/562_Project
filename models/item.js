var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    imageRoute: {type: String },
    item_title: {type: String},
    item_detail: {type: String},
    item_price: {type: Number}
});

var Item = module.exports = mongoose.model('Item', schema);

// Get Items
module.exports.getItems = function(callback, limit){
    Item.find(callback).limit(limit);
}

// Get Items by ID
module.exports.getItemsById = function(id, callback){
    Item.findById(id, callback);
}

// Add Item
module.exports.addItem = function(item, callback){
    
    Item.create(item, callback);
    console.log(callback);
}

//Update Item
/*module.exports.updateItem = function(id, item, options, callback){

    
    var query = {_id : id };
    var update = {
        
        imageRoute : item.imageRoute,
        item_title : item.item_title,
        item_detail : item.item_detail,
        item_price : item.item_price
    }

    Item.findOneAndUpdate(query, update, options, callback);
}*/
module.exports.updateItem = function(req,res){
	console.log('Calling Put')
	if(req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)){
        Item.findById(mongoose.Types.ObjectId(req.params.id),function(err,updatedBook){
		if(err){
			res.json({'message':"error in updating value",'status':400}).send(err);
		}else{
			if(req.body.imageRoute!== undefined){
				updatedBook.imageRoute=req.body.imageRoute;
			}
			if(req.body.item_title!== undefined){
				updatedBook.item_title=req.body.item_title;
			}
			if(req.body.item_detail!== undefined){
				updatedBook.item_detail=req.body.item_detail;
            }
            if(req.body.item_price!== undefined){
				updatedBook.item_price=req.body.item_price;
			}
			updatedBook.save().then(item =>{
				res.status(200).send(item);
			}).catch(err =>{
				res.status(400).send(err);
			});
		}
	});
	}
	else{
		res.json({'message':'No Item found with the given id','status':400}).status(400);
	}
};
// Delete Item
module.exports.deleteItem = function(id, callback){
    var query = {_id : id };
    console.log("Entered");
    Item.remove(query, callback);
}