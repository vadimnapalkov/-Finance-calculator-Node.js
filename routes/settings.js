const paymentsCategories = require("../controllers/paymentsCategories");
const incomingCategories = require("../controllers/incomingCategories");

exports.payments = (req, res) => {
  const userid = Number(req.params.userid);
  paymentsCategories.all(userid).then(payments => {
    const paymentsResponse = JSON.stringify(payments, ["id", "name"]);
    res.json(paymentsResponse);
  });
};

exports.incoming = (req, res) => {
  const userid = Number(req.params.userid);
  incomingCategories.all(userid).then(incoming => {
    const incomingResponse = JSON.stringify(incoming, ["id", "name"]);
    res.json(incomingResponse);
  });
};

exports.addPayments = (req, res) => {
  const userid = Number(req.body.userid);
  const namepay = req.body.namepay;
  paymentsCategories.add(namepay, userid, payment => {
    let paymentsResponse = { id: payment.id, name: payment.name };
    res.json(paymentsResponse);
  });
};

exports.addIncoming = (req, res) => {
  const userid = Number(req.body.userid);
  const nameinc = req.body.nameinc;
  incomingCategories.add(nameinc, userid, income => {
    let incomeResponse = { id: income.id, name: income.name };
    res.json(incomeResponse);
  });
};

exports.deletePayments = (req, res) => {
  const id = Number(req.params.id);
  paymentsCategories.delete(id).then(() => {
    const deletepay = { id: id };
    res.json(deletepay);
  });
};

exports.deleteIncoming = (req, res) => {
  const id = Number(req.params.id);
  incomingCategories.delete(id).then(() => {
    const deleteinc = { id: id };
    res.json(deleteinc);
  });
};

exports.renamePayments = (req, res) => {
  const id = Number(req.body.id);
  const newname = req.body.newname;
  paymentsCategories.update(id, newname).then(() => {
    const renamepay = { id: id, name: newname };
    res.json(renamepay);
  });
};

exports.renameIncoming = (req, res) => {
  const id = Number(req.body.id);
  const newname = req.body.newname;
  incomingCategories.update(id, newname).then(() => {
    const renameinc = { id: id, name: newname };
    res.json(renameinc);
  });
};
