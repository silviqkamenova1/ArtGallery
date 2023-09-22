const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        //minLength: 5,
        required:  [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    address: {
        type: String,
        //minLength: 10,
        ref: 'Publication',
        required: [true, 'Address is required'],
        
    },
    myPublications: [{
        type: mongoose.Types.ObjectId,
        ref: 'Publication',
    }],
})
const User = mongoose.model('User', userSchema);
module.exports = User;
//userSchema.virtual('repeatPassword')