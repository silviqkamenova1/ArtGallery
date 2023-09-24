const Publication = require('../models/Publication');

exports.getAll = () => Publication.find({}).lean();

exports.getOne = (publicationId) => Publication.findById(publicationId).lean();

exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('author');;


exports.share = async (userId, publicationId) => {
    const publication = await Publication.findById(publicationId);
    publication.usersShared.push(userId);

    return publication.save()
}
//Crypto.findByIdAndUpdate(cryptoId, {$push: { buyers: userId}})
//(single query)mongo db push operator - find crypto by Id and update it when push userId in property buyers
exports.create = (ownerId, publicationData) =>{ 
publicationData.author = ownerId
Publication.create({...publicationData, owner: ownerId})
}



exports.edit = (publicationId, publicationData) => Publication.findByIdAndUpdate(publicationId, publicationData, { runValidators: true})

exports.delete =  (publicationId) =>  Publication.findByIdAndDelete(publicationId)