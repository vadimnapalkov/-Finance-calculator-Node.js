const payments = require("../models/payments");
const paymentsCategories = require("../models/paymentsCategories");
const description = "out";

BuildPaymentsForResponse = (payments, userid, cb) => {
  paymentsCategories.all(userid).then(paymentsCategory => {
    let paymentsResponse = [];
    payments.forEach(payment => {
      paymentsResponse.push({
        value: payment.value,
        categoryname: paymentsCategory.find(
          category => String(category._id) === payment.categoryId
        ).name
      });
    });
    cb(null, paymentsResponse);
  });
};

exports.values = (req, res) => {
  const userid = req.params.userid;
  payments.all(userid, description).then(payments => {
    BuildPaymentsForResponse(payments, userid, (err, paymentsResponse) => {
      if (err) {
        console.log(err);
        res.json();
      }
      res.json(paymentsResponse);
    });
  });
};

exports.addValue = (req, res) => {
  const userid = req.body.userid;
  const categoryId = req.body.categoryId;
  const value = req.body.value;
  payments.add(value, userid, categoryId, description).then(() => {
    let valueBuild = [{ value: value, categoryId: categoryId }];
    BuildPaymentsForResponse(valueBuild, userid, (err, valueResponse) => {
      if (err) {
        console.log(err);
        res.json();
      }
      res.json(valueResponse);
    });
  });
};
