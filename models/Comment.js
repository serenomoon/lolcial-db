
const { Schema, model } = require("mongoose");

const CommentSchema = Schema({

    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    post: [
        String
    ],
    thread: [{
        comment:'',
        user:{
            name: { type: String },
            server: { type: String },
            imguser: { type: String },
            summoner: { type: String },
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
        likes: {
            number: {type: Number},
            userlike: [ String ]
        }
    }],
    likes: {
        number: {type: Number},
        userlike: [ String ]
    },
    userData: {
        name: { type: String },
        server: { type: String },
        imguser: { type: String },
        summoner: { type: String },
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

});

CommentSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Comment', CommentSchema );