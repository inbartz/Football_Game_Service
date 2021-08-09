var fs = require('fs');
var parse = require('csv-parse');
const matches_data = [];
const played_matches = readCSV("routes\\utils\\result_played.csv", 'played');
const upcoming_matches = readCSV("routes\\utils\\result_upcoming.csv", 'upcoming');



///// Help functions ////
function readCSV(path, status) {
    var spesific_data = [];
    fs.createReadStream(path)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', function (row) {
            if (status=='played'){
              matches_data.push(new Match(row[0], row[2], row[4], row[5],status))
              var id = matches_data.length -1;
              spesific_data.push(new Match_Played(id, row[1], row[3]))
            }
            else if (status=='upcoming'){
              matches_data.push(new Match(row[0], row[1], row[2], row[3],status))
              var id = matches_data.length -1;
              spesific_data.push(new Match_Upcoming(id, row[4]))
            }
        })
    return spesific_data;
}

function get_teams(){
  var teams = [];
  var data = matches_data;
  var id = 0;
  data.forEach(function(item, index){
    if(!teams.includes(item.home_team)){
      teams.push(item.home_team);
    }
    if(!teams.includes(item.away_team)){
      teams.push(item.away_team);
    }
  });
  teams.forEach(function(item, index){
    teams[index] = new Team(id, item);
    id++;
  })
  return teams;
}

function get_tournament(){
  var tournament = [];
  var id = 0;
  var data = matches_data;
  data.forEach(function(item, index){
    if(!tournament.includes(item.tournament)){
      tournament.push(item.tournament);
    }
  });
  tournament.forEach(function(item, index){
    tournament[index] = new Tournament(id, item);
    id++;
  })
  return tournament;
}
function test(){
  const teams = get_teams();
  const tournament = get_tournament();
  return {teams: teams, tournament: tournament};
}



//// Format for return data ////
function matches_full_data(matches, played, upcoming){
  var result = [];
  var filtered_matches = matches;
  filtered_matches.forEach(function (item, index){
    if(item.status==='played' && played){
      var row = played_match_json(item,index);
      result.push(row)
    }
    else if(item.status==='upcoming' && upcoming){
      var row = upcoming_match_json(item, index);
      result.push(row)
    }
  });
  return result;
}

function played_match_json(item, index){
  var home_score = played_matches[index].home_score;
    var away_score = played_matches[index].away_score;
    var row = {home_team: item.home_team, home_score: home_score, away_team: item.away_team, away_score: away_score, tournament: item.tournament, 
              start_time: item.start_time, status: item.status}
    return row;
}

function upcoming_match_json(item, index){
    var kickoff = upcoming_matches[index].kickoff;
    var row = {home_team: item.home_team, away_team: item.away_team, tournament: item.tournament, 
              start_time: item.start_time, kickoff: kickoff, status: item.status}
    return row;
}


//// Main functions ////
function GetTeamById(id){
  return teams.find(element => element.team_id===id);
};

function GetTournamentById(id){
  return tournament.find(element => element.tournament_id===id);
};

function GetMatchesByTeam(team_name){
  var filtered_matches = matches_data.filter(element => element.home_team===team_name || element.away_team===team_name);
  var result = matches_full_data(filtered_matches, true, true);
  return result; 
};

function GetMatchesByTeamAndStatus(team_name, status){
  var filtered_matches = matches_data.filter(element => element.home_team===team_name || element.away_team===team_name)
  if(status==='played'){
    var full_data_played = matches_full_data(filtered_matches, true, false);
    return full_data_played;
  }
  else if(status==='upcoming'){
    var full_data_upcoming = matches_full_data(filtered_matches, false, true);
    return full_data_upcoming;
  }
};

function GetMatchesByTournament(tournament){
  var filtered_matches = matches_data.filter(element => element.tournament===tournament);
  var result = matches_full_data(filtered_matches, true, true);
  return result; 
};

function GetMatchesByTournamentAndStatus(tournament, status){
  var filtered_matches = matches_data.filter(element => element.tournament===tournament)
  if(status==='played'){
    var full_data_played = matches_full_data(filtered_matches, true, false);
    return full_data_played;
  }
  else if(status==='upcoming'){
    var full_data_upcoming = matches_full_data(filtered_matches, false, true);
    return full_data_upcoming;
  }
};



// DB classes
class Team {
  constructor(team_id, team_name) {
      this.team_id = team_id;
      this.team_name = team_name;
  }
}

class Tournament{
  constructor(tournament_id, tournament_name) {
    this.tournament_id = tournament_id;
    this.tournament_name = tournament_name;
}
}

class Match {
  constructor(home_team, away_team, tournament, start_time, status) {
      this.home_team = home_team;
      this.away_team = away_team;
      this.tournament = tournament;
      this.start_time = start_time;
      this.status = status;
  }
}

class Match_Played {
    constructor(match_id , home_score, away_score) {
        this.match_id = match_id;
        this.home_score = home_score;
        this.away_score = away_score; 
    }
}

class Match_Upcoming {
  constructor(match_id, kickoff) {
      this.match_id = match_id;
      this.kickoff = kickoff;
  }
}


exports.GetMatchesByTeam = GetMatchesByTeam;
exports.GetMatchesByTeamAndStatus = GetMatchesByTeamAndStatus;
exports.GetMatchesByTournament = GetMatchesByTournament;
exports.GetMatchesByTournamentAndStatus = GetMatchesByTournamentAndStatus;
exports.GetTeamById = GetTeamById;
exports.GetTournamentById = GetTournamentById;


exports.test = test;