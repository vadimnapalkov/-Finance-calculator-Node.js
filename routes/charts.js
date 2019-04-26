const payments = require("../controllers/payments");
const paymentsCategories = require("../controllers/paymentsCategories");
const incomingCategories = require("../controllers/incomingCategories");
const descriptionPayments = "out";
const descriptionIncoming = "in";
SearchDates = paymentsForDate => {
  let dates = [];
  paymentsForDate.forEach(payment => {
    createDate =
      payment.createdAt.getMonth() + 1 + "/" + payment.createdAt.getFullYear();
    if (dates.indexOf(createDate) == -1) dates.push(createDate);
  });
  return dates;
};
BuildParametresForDate = date => {
  let startdate =
    date.substring(date.indexOf("/") + 1) +
    "-" +
    0 +
    date.substring(0, date.indexOf("/")) +
    "-02";
  let enddate =
    new Date(startdate).getFullYear() +
    "-" +
    0 +
    (new Date(startdate).getMonth() + 2);

  return { startdate: startdate, enddate: enddate };
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
      if (paymentByDate.categoryId == Category.id)
        sum = sum + paymentByDate.value;
    });
    dataForResponse.payments.push(sum);
    dataForResponse.paymentsCategories.push(Category.name);
    sum = 0;
  });
  Categoriesincoming.forEach(Category => {
    incomingByDate.forEach(incomeByDate => {
      if (incomeByDate.categoryId == Category.id)
        sum = sum + incomeByDate.value;
    });
    dataForResponse.incoming.push(sum);
    dataForResponse.incomingCategories.push(Category.name);
    sum = 0;
  });
  cb(dataForResponse);
};

exports.dataForCharts = (req, res) => {
  const userid = Number(req.query.userid);
  const date = req.query.date;
  dates = BuildParametresForDate(date);
  paymentsCategories.all(userid).then(Categoriespayments => {
    incomingCategories.all(userid).then(Categoriesincoming => {
      payments
        .findByDate(userid, descriptionPayments, dates.startdate, dates.enddate)
        .then(paymentsByDate => {
          payments
            .findByDate(
              userid,
              descriptionIncoming,
              dates.startdate,
              dates.enddate
            )
            .then(incomingByDate => {
              BuildDataForResponse(
                Categoriespayments,
                Categoriesincoming,
                paymentsByDate,
                incomingByDate,
                dataForResponse => {
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
  const userid = Number(req.params.userid);
  payments.findAllPayments(userid).then(paymentsForDate => {
    let dates = SearchDates(paymentsForDate);
    res.json(dates);
  });
};
