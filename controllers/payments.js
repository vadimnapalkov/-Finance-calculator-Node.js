const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

BuildPayment = (val, userId, categoryId, description) => {
  let payment = {
    value: val,
    userId: userId,
    categoryId: categoryId,
    description: description
  };
  return payment;
};

class PaymentController {
  static add(value, userId, categoryId, description) {
    let paymentCreate = BuildPayment(value, userId, categoryId, description);
    return models.payments.create(paymentCreate);
  }

  static findPaymentsByDescription(userid, description) {
    return models.payments.findAll({
      where: { userId: userid, description: description }
    });
  }

  static findCategory(categoryId, description) {
    return models.payments.findAll({
      where: {
        categoryId: categoryId,
        description: description
      }
    });
  }

  static findByDate(userid, description, startdate, enddate) {
    return models.payments.findAll({
      where: {
        userId: userid,
        description: description,
        createdAt: {
          [Op.and]: [{ [Op.gte]: startdate }, { [Op.lte]: enddate }]
        }
      }
    });
  }

  static findAllPayments(userid) {
    return models.payments.findAll({ where: { userId: userid } });
  }

  static update(id, idOther) {
    return models.payments.update(
      { categoryId: idOther },
      { where: { id: id } }
    );
  }
}

module.exports = PaymentController;
