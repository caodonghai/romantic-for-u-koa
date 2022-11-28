const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// 定义愿望清单数据模型
const Wish = sequelize.define("Wish", {
  createdAt: "createTime",
  updatedAt: "updateTime",
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.VARCHAR,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
  },
  useName: {
    type: DataTypes.VARCHAR,
    allowNull: false,
  },
  plannedTime: {
    type: DataTypes.DATETIME,
    allowNull: false,
  },
  // 实例化将自动将 flag 设置为 true (如果未设置)
  flag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
  await Wish.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
  Wish,
};
