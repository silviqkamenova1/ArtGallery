const Publication = require('../models/Publication');
const User = require('../models/User');

exports.getAll = () => Publication.find({}).lean();

exports.getOne = (publicationId) => Publication.findById(publicationId).lean();

exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('author');;

exports.getUserId = (userId) => User.findById(userId).lean()

exports.share = async (userId, publicationId) => {
    const publication = await Publication.findById(publicationId);
    publication.usersShared.push(userId);
    return publication.save()
}
exports.create = async (ownerId, publicationData) =>{ 
    publicationData.author = ownerId
    const publication = await Publication.create({...publicationData, owner: ownerId})

}
exports.addPublication = async (userId, publicationId) => {
    return User.updateOne({_id: userId }, { $push: { myPublications: publicationId}})
   
   
    // const user = await User.findById(userId);
    // user.myPublications.push(publication);

    // await user.save()
    
}


exports.edit = (publicationId, publicationData) => Publication.findByIdAndUpdate(publicationId, publicationData, { runValidators: true})

exports.delete =  (publicationId) =>  Publication.findByIdAndDelete(publicationId)