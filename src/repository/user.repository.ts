import connection from "../db/connection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.type";
import {
  DbUser,
  mapDbUserToUser,
  mapUserToDb,
} from "../utils/adapters/user.mappers";
import { convertMinutesInMillis } from "../utils/time-helper";

export const login = async (email: string, password: string) => {
  const sql = "SELECT * FROM users WHERE email = ?";

  return new Promise((resolve, reject) => {
    connection.query(sql, [email], async (err, result: any) => {
      if (err) {
        reject(err);
      } else {
        let data: any = {};
        if (result.length === 0) {
          resolve({ msg: "Invalid Email", data: false });
        } else {
          data = result[0];
          const userPassword = data.password;

          try {
            const passwordMatch = await bcrypt.compare(password, userPassword);

            if (passwordMatch) {
              const token = jwt.sign(
                mapDbUserToUser(data),
                process.env.SECRET_KEY!,
                {
                  expiresIn: convertMinutesInMillis(60).toString(),
                }
              );

              const dataWithoutPassword: DbUser = await mapUserToDb(
                mapDbUserToUser(data)
              );
              delete dataWithoutPassword.password;

              resolve({ token, data: dataWithoutPassword });
            } else {
              resolve({ msg: "Invalid Password" });
            }
          } catch (err: any) {
            reject(err.message);
          }
        }
      }
    });
  });
};

export const signIn = async (user: User) => {
  try {
    const dbUser = await mapUserToDb(user);

    const insertResult = await new Promise<number>((resolve, reject) => {
      connection.beginTransaction(async (transactionError) => {
        if (transactionError) {
          reject(transactionError);
          return;
        }

        try {
          connection.query(
            "INSERT INTO users SET ?",
            dbUser,
            async (err, data: any) => {
              if (err) {
                connection.rollback(() => {
                  reject(err.message);
                });
              } else {
                const userId = data.insertId;

                const cartInsertResult = await new Promise<number>(
                  (cartResolve, cartReject) => {
                    connection.query(
                      "INSERT INTO cart SET user_id = ?, total = 0, paid = false",
                      [userId],
                      (cartErr, cartData: any) => {
                        if (cartErr) {
                          connection.rollback(() => {
                            cartReject(cartErr.message);
                          });
                        } else {
                          cartResolve(cartData.insertId);
                        }
                      }
                    );
                  }
                );

                connection.commit((commitError) => {
                  if (commitError) {
                    connection.rollback(() => {
                      reject(commitError);
                    });
                  } else {
                    resolve(userId);
                  }
                });
              }
            }
          );
        } catch (error: any) {
          connection.rollback(() => {
            reject(error.message);
          });
        }
      });
    });

    const selectResult = await new Promise<any>((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE id = ?";
      connection.query(sql, [insertResult], (err, data: any) => {
        if (err) {
          reject(err.message);
        } else {
          if (data.length > 0) {
            const dataMapped: User = mapDbUserToUser(data[0]);
            const token = jwt.sign(dataMapped, process.env.SECRET_KEY!, {
              expiresIn: convertMinutesInMillis(60).toString(),
            });
            delete dataMapped.password;
            resolve({ token, data: dataMapped });
          } else {
            reject("User not found");
          }
        }
      });
    });

    return selectResult;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export const update = async (user: User, newPassword: string) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [user.id],
      (err, result: any) => {
        if (err) {
          reject(err.message);
        } else {
          if (result.length === 0) {
            reject("Invalid user");
          } else {
            const updateData: User = user;

            bcrypt.compare(
              user.password!,
              result[0].password,
              (err, result) => {
                if (err) {
                  resolve(err.message);
                } else {
                  if (result) {
                    if (newPassword) {
                      bcrypt.hash(newPassword, 10).then((hash) => {
                        updateData.password = hash;

                        connection.query(
                          "UPDATE users SET ? WHERE id = ?",
                          [updateData, user.id],
                          (err, data: any) => {
                            if (err) {
                              reject(err.message);
                            } else {
                              if (data.affectedRows > 0) {
                                resolve({ msg: true });
                              }
                            }
                          }
                        );
                      });
                    } else {
                      connection.query(
                        "UPDATE users SET ? WHERE id = ?",
                        [updateData, user.id],
                        (err, data) => {
                          if (err) {
                            reject(err.message);
                          } else {
                            resolve({
                              msg: true,
                            });
                          }
                        }
                      );
                    }
                  } else {
                    resolve({ msg: false });
                  }
                }
              }
            );
          }
        }
      }
    );
  });
};

export const getUser = (token: string): any | null => {
  try {
    const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY!);

    if (decodedToken) {
      delete decodedToken.password;
      const response = {
        data: mapDbUserToUser(decodedToken),
      };
      return response;
    }

    return null;
  } catch (error: any) {
    console.error("Error al decodificar el token:", error.message);
    return null;
  }
};
