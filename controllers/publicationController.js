const router = require('express').Router();

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
    //crypto.paymentMethod = paymentMethodsMap[crypto.paymentMethod]
    //const isBuyer = publication.buyers?.some(id => id == req.user?._id)
    const isOwner = publication.owner == req.user?._id;
    console.log(isOwner);
    res.render('art/details', { ...publication, isOwner})//, isBuyer
});





// router.get('/:cryptoId/buy', isAuth, async (req, res) => {
//     try{
//         await cryptoService.buy(req.user._id, req.params.cryptoId);
//     } catch(error){
//         return res.render('404')    
//     }

//     res.redirect(`/crypto/${req.params.cryptoId}/details`)
// });

// router.get('/:cryptoId/edit',isAuth, async (req, res) => {
//     const crypto = await cryptoService.getOne(req.params.cryptoId);

//     const paymentMethods = getPaymentDataViewData(crypto.paymentMethod);

//     res.render('crypto/edit', { crypto, paymentMethods })
// });

// router.post('/:cryptoId/edit', isAuth, async (req, res) => {
//     const cryptoData = req.body;
//     await cryptoService.edit(req.params.cryptoId, cryptoData);

//     res.redirect(`/crypto/${req.params.cryptoId}/details`)
// });



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

// router.get('/:cryptoId/delete', isAuth, async (req, res) => {

//     await cryptoService.delete(req.params.cryptoId);
//     res.render('/crypto/catalog')

// });


module.exports = router;