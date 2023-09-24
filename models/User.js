const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 4,
        required:  [true, 'Username is required']
    },
    password: {
        type: String,
        minLength: 3,
        required: [true, 'Password is required'],
    },
    address: {
        type: String,

        ref: 'Publication',
        required: [true, 'Address is required'],
        
    },
    myPublications: [{
        type: mongoose.Types.ObjectId,
        minLength: 20,
        ref: 'Publication',
    }],
})
const User = mongoose.model('User', userSchema);
module.exports = User;
//userSchema.virtual('repeatPassword')