const mongoose = require('mongoose');

const publicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    paintingTechnique: {
        type: String,
        required: [true, 'PaintingTechnique is required'],
    },
    artPicture: {
        type: String,
        required: [true, 'ArtPicture is required'],
    },
    certificate: {
        type: String,
        enum: ['Yes', 'No'],
        required: [true, 'Certificate is required'],
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    usersShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    
})


const Publication = mongoose.model('Publication', publicSchema);

module.exports = Publication;