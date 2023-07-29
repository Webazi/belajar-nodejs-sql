const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")
const app = express()

app.use(BodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
  host: "localhost",
  database: "coba",
  user: "root",
  password: "",

});

db.connect((err) => {
  if (err) throw err
  console.log("masokk")

  
    
  //untuk get data
  app.get("/", (req, res) => {
    const sql = ("SELECT * FROM user")
    db.query(sql, (err, result) => {

      const users = JSON.parse(JSON.stringify(result))
      console.log("hasil database -->", users)

      res.render("index", { users: users, title: "Mencoba anjay mabar" })
    })

    //untuk masukan data
    app.post("/tambah", (req, res) => {
      const insertSql = `INSERT INTO user (name_user , birth_user, Gander_user) VALUES ('${req.body.name_user}', '${req.body.birth_user}', '${req.body.Gander_user}')`;
      db.query(insertSql, (err, result) => {
        if (err) throw err; // Tambahkan penanganan kesalahan untuk melihat apakah ada masalah saat menjalankan kueri
        console.log("Data berhasil disimpan!");
        res.redirect("/"); // Redirect kembali ke halaman utama setelah data disimpan
      });
    });
})
})


app.listen(8000, () => {
  console.log("server siap pak supir")
})