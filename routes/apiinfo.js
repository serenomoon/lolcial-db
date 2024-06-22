const { Router } = require('express');

const { getSumByName, getMatchesByPuuid, getSummonerByPuuid, getMatchData, getActiveSummoners, getRankData, getChampMastery, getAllChampList } = require('../controllers/apiinfo');

const router = Router();

router.get( '/sumbyname', getSumByName );
router.get( '/matchesbypuuid', getMatchesByPuuid );
router.get( '/summonerbypuuid', getSummonerByPuuid );
router.get( '/matchdata', getMatchData );
router.get( '/activesummoners', getActiveSummoners );
router.get( '/rankdata', getRankData );
router.get( '/champmastery', getChampMastery );

router.get( '/allchamplist', getAllChampList );





module.exports = router;