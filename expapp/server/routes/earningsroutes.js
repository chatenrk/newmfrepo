const express = require('express');
const router = express.Router();

const earningsmodel = require('../models/earningsmodel');

// Route to get scheme details, based on ID
router.get('/allearnings', async (req, res, next) => {
  try {
    earndetls = await earningsmodel.findAll();
    res.send(earndetls);
  } catch (err) {
    return res.status(500).send(err);
  }
});

//Route to post a single earning to database
router.post('/poneearn', async (req, res, next) => {
  var earning = {
    date: req.body.earnDate,
    source: req.body.earnSource,
    amount: req.body.amount
  };

  try {
    let earndetls = await earningsmodel.postOne(earning);
    res.send(earndetls);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// // Route to get scheme details, based on ID
// router.get('/mullinedata', async (req, res, next) => {

//   var scode = req.query.scode;

//   try {
//     navdetls = await chtdatamodel.findAllMulLineData(scode);
//     res.send(navdetls);
//   } catch (err) {
//     return res.status(500).send(err);
//   }

// });

// // Route to get scheme details, based on ID
// router.get('/legenddata', async (req, res, next) => {

//   try {
//     navdetls = await chtdatamodel.getLegendData();
//     res.send(navdetls);
//   } catch (err) {
//     return res.status(500).send(err);
//   }

// });

// // Route to get pie details
// router.get('/piedetails', async (req, res, next) => {

//   try {
//     navdetls = await chtdatamodel.findAllPie();
//     res.send(navdetls);
//   } catch (err) {
//     return res.status(500).send(err);
//   }

// });

// // Route to get pie details
// router.get('/projdetails', async (req, res, next) => {

//   try {
//     navdetls = await chtdatamodel.getProjData();
//     res.send(navdetls);
//   } catch (err) {
//     return res.status(500).send(err);
//   }

// });

module.exports = router;
