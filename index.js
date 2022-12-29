const express = require("express");
const app = express();
const bodyParcer = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Rajaji",
  database: "gokulsbasket",
});
app.use(cors());
app.use(express.json());

app.use(bodyParcer.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const UserName = req.body.UserName;
  const UserEmail = req.body.UserEmail;
  const UserContact = req.body.UserContact;
  const UserPassword = req.body.UserPassword;

  const sqlInsert =
    "INSERT INTO UserDetails (UserName,UserEmail,UserContact,UserPassword) VALUES (?,?,?,?)";
  db.query(
    sqlInsert,
    [UserName, UserEmail, UserContact, UserPassword],
    (err, result) => {
      res.send(result);
    }
  );
});
app.get("/api/get", (req, res) => {
  const sqlInsert = "select * from UserDetails";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.get("/api/get/:UserEmail", (req, res) => {
  const UserEmail = req.params.UserEmail;
  const sqlInsert = "select * from UserDetails where UserEmail=?";

  db.query(sqlInsert, UserEmail, (err, result) => {
    res.send(result);
  });
});
app.post("/api/AddtoCart/:UserID",(req,res)=>{
  const UserID = req.params.UserID;
  const ProductQty = req.body.ProductQty;
  const ProductID = req.body.ProductID;
  const sqlInsert = "Insert Into AddToCart (ProductQty,ProductID,UserID) Values (?,?,?)";
  db.query(sqlInsert, [ProductQty,ProductID,UserID], (err, result) => {
    res.send(result);
  });
})
app.post("/api/UpdatetoCart/:CartID",(req,res)=>{
  const CartID = req.params.CartID;
  const ProductQty = req.body.ProductQty;
  const sqlInsert = "UPDATE AddToCart SET ProductQty=? where CartID=?";
  db.query(sqlInsert, [ProductQty,CartID], (err, result) => {
    res.send(result);
  });
})
app.delete("/api/DeletetoCart/:CartID",(req,res)=>{
  const CartID = req.params.CartID;
  const sqlInsert = "DELETE FROM AddToCart where CartID=?";
  db.query(sqlInsert, CartID, (err, result) => {
    res.send(result);
  });
})
app.get("/api/AddtoCart/:UserID", (req, res) => {
  const UserID = req.params.UserID;
  const sqlInsert = "select * from AddToCart where UserID=?";
  db.query(sqlInsert, UserID, (err, result) => {
    res.send(result);
  });
});

app.post("/api/InsertProductDetails", (req, res) => {
  const ProductName = req.body.ProductName;
  const ProductDetail = req.body.ProductDetail;
  const ProductOldPrice = req.body.ProductOldPrice;
  const ProductNewPrice = req.body.ProductNewPrice;
  const ProductURL = req.body.ProductURL;
  const ProductType = req.body.ProductType;
  const ProductAvailableQty = req.body.ProductAvailableQty;
  const ProductStatus = req.body.ProductStatus;

  const sqlInsert =
    "INSERT INTO productdetails (ProductName,ProductImageURL,ProductOldPrice,ProductNewPrice,ProductType,ProductDetail,ProductAvailableQty,ProductStatus) VALUES (?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      ProductName,
      ProductURL,
      ProductOldPrice,
      ProductNewPrice,
      ProductType,
      ProductDetail,
      ProductAvailableQty,
      ProductStatus
    ],
    (err, result) => {
      res.send(result);
    }
  );
});
app.post("/api/UpdateProductDetails/:ProductID", (req, res) => {
  const ProductID = req.params.ProductID;
  const ProductName = req.body.ProductName;
  const ProductDetail = req.body.ProductDetail;
  const ProductOldPrice = req.body.ProductOldPrice;
  const ProductNewPrice = req.body.ProductNewPrice;
  const ProductURL = req.body.ProductURL;
  const ProductType = req.body.ProductType;
  const ProductAvailableQty = req.body.ProductAvailableQty;
  const ProductStatus = req.body.ProductStatus;

  const sqlInsert ="UPDATE productdetails SET ProductName=?,ProductImageURL=?,ProductOldPrice=?,ProductNewPrice=?,ProductType=?,ProductDetail=?,ProductAvailableQty=?,ProductStatus=? WHERE ProductID=?"
   
  db.query(
    sqlInsert,
    [ ProductName,
      ProductURL,
      ProductOldPrice,
      ProductNewPrice,
      ProductType,
      ProductDetail,
      ProductAvailableQty,
      ProductStatus,
      ProductID
    ],
    (err, result) => {
      res.send(result);
    }
  );
});
app.get("/api/getProductDetails", (req, res) => {
  const sqlInsert = "select * from ProductDetails";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});
app.get("/api/getProductDetails/:ProductType", (req, res) => {
  const ProductType = req.params.ProductType;
  const sqlInsert = "select * from ProductDetails where ProductType=?";
  db.query(sqlInsert,ProductType, (err, result) => {
    res.send(result);
  });
});
app.get("/api/getProductDetails/:ProductType", (req, res) => {
  const ProductType = req.params.ProductType;
  const sqlInsert = "select * from ProductDetails where ProductType=?";
  db.query(sqlInsert,ProductType, (err, result) => {
    res.send(result);
  });
});
app.get("/api/GettoProductCartz/:UserID", (req, res) => {
  const UserID = req.params.UserID;
  const sqlInsert = "SELECT * FROM productdetails LEFT JOIN addtocart ON productdetails.ProductID = addtocart.ProductID WHERE addtocart.UserID=?";
  db.query(sqlInsert,UserID, (err, result) => {
    res.send(result);
  });
});
app.post("/api/AddtoAddressDetails/:UserID",(req,res)=>{
  const UserID = req.params.UserID;
  const DoorNo = req.body.DoorNo;
  const Building = req.body.Building;
  const Street = req.body.Street;
  const LandMark = req.body.LandMark;
  const Village = req.body.Village;
  const Pincode = req.body.Pincode;
  const CITY = req.body.CITY;
  const sqlInsert = "INSERT INTO UserAddress (DoorNo,Building,Street,LandMark,Village,Pincode,UserID,CITY) VALUES (?,?,?,?,?,?,?,?)";
  db.query(sqlInsert, [DoorNo,Building,Street,LandMark,Village,Pincode,UserID,CITY], (err, result) => {
    res.send(result);
  });
})

app.listen(5000, () => {
  console.log("running on port 5000");
});
