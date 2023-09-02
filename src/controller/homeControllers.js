import connection from "../configs/connectDB";
const multer = require("multer");

class homeController {
  getHome = async (req, res, next) => {
    let [results, fields] = await connection.query(`SELECT * FROM users`);
    res.render("index.ejs", { results: results });
  };
  getDetail = async (req, res, next) => {
    let id = req.params.id;
    let [results, fields] = await connection.query(
      `SELECT * FROM users WHERE id= ?`,
      [id]
    );

    res.send(JSON.stringify(results));
  };
  createNewUser = async (req, res, next) => {
    let { fname, lname, email, address } = req.body;
    let [results, fields] = await connection.execute(
      `INSERT INTO users (firstName, lastName, email, address) VALUES (?, ?, ?, ?)`,
      [fname, lname, email, address]
    );

    res.redirect("/");
  };
  deleteUser = async (req, res, next) => {
    let id = req.body.userID;
    await connection.execute("DELETE FROM users WHERE id = ?", [id]);
    res.redirect("/");
  };
  getEditUser = async (req, res, next) => {
    let id = req.params.id;
    let [results, fields] = await connection.query(
      `SELECT * FROM users WHERE id= ?`,
      [id]
    );
    res.render("edit.ejs", { results: results[0] });
  };
  updateUser = async (req, res, next) => {
    let { fname, lname, email, address, id } = req.body;
    await connection.execute(
      "UPDATE users SET firstName= ?, lastName= ?, email= ?, address= ? WHERE id= ?",
      [fname, lname, email, address, id]
    );
    res.redirect("/");
  };
  uploadFile = (req, res) => {
    res.render("upload.ejs");
  };

  upFile = async (req, res) => {
    if (req.err) {
      return res.send(req.err);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (req.file.size > 300000) {
      return res.status(400).send("Kích thước tệp quá lớn. Giới hạn là 300KB."); //kích thước tệp quá lớn
    }
    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`
    );
  };
  upMultipleFile = async (req, res, next) => {
    let result = "you have uploaded these images: <hr />";
    console.log(req.files);
    if (req.err) {
      return res.send(req.err); //upload sai định dạng
    } else if (req.files.length === 0) {
      return res.send("Please select an image to upload"); //ko chọn file để upload
    }
    const files = req.files;
    let index;

    for (index = 0; index < files.length; ++index) {
      if (files[index].size > 300000) {
        res.status(400).send("Kích thước tệp quá lớn. Giới hạn là 400KB."); //kích thước tệp quá lớn
        break;
      }
      result += `<img src="/images/${files[index].filename}" width="500"><hr />`;
    }

    result += `<a href="/upload-file">Upload another image</a>`;
    res.send(result);
  };
}
export default new homeController();
