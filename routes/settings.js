const Payments = require("../models/paymentsCategories");
const Incoming = require("../models/incomingCategories");

exports.payments = (req, res) => {
  const userid = req.params.userid;
  Payments.all(userid).then(payments => {
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
  Incoming.all(userid).then(incoming => {
    if (incoming) {
      const incomingResponse = JSON.stringify(incoming, ["_id", "name"]);
      res.json(incomingResponse);
    } else {
      res.json();
    }
  });
};

exports.addpayments = (req, res) => {
  const userid = req.body.userid;
  const namepay = req.body.namepay;
  Payments.add(namepay, userid, (err, payment) => {
    if (err) console.log(err);
    if (payment) {
      let paymentsResponse = { _id: payment._id, name: payment.name };
      res.json(paymentsResponse);
    } else {
      res.json();
    }
  });
};

exports.addincoming = (req, res) => {
  const userid = req.body.userid;
  const nameinc = req.body.nameinc;
  Incoming.add(nameinc, userid, (err, income) => {
    if (err) console.log(err);
    if (income) {
      let incomeResponse = { _id: income._id, name: income.name };
      res.json(incomeResponse);
    } else {
      res.json();
    }
  });
};

exports.deletepayments = (req, res) => {
  const id = req.params.id;
  Payments.delete(id).then(() => {
    const deletepay = { _id: id };
    res.json(deletepay);
  });
};

exports.deleteincoming = (req, res) => {
  const id = req.params.id;
  Incoming.delete(id).then(() => {
    const deleteinc = { _id: id };
    res.json(deleteinc);
  });
};

exports.renamepayments = (req, res) => {
  const id = req.body.id;
  const newname = req.body.newname;
  Payments.update(id, newname).then(() => {
    const renamepay = { _id: id, name: newname };
    res.json(renamepay);
  });
};

exports.renameincoming = (req, res) => {
  const id = req.body.id;
  const newname = req.body.newname;
  Incoming.update(id, newname).then(() => {
    const renameinc = { _id: id, name: newname };
    res.json(renameinc);
  });
};
