/*
------------------------------------------------------------------------------------------------------------------------
* Declarations
------------------------------------------------------------------------------------------------------------------------
*/

var mongoose = require('mongoose');
var integerValidator = require('mongoose-integer');
var SchemaTypes = mongoose.Schema.Types;

let dateHelpers = require('../helpers/datehelpers');

/*
------------------------------------------------------------------------------------------------------------------------
* Schema and Model Definition
------------------------------------------------------------------------------------------------------------------------
*/

var earnSchema = mongoose.Schema({
  earnDate: Date,
  earnSource: String,
  amount: {
    type: Number,
    integer: true
  }
});

earnSchema.plugin(integerValidator);
var earnModel = mongoose.model('earning', earnSchema);

/*
------------------------------------------------------------------------------------------------------------------------
* Get Methods
------------------------------------------------------------------------------------------------------------------------
*/
//This route gets all the documents
async function findAll() {
  try {
    let earndetls;
    earndetls = await earnModel.find();

    return earndetls;
  } catch (err) {
    return err;
  }
}

/*
------------------------------------------------------------------------------------------------------------------------
* Post Methods
------------------------------------------------------------------------------------------------------------------------
*/

async function postOne(earning) {
  try {
    let earndetls;
    var _id = new mongoose.Types.ObjectId();
    earndetls = await earnModel.create({
      earnDate: dateHelpers.getMongoDate(earning.date),
      earnSource: earning.source,
      amount: earning.amount
    });

    // var parseResult = helpers.parseOutput(errflag, navdetls);
  } catch (err) {
    // var operation = err.getOperation();
    // var errflag = true;
    // var parseResult = helpers.parseOutput(errflag, err, operation);
  }
  //   return parseResult;
}

module.exports = {
  postOne: postOne
};
