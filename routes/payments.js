const Values = require("../models/value");

exports.values = (req, res) => {
  const userid = req.params.userid;
  Values.Value.all(userid, "pay").then(values => {
    payments = [];
    values.forEach(item => {
      val = { val: item.val, categoryname: item.categoryname };
      payments.push(val);
    });
    res.json(payments);
  });
};

exports.addvalue = (req, res) => {
  const userid = req.body.userid;
  const name = req.body.name;
  const value = req.body.value;
  Values.Value.add(value, userid, name, "pay").then(() => {
    const val = { val: value, categoryname: name };
    res.json(val);
  });
};
