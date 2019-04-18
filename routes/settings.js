const Pay = require("../models/categoriespay");
const Inc = require("../models/categoriesinc");

exports.pay = (req, res) => {
  const userid = req.body.userid;
  Pay.Category.all(userid).then(pay => {
    if (pay) {
      payments = [];
      pay.forEach(item => {
        paym = { id: item._id, name: item.name };
        payments.push(paym);
      });
      res.json(payments);
    } else {
      res.json();
    }
  });
};

exports.inc = (req, res) => {
  const userid = req.body.userid;
  Inc.Category.all(userid).then(inc => {
    if (inc) {
      income = [];
      inc.forEach(item => {
        incom = { id: item._id, name: item.name };
        income.push(incom);
      });
      res.json(income);
    } else {
      res.json();
    }
  });
};

exports.addpay = (req, res) => {
  const userid = req.body.userid;
  const namepay = req.body.namepay;
  Pay.Category.add(namepay, userid).then(() => {
    Pay.Category.find(namepay, userid).then(pay => {
      if (pay) {
        payment = { id: pay._id, name: pay.name };
        res.json(payment);
      } else {
        res.json();
      }
    });
  });
};

exports.addinc = (req, res) => {
  const userid = req.body.userid;
  const nameinc = req.body.nameinc;
  Inc.Category.add(nameinc, userid).then(() => {
    Inc.Category.find(nameinc, userid).then(inc => {
      if (inc) {
        income = { id: inc._id, name: inc.name };
        res.json(income);
      } else {
        res.json();
      }
    });
  });
};

exports.deletepay = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const userid = req.body.userid;
  Pay.Category.delete(id, name, userid).then(() => {
    const deletepay = { id: id, name: name };
    res.json(deletepay);
  });
};

exports.deleteinc = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const userid = req.body.userid;
  Inc.Category.delete(id, name, userid).then(() => {
    const deleteinc = { id: id, name: name };
    res.json(deleteinc);
  });
};

exports.renamepay = (req, res) => {
  const id = req.body.id;
  const newname = req.body.newname;
  const name = req.body.name;
  const userid = req.body.userid;
  Pay.Category.update(id, newname, name, userid).then(() => {
    const renamepay = { id: id, name: newname };
    res.json(renamepay);
  });
};

exports.renameinc = (req, res) => {
  const id = req.body.id;
  const newname = req.body.newname;
  const name = req.body.name;
  const userid = req.body.userid;
  Inc.Category.update(id, newname, name, userid).then(() => {
    const renameinc = { id: id, name: newname };
    res.json(renameinc);
  });
};
