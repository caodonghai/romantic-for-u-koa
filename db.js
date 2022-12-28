const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize(
  "romantic_for_u",
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  {
    host,
    port,
    dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    }
  }
);

// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

const User = sequelize.define("User", {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
  },
  birthday: {
    type: DataTypes.DATEONLY,
  },
  meetTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  navigateTo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// 定义愿望清单数据模型
const WishList = sequelize.define("WishList", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  wishTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wishDesc: {
    type: DataTypes.TEXT,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plannedTime: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  // 实例化将自动将 flag 设置为 true (如果未设置)
  flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
  await WishList.sync({ alter: true });
  await User.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
  WishList,
  User,
};
