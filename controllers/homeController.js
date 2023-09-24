const router = require('express').Router();
const publicationService = require('../services/publicationService');


router.get('/', async (req, res) => {
    const publicationResult = await publicationService.getAll();
    const publication = publicationResult.map(x => ({...x, shareCount: x.usersShared.length}))

    res.render('home', { publication });
    //takes index.hbs by default
})

module.exports = router