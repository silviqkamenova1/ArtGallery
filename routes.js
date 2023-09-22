const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController')
const publicationController = require('./controllers/publicationController')

router.use(homeController)
router.use(authController)
router.use('/art', publicationController)


module.exports = router