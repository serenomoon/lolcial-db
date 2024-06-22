const { Schema, model } = require("mongoose");

const PerfilSchema = Schema({

    summoner: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    server: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imguser: {
        type: String,
        required: true
    },
    textuser: {
        type: String,
        required: true
    },
    perceptionuser: [
        String
    ],
    characteruser: [
        String
    ],
    networks: [
        String
    ],
    recommendation: [
        String
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

});

PerfilSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Perfil', PerfilSchema );