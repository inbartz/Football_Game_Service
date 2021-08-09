var fs = require('fs');
var parse = require('csv-parse');
// List of all the teams as Team class
const teams_list = [];
// List of all the tournament as Tournament class
const tournament_list = [];
// List of all the matches as match class
const matches_data = [];
// List of all the played matches extra data as Match_Played class
const played_matches = readCSV("routes\\utils\\result_played.csv", 'played');
// List of all the upcoming matches extra data as Match_Upcoming class
const upcoming_matches = readCSV("routes\\utils\\result_upcoming.csv", 'upcoming');



///// Help functions ////
function readCSV(path, status){
    var specific_data = [];
    fs.createReadStream(path)
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', function (row) {
            if (status=='played'){
              var index = specific_data.length;
              matches_data.push(new Match(row[0], row[2], row[4], row[5],status, index))
              specific_data.push(new Match_Played(row[1], row[3]))
              push_team(row[0]);
              push_team(row[2]);
              push_tournament(row[4]);
            }
            else if (status=='upcoming'){
              var index = specific_data.length;
              matches_data.push(new Match(row[0], row[1], row[2], row[3],status, index))
              var id = matches_data.length -1;
              specific_data.push(new Match_Upcoming(id, row[4]))
              push_team(row[0]);
              push_team(row[1]);
              push_tournament(row[2]);
            }
        })
    return specific_data;
}

function push_team(team_name){
    if(!teams_list.includes(team_name)){
      teams_list.push(team_name);
    }
}

function push_tournament(tournament){
    if(!tournament_list.includes(tournament)){
      tournament_list.push(tournament);
    }
}


//// Format for return data ////
function matches_full_data(filtered_matches, played, upcoming){
  var result = [];
  //var filtered_matches = matches;
  filtered_matches.forEach(function (item, index){
    if(item.status==='played' && played){
      var row = played_match_json(item);
      result.push(row)
    }
    else if(item.status==='upcoming' && upcoming){
      var row = upcoming_match_json(item);
      result.push(row)
    }
  });
  return result;
}

function played_match_json(item){
  var home_score = played_matches[item.index].home_score;
    var away_score = played_matches[item.index].away_score;
    var row = {home_team: item.home_team, home_score: home_score, away_team: item.away_team, away_score: away_score, tournament: item.tournament, 
              start_time: item.start_time, status: item.status}
    return row;
}

function upcoming_match_json(item){
    var kickoff = upcoming_matches[item.index].kickoff;
    var row = {home_team: item.home_team, away_team: item.away_team, tournament: item.tournament, 
              start_time: item.start_time, kickoff: kickoff, status: item.status}
    return row;
}


//// Main functions ////
function GetTeamById(id){
  if(id => 0 && id < teams_list.length){
    return teams_list[id];
  }
  else{
    return "";
  }
  
};

function GetTournamentById(id){
  if(id => 0 && id < tournament_list.length){
    return tournament_list[id];
  }
  else{
    return "";
  }
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
class Match {
  constructor(home_team, away_team, tournament, start_time, status, index) {
      this.home_team = home_team;
      this.away_team = away_team;
      this.tournament = tournament;
      this.start_time = start_time;
      this.status = status;
      this.index = index;
  }
}

class Match_Played {
    constructor(home_score, away_score) {
        this.home_score = home_score;
        this.away_score = away_score; 
    }
}

class Match_Upcoming {
  constructor(kickoff) {
      this.kickoff = kickoff;
  }
}


exports.GetMatchesByTeam = GetMatchesByTeam;
exports.GetMatchesByTeamAndStatus = GetMatchesByTeamAndStatus;
exports.GetMatchesByTournament = GetMatchesByTournament;
exports.GetMatchesByTournamentAndStatus = GetMatchesByTournamentAndStatus;
exports.GetTeamById = GetTeamById;
exports.GetTournamentById = GetTournamentById;


function test(){
  
  return {teams: teams_list, tournament: tournament_list};
}


exports.test = test;