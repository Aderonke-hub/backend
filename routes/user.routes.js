const express = require("express")
const router = express.Router()
const userRoutes = require("../routes/user.routes")
const { getDash, getNew, getSignin, getDashboard, postRegister,postLogin } = require("../controllers/user.controllers")

router.post('/login', postLogin);

router.get('/dash', getDash)

router.get('/', getNew)

// router.get('/signup', (req, res) => {
//      res.render("index")
// })

router.get('/signin', getSignin)

router.get('/dashboard', getDashboard)
router.post('/reg', postRegister)
module.exports = router;