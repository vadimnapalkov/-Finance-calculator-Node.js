const paymentsCategories = require("../models/paymentsCategories");
const incomingCategories = require("../models/incomingCategories");

exports.payments = (req, res) => {
  const userid = req.params.userid;
  paymentsCategories.all(userid).then(payments => {
    if (payments) {
      const paymentsResponse = JSON.stringify(payments, ["_id", "name"]);
      res.json(paymentsResponse);
    } else {
      res.json();
    }
  });
};

exports.incoming = (req, res) => {
  const userid = req.params.userid;
  incomingCategories.all(userid).then(incoming => {
    if (incoming) {
      const incomingResponse = JSON.stringify(incoming, ["_id", "name"]);
      res.json(incomingResponse);
    } else {
      res.json();
    }
  });
};

exports.addPayments = (req, res) => {
  const userid = req.body.userid;
  const namepay = req.body.namepay;
  paymentsCategories.add(namepay, userid, (err, payment) => {
    if (err) console.log(err);
    if (payment) {
      let paymentsResponse = { _id: payment._id, name: payment.name };
      res.json(paymentsResponse);
    } else {
      res.json();
    }
  });
};

exports.addIncoming = (req, res) => {
  const userid = req.body.userid;
  const nameinc = req.body.nameinc;
  incomingCategories.add(nameinc, userid, (err, income) => {
    if (err) console.log(err);
    if (income) {
      let incomeResponse = { _id: income._id, name: income.name };
      res.json(incomeResponse);
    } else {
      res.json();
    }
  });
};

exports.deletePayments = (req, res) => {
  const id = req.params.id;
  paymentsCategories.delete(id).then(() => {
    const deletepay = { _id: id };
    res.json(deletepay);
  });
};

exports.deleteIncoming = (req, res) => {
  const id = req.params.id;
  incomingCategories.delete(id).then(() => {
    const deleteinc = { _id: id };
    res.json(deleteinc);
  });
};

exports.renamePayments = (req, res) => {
  const id = req.body.id;
  const newname = req.body.newname;
  paymentsCategories.update(id, newname).then(() => {
    const renamepay = { _id: id, name: newname };
    res.json(renamepay);
  });
};

exports.renameIncoming = (req, res) => {
  const id = req.body.id;
  const newname = req.body.newname;
  incomingCategories.update(id, newname).then(() => {
    const renameinc = { _id: id, name: newname };
    res.json(renameinc);
  });
};
