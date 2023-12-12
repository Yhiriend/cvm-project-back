import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: mysql.Connection;

  private constructor() {
    console.log(process.env.DATABASE_PORT, process.env.DATABASE_NAME);
    this.connection = mysql.createConnection({
      port: Number(process.env.DATABASE_PORT),
      host: process.env.DATABASE_HOST, //"localhost",
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME, //"cvm-database",
      authPlugins: {
        mysql_clear_password: () => () =>
          Buffer.from(process.env.PASSWORD_BD + "\0"),
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
