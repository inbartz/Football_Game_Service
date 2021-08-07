var express = require("express");
const DButils = require("./utils/DButils");
var router = express.Router();

router.get('/team', async (req, res, next)=> {
    let team_name = req.query.team_name;
    console.log("The search team name is:" + team_name);
    try{
        var result = await DButils.GetMatchesByTeam(team_name);
        res.status(200).send(result);
    }
    catch(error){
        next(error);
      } 
})


router.get('/status', async (req, res, next)=> {
    let status = req.query.status;
    console.log("The search matches status is:" + status);
    try{
        var result = await DButils.GetMatchesByStatus(status);
        res.status(200).send(result);
    }
    catch(error){
        next(error);
      } 
})

router.get('/tournament', async (req, res, next)=> {
    let tournament = req.query.tournament;
    let status = req.query.status;
    
    try{
        if(status===undefined && tournament!=undefined){
            console.log("The search matches tournament is:" + tournament);
            var result = await DButils.GetMatchesByTournament(tournament);
            res.status(200).send(result);
        }
        else if(status!=undefined && tournament!=undefined){
            console.log("The search matches tournament is: " + tournament+ " and the matches status is: "+status);
            var result = await DButils.GetMatchesByTournamentAndStatus(tournament, status);
            res.status(200).send(result);
        }
    }
    catch(error){
        next(error);
      } 
})

module.exports = router;