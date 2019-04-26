const payments = require("../controllers/payments");
const incomingCategories = require("../controllers/incomingCategories");
const description = "in";

BuildIncomingForResponse = (incoming, userid, cb) => {
  incomingCategories.all(userid).then(incomingCategory => {
    let incomingResponse = [];
    incoming.forEach(income => {
      incomingResponse.push({
        value: income.value,
        categoryname: incomingCategory.find(
          category => category.id === income.categoryId
        ).name
      });
    });
    cb(incomingResponse);
  });
};

exports.values = (req, res) => {
  const userid = Number(req.params.userid);
  payments.findPaymentsByDescription(userid, description).then(incoming => {
    BuildIncomingForResponse(incoming, userid, incomingResponse => {
      res.json(incomingResponse);
    });
  });
};

exports.addValue = (req, res) => {
  const userid = Number(req.body.userid);
  const categoryId = Number(req.body.categoryId);
  const value = req.body.value;
  payments.add(value, userid, categoryId, description).then(() => {
    let valueBuild = [{ value: value, categoryId: categoryId }];
    BuildIncomingForResponse(valueBuild, userid, valueResponse => {
      res.json(valueResponse);
    });
  });
};
