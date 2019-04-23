const payments = require("../models/payments");
const paymentsCategories = require("../models/paymentsCategories");
const incomingCategories = require("../models/incomingCategories");
const descriptionPayments = "out";
const descriptionIncoming = "in";

SearchDates = paymentsForDate => {
  let dates = [];
  paymentsForDate.forEach(payment => {
    if (dates.indexOf(payment.date) == -1) dates.push(payment.date);
  });
  return dates;
};

BuildDataForResponse = (
  Categoriespayments,
  Categoriesincoming,
  paymentsByDate,
  incomingByDate,
  cb
) => {
  const dataForResponse = {
    paymentsCategories: [],
    payments: [],
    incomingCategories: [],
    incoming: []
  };
  let sum = 0;
  Categoriespayments.forEach(Category => {
    paymentsByDate.forEach(paymentByDate => {
      if (paymentByDate.categoryId == String(Category._id))
        sum = sum + Number(paymentByDate.value);
    });
    dataForResponse.payments.push(sum);
    dataForResponse.paymentsCategories.push(Category.name);
    sum = 0;
  });
  Categoriesincoming.forEach(Category => {
    incomingByDate.forEach(incomeByDate => {
      if (incomeByDate.categoryId == String(Category._id))
        sum = sum + Number(incomeByDate.value);
    });
    dataForResponse.incoming.push(sum);
    dataForResponse.incomingCategories.push(Category.name);
    sum = 0;
  });
  cb(null, dataForResponse);
};

exports.dataForCharts = (req, res) => {
  const userid = req.query.userid;
  const date = req.query.date;
  paymentsCategories.all(userid).then(Categoriespayments => {
    incomingCategories.all(userid).then(Categoriesincoming => {
      payments
        .findByDate(userid, descriptionPayments, date)
        .then(paymentsByDate => {
          payments
            .findByDate(userid, descriptionIncoming, date)
            .then(incomingByDate => {
              BuildDataForResponse(
                Categoriespayments,
                Categoriesincoming,
                paymentsByDate,
                incomingByDate,
                (err, dataForResponse) => {
                  if (err) {
                    console.log(err);
                    res.json();
                  }
                  const dataJSON = JSON.stringify(dataForResponse);
                  res.json(dataJSON);
                }
              );
            });
        });
    });
  });
};

exports.getDates = (req, res) => {
  const userid = req.params.userid;
  payments.findAllPayments(userid).then(paymentsForDate => {
    let dates = SearchDates(paymentsForDate);
    res.json(dates);
  });
};
