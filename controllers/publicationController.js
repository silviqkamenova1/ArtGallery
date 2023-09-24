const router = require('express').Router();
const mongoose = require('mongoose');


//const { paymentMethodsMap } = require('../constants');
const { isAuth } = require('../middlewares/authMiddleware');
const publicationService = require('../services/publicationService');
const { getErrorMessage } = require('../utils/errorutils');
//const { getPaymentDataViewData } = require('../utils/viewDataUtils')

router.get('/catalog', async (req, res) => {
    
    const publication = await publicationService.getAll();


    res.render('art/catalog', { publication })
});

router.get('/profile', async (req, res) => {
    // const { name, paymentMethod } = req.query;
    // const crypto = await cryptoService.search(name, paymentMethod);
    // const paymentMethods = getPaymentDataViewData(paymentMethod);

    res.render('art/profile')//, { crypto, paymentMethods, name })
});

router.get('/:publicationId/details', async (req, res) => {
    const publication = await publicationService.getOneDetailed(req.params.publicationId).lean();
    ObjectId = publication.author._id;

    // console.log(ObjectId.toString());
    // console.log(req.user?._id);

    const isOwner = ObjectId.toString() == req.user?._id;
    const isShared = publication.usersShared?.some(id => id == req.user?._id)
    //console.log(isOwner);
    res.render('art/details', { ...publication, isOwner, isShared})//, 
});

//crypto.paymentMethod = paymentMethodsMap[crypto.paymentMethod]




router.get('/:publicationId/shared', isAuth, async (req, res) => {
    try{
        await publicationService.share(req.user._id, req.params.publicationId);
    } catch(error){
        return res.render('404')    
    }

    res.redirect('/')
});

router.get('/:publicationId/edit',isAuth, async (req, res) => {
    const publication = await publicationService.getOne(req.params.publicationId);

    //const paymentMethods = getPaymentDataViewData(crypto.paymentMethod);

    res.render('art/edit', { ...publication })//, paymentMethods
});

router.post('/:publicationId/edit', isAuth, async (req, res) => {
    const publication = req.body;
    await publicationService.edit(req.params.publicationId, req.body);

    res.redirect(`/art/${req.params.publicationId}/details`)
});



router.get('/create', isAuth, (req, res) => {
    res.render('art/create');
});

router.post('/create', isAuth, async (req, res) => {
    const publicationData = req.body;
    
    try {
        await publicationService.create(req.user._id, publicationData);
    } catch (error) {
        return res.status(400).render('art/create', {error: getErrorMessage(error)})
    }
    
    res.redirect('/art/catalog');
});

router.get('/:publicationId/delete', isAuth, async (req, res) => {

    await publicationService.delete(req.params.publicationId);
    res.redirect('/art/catalog')

});


module.exports = router;