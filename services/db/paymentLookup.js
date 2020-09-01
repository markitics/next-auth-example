const { Sequelize, DataTypes, Model } = require("sequelize");
import Payment from "../../models/Payment";

const getPayments = async (touser_id = 13442) => {
  try {
    // await sequelize.authenticate();
    const message = "Connection has been established successfully.";
    console.log(message);
    const pays = await Payment.findAll({
      where: {
        touser_id: touser_id,
        // uid: "zq75ndfwa",
      },
    });
    // const pays = await Payment.findOne({});
    console.log(pays);
    return pays;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return [];
  }
};

export default getPayments;
