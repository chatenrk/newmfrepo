const moment = require('moment');

/**
 * @desc This is a helper function which converts date in DD-MMM-YYYY format to ISODate format
 * @param inpdate in DD-MMM-YYYY format
 * @returns isodate ISODate formatted output
 */
function getMongoDate(inpdate) {
  // Convert date from DD-MMM-YYYY to ISO date
  let tempdate = moment(inpdate, 'DD-MMM-YYYY').format('YYYY-MM-DD');
  let isodate = moment(tempdate).toISOString();
  return isodate;
}

module.exports.getMongoDate = getMongoDate;
