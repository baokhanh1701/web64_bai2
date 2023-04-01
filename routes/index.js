var express = require('express');
var router = express.Router();
const [getAllInventories, getLowInventories, getOrders] = require("../controllers/serverController");
const AuthHandler = require("../controllers/authController");
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'h3254hgu4123ug';
const checkAuthenticated = (req, res, next) => {
  const { token } = req.body;
  jwt.verify(token, JWT_SECRET_KEY, (err, encoded) => {
    if (!err) {
      next();
    }
    else {
      res.status(403).json({
        msg: "You must log in or sign up before!",
        error: err
      })
    }
  })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', AuthHandler);
router.get('/inventories/all', checkAuthenticated, getAllInventories);
router.get('/inventories/get-low', checkAuthenticated, getLowInventories);
router.get('/orders', checkAuthenticated, getOrders);

module.exports = router;
