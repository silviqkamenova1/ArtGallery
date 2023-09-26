const User = require('../models/User');

exports.addPublication = async (userId, publicationId) => {
    return User.updateOne({_id: userId }, { $push: { myPublications: publicationId}})
   
   
    // const user = await User.findById(userId);
    // user.myPublications.push(publication);

    // await user.save()
    
}