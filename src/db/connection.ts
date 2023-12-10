import mysql from "mysql2";

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: mysql.Connection;

  private constructor() {
    this.connection = mysql.createConnection({
      port: 55139,
      host: "monorail.proxy.rlwy.net",//"localhost",
      user: "root",
      password: "Gb2Fga-Cd2HfG-fD-c65gg-31beFGfBd",
      database: "railway",//"cvm-database",
      authPlugins: {
        mysql_clear_password: () => () => Buffer.from(process.env.PASSWORD_BD + "\0"),
      },
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }


  public getConnection(): mysql.Connection {
    return this.connection;
  }
}

const connection = DatabaseConnection.getInstance().getConnection();
export default connection;
