import connection from "../configs/connectDB";
class apiControllers {
  getAllUsers = async (req, res, next) => {
    let [results, fields] = await connection.query(`SELECT * FROM users`);
    res.status(200).json({ message: "ok", data: results });
  };
  createUser = async (req, res, next) => {
    let { fname, lname, email, address } = req.body;
    if (!fname || !lname || !email || !address) {
      return res.status(200).json({ message: "fail" });
    }
    let [results, fields] = await connection.execute(
      `INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)`,
      [fname, lname, email, address]
    );
    return res.status(200).json({ message: "ok" });
  };
  updateUser = async (req, res) => {
    let id = req.params.id;
    let { fname, lname, email, address } = req.body;
    if (!fname || !lname || !email || !address || !id) {
      return res.status(200).json({ message: "fail" });
    }
    await connection.execute(
      "UPDATE users SET firstName= ?, lastName= ?, email= ?, address= ? WHERE id= ?",
      [fname, lname, email, address, id]
    );
    return res.status(200).json({ message: "ok" });
  };

  deleteUser = async (req, res) => {
    let id = req.params.id;
    if (!id) {
      return res.status(200).json({ message: "fail" });
    }
    await connection.execute("DELETE FROM users WHERE id = ?", [id]);
    return res.status(200).json({ message: "ok" });
  };
}

export default new apiControllers();
