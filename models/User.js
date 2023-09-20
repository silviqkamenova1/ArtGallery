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
        required: [true, 'Email is required'],
    },
    // myPublications: {
    //     type: String,
    //     enum: {
    //         values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
    //         message: 'Inavlid payment method',
    //     },
    //     required: false,
    // },
})
const User = mongoose.model('User', userSchema);
module.exports = User;
//userSchema.virtual('repeatPassword')