
const { Schema, model } = require("mongoose");

const PostSchema = Schema({

    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    duo: {
        type: String,
        required: true
    },
    lines: [
        String
    ],
    date: {
        type: Date,
        required: true
    },
    userData: {
        name: { type: String },
        server: { type: String },
        imguser: { type: String },
        summoner: { type: String },
        tagline: { type: String },
        textuser: { type: String },
        title: { type: String },
        elocolor: { type: String },
        champmastery: [ String ],
        lines: [ String ],
        characteruser: [ String ],
        rank: [ String ],
        perceptionuser: [ String ],
        recommendation: [ String ],
        suminfo: [ String ],
        networks: [ String ]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});

PostSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Post', PostSchema );