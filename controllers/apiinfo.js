const  axios  = require('axios');
const { response } = require('express');
const Usuario = require('../models/Usuario');


const apiRiot = process.env.VITE_R_API_KEY

const getSumByName = async(req,res = response ) => {

    try {

        const region = req.query.paramA
        const sumo = req.query.paramB

        const resp = await axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sumo}?api_key=${apiRiot}`)

        const data = resp.data

        res.status(201).send({
            data
        })

    } catch (error) {
        res.status(201).send({
            error
        })
        
    }
};

const getMatchesByPuuid = async(req,res = response ) => {

    const region = req.query.paramA //region
    const puuid = req.query.paramB  //puuid

    const resp = await axios.get(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${apiRiot}`)

    const data = resp.data

    res.status(201).send({
        data
    })

    
};

const getRankData = async(req,res = response ) => {

    const region = req.query.paramA //region
    const sumid = req.query.paramB  //sumid

    const resp = await axios.get(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumid}?api_key=${apiRiot}`)

    const data = resp.data

    res.status(201).send({
        data
    })

    
};


const getMatchData = async(req,res = response ) => {

    const region = req.query.paramA //region
    const sumid = req.query.paramB  //sumid

    const resp = await axios.get(`https://${region}.api.riotgames.com/lol/match/v5/matches/${sumid}?api_key=${apiRiot}`)

    const data = resp.data

    res.status(201).send({
        data
    })

    
};


const getChampMastery = async(req,res = response ) => {

    const region = req.query.paramA //region
    const puuid = req.query.paramB  //puuid

    const resp = await axios.get(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${apiRiot}`)

    const data = resp.data

    res.status(201).send({
        data
    })

    
};


const getAllChampList = async(req,res = response ) => {

    const resp = await axios.get(`https://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json`)

    const data = resp.data

    res.status(201).send({
        data
    })

    
};


const getActiveSummoners = async(req,res = response ) => {

    const sum = req.query.paramA //region


    const usuario = await Usuario.find()
    // .populate('user');

    res.status(201).json({
    usuario
    })

    
};

module.exports = { 
    getSumByName,
    getMatchesByPuuid,
    getMatchData,
    getActiveSummoners,
    getRankData,
    getChampMastery,
    getAllChampList
 }