var express = require("express");
const DButils = require("./utils/DButils");
var router = express.Router();

router.get('/team', async (req, res, next)=> {
    let team_name = req.query.team_name;
    let status = req.query.status;
    try{
        if(status===undefined && team_name!=undefined){
            console.log("The search matches tournament is:" + team_name);
            var result = await DButils.GetMatchesByTeam(team_name);
            res.status(200).send(result);
        }
        else if(status!=undefined && team_name!=undefined){
            console.log("The search matches team_name is: " + team_name+ " and the matches status is: "+status);
            var result = await DButils.GetMatchesByTeamAndStatus(team_name, status);
            res.status(200).send(result);
        }
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