const { Sequelize, DataTypes, Model } = require("sequelize");
// Option 1: Passing a connection URI
// const sequelize = new Sequelize(process.env.DJANGO_DATABASE_URL);
// , {
//   dialect: "postgres",
// });
// const sequelize = new Sequelize("sqlite::memory");

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DJANGO_DATABASE_NAME,
  process.env.DJANGO_DATABASE_USERNAME,
  process.env.DJANGO_DATABASE_PASSWORD,
  {
    host: process.env.DJANGO_DATABASE_HOST,
    port: process.env.DJANGO_DATABASE_PORT,
    dialect: "postgres",
  }
);

const paymentSchema = {
  // Model attributes are defined here
  uid: {
    type: DataTypes.STRING,
    // see DataTypes https://sequelize.org/master/manual/model-basics.html
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    // allowNull defaults to true
  },
};

class Payment extends Model {
  static classLevelMethod() {
    return "foo";
  }
  instanceLevelMethod() {
    return "bar";
  }
  static getFullName() {
    return [this.comment, "is the comment, for pay ", this.uid].join(" ");
  }
}

Payment.init(paymentSchema, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: "Payment", // We need to choose the model name
  timestamps: false,
  tableName: "audiotracks_payment",
});

// the defined model is the class itself
// console.log(Payment === sequelize.models.Payment); // true

export default Payment;
