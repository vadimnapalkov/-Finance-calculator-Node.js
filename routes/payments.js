const payments = require("../controllers/payments");
const paymentsCategories = require("../controllers/paymentsCategories");
const description = "out";

BuildPaymentsForResponse = (payments, userid, cb) => {
  paymentsCategories.all(userid).then(paymentsCategory => {
    let paymentsResponse = [];
    payments.forEach(payment => {
      paymentsResponse.push({
        value: payment.value,
        categoryname: paymentsCategory.find(
          category => category.id === payment.categoryId
        ).name
      });
    });
    cb(paymentsResponse);
  });
};

exports.values = (req, res) => {
  const userid = Number(req.params.userid);
  payments.findPaymentsByDescription(userid, description).then(payments => {
    BuildPaymentsForResponse(payments, userid, paymentsResponse => {
      res.json(paymentsResponse);
    });
  });
};

exports.addValue = (req, res) => {
  const userid = Number(req.body.userid);
  const categoryId = Number(req.body.categoryId);
  const value = req.body.value;
  payments.add(value, userid, categoryId, description).then(() => {
    let valueBuild = [{ value: value, categoryId: categoryId }];
    BuildPaymentsForResponse(valueBuild, userid, valueResponse => {
      res.json(valueResponse);
    });
  });
};
