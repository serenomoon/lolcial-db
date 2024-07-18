const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
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
    lines: [
        String
    ],
    networks: [
        String
    ],
    recommendation: [
        String
    ],
    suminfo: [
        String
    ],
    rank: [
        String
    ],
    champmastery: [
        String
    ],
    tags: {
        type: Object,
    },
    tutorialcheck: [
        Number
    ],
    elocolor: {
        type: String,
        required: true
    }

});

module.exports = model( 'Usuario', UsuarioSchema );