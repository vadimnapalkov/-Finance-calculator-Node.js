const payments = require("../models/payments");
const incomingCategories = require("../models/incomingCategories");
const description = "in";

BuildIncomeForResponse = (incoming, userid, cb) => {
  incomingCategories.all(userid).then(incomingCategory => {
    let incomingResponse = [];
    incoming.forEach(income => {
      incomingResponse.push({
        value: income.value,
        categoryname: incomingCategory.find(
          category => String(category._id) === income.categoryId
        ).name
      });
    });
    cb(null, incomingResponse);
  });
};

exports.values = (req, res) => {
  const userid = req.params.userid;
  payments.all(userid, description).then(incoming => {
    BuildIncomeForResponse(incoming, userid, (err, incomingResponse) => {
      if (err) {
        console.log(err);
        res.json();
      }
      res.json(incomingResponse);
    });
  });
};

exports.addValue = (req, res) => {
  const userid = req.body.userid;
  const categoryId = req.body.categoryId;
  const value = req.body.value;
  payments.add(value, userid, categoryId, description).then(() => {
    let valueBuild = [{ value: value, categoryId: categoryId }];
    BuildIncomeForResponse(valueBuild, userid, (err, valueResponse) => {
      if (err) {
        console.log(err);
        res.json();
      }
      res.json(valueResponse);
    });
  });
};
