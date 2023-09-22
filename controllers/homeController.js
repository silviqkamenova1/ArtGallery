const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home');
    //takes index.hbs by default
})

module.exports = router