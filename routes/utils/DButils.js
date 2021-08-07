var fs = require('fs');
var parse = require('csv-parse');
const played_matches = readCSV("routes\\utils\\result_played.csv", 'played');
const upcoming_matches = readCSV("routes\\utils\\result_upcoming.csv", 'upcoming');


function readCSV(path, status) {
    var entries = [];
    var count = 0;
    fs.createReadStream(path)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', function (row) {
            count++;
            if (status=='played'){
              entries.push(new Match_Played(row[0], row[1], row[2], row[3], row[4], row[5],status))
            }
            else if (status=='upcoming'){
              entries.push(new Match_Upcoming(row[0], row[1], row[2], row[3], row[4], status))
            }
            
        })
    return entries;
}

class Match_Played {
    constructor(home_team, home_score, away_team, away_score, tournament, start_time, status) {
        this.home_team = home_team;
        this.home_score = home_score;
        this.away_team = away_team;
        this.away_score = away_score;
        this.tournament = tournament;
        this.start_time = start_time;
        this.status = status;
    }
}
class Match_Upcoming {
  constructor(home_team, away_team, tournament, start_time, kickoff, status) {
      this.home_team = home_team;
      this.away_team = away_team;
      this.tournament = tournament;
      this.start_time = start_time;
      this.kickoff = kickoff;
      this.status = status;
  }
}

async function GetMatchesByTeam(team_name){
  var found_played = played_matches.filter(element => element.home_team===team_name || element.away_team===team_name);
  var found_upcoming = upcoming_matches.filter(element => element.home_team===team_name || element.away_team===team_name);
  const found = {matches: found_played.concat(found_upcoming)}
  return found; 
};

async function GetMatchesByTeamAndStatus(team_name, status){
  if(status==='played'){
    var found_played = {matches: played_matches.filter(element => element.home_team===team_name || element.away_team===team_name)}
    return found_played;
  }
  else if(status==='upcoming'){
    var found_upcoming = {matches: upcoming_matches.filter(element => element.home_team===team_name || element.away_team===team_name)}
    return found_upcoming;
  }
};

async function GetMatchesByTournament(tournament){
  var found_played = played_matches.filter(element => element.tournament===tournament);
  var found_upcoming = upcoming_matches.filter(element => element.tournament===tournament);
  const found = {matches : found_played.concat(found_upcoming)}
  return found; 
};

async function GetMatchesByTournamentAndStatus(tournament, status){
  if(status==='played'){
    var found_played = {matches: played_matches.filter(element => element.tournament===tournament)}
    return found_played;
  }
  else if(status==='upcoming'){
    var found_upcoming = {matches: upcoming_matches.filter(element => element.tournament===tournament)}
    return found_upcoming;
  }
};

exports.GetMatchesByTeam = GetMatchesByTeam;
exports.GetMatchesByTeamAndStatus = GetMatchesByTeamAndStatus;
exports.GetMatchesByTournament = GetMatchesByTournament;
exports.GetMatchesByTournamentAndStatus = GetMatchesByTournamentAndStatus;
