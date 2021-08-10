var fs = require("fs");
var parse = require("csv-parse");
// List of all the teams as Team class
const teams_list = [];
// List of all the tournament as Tournament class
const tournament_list = [];
// List of all the matches as match class
const matches_data = [];
// List of all the played matches extra data as Match_Played class
const played_matches = readCSV("routes\\utils\\result_played.csv", "played");
// List of all the upcoming matches extra data as Match_Upcoming class
const upcoming_matches = readCSV("routes\\utils\\result_upcoming.csv","upcoming");

///// Help functions ////
function readCSV(path, status) {
  var specific_data = [];
  fs.createReadStream(path)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      if (status == "played") {
        var index = specific_data.length;
        home_team = team_index(row[0]);
        away_team = team_index(row[2]);
        tournament = tournament_index(row[4]);
        matches_data.push(
          new Match(home_team, away_team, tournament, row[5], status, index)
        );
        specific_data.push(new Match_Played(row[1], row[3]));
      } else if (status == "upcoming") {
        var index = specific_data.length;
        home_team = team_index(row[0]);
        away_team = team_index(row[1]);
        tournament = tournament_index(row[2]);
        matches_data.push(
          new Match(home_team, away_team, tournament, row[3], status, index)
        );
        specific_data.push(new Match_Upcoming(row[4]));
      }
    });
  return specific_data;
}

function team_index(team_name) {
  var team = teams_list.filter((element) => element.team_name === team_name);
  if (team === null || team.length === 0) {
    team = new Team(teams_list.length, team_name);
    teams_list.push(team);
    return team;
  }
  return team[0];
}

function tournament_index(tournament_name) {
  var tournament = tournament_list.filter(
    (element) => element.tournament_name === tournament_name
  );
  if (tournament === null || tournament.length === 0) {
    tournament = new Tournament(tournament_list.length, tournament_name);
    tournament_list.push(tournament);
    return tournament;
  }
  return tournament[0];
}

//// Format for return data ////
function matches_full_data(filtered_matches, played, upcoming) {
  var result = [];
  //var filtered_matches = matches;
  filtered_matches.forEach(function (item, index) {
    if (item.status === "played" && played) {
      var row = played_match_json(item);
      result.push(row);
    } else if (item.status === "upcoming" && upcoming) {
      var row = upcoming_match_json(item);
      result.push(row);
    }
  });
  return result;
}

function played_match_json(item) {
  var home_score = played_matches[item.index].home_score;
  var away_score = played_matches[item.index].away_score;
  var row = {
    home_team: item.home_team,
    home_score: home_score,
    away_team: item.away_team,
    away_score: away_score,
    tournament: item.tournament,
    start_time: item.start_time,
    status: item.status,
  };
  return row;
}

function upcoming_match_json(item) {
  var kickoff = upcoming_matches[item.index].kickoff;
  var row = {
    home_team: item.home_team,
    away_team: item.away_team,
    tournament: item.tournament,
    start_time: item.start_time,
    kickoff: kickoff,
    status: item.status,
  };
  return row;
}

//// Main functions ////

function GetMatchesByTeam(team_name) {
  var filtered_matches = matches_data.filter(
    (element) =>
      element.home_team.team_name === team_name ||
      element.away_team.team_name === team_name
  );
  var result = matches_full_data(filtered_matches, true, true);
  return result;
}

function GetMatchesByTeamAndStatus(team_name, status) {
  var filtered_matches = matches_data.filter(
    (element) =>
      element.home_team.team_name === team_name ||
      element.away_team.team_name === team_name
  );
  if (status === "played") {
    var full_data_played = matches_full_data(filtered_matches, true, false);
    return full_data_played;
  } else if (status === "upcoming") {
    var full_data_upcoming = matches_full_data(filtered_matches, false, true);
    return full_data_upcoming;
  }
}

function GetMatchesByTournament(tournament) {
  var filtered_matches = matches_data.filter(
    (element) => element.tournament.tournament_name === tournament
  );
  var result = matches_full_data(filtered_matches, true, true);
  return result;
}

function GetMatchesByTournamentAndStatus(tournament, status) {
  var filtered_matches = matches_data.filter(
    (element) => element.tournament.tournament_name === tournament
  );
  if (status === "played") {
    var full_data_played = matches_full_data(filtered_matches, true, false);
    return full_data_played;
  } else if (status === "upcoming") {
    var full_data_upcoming = matches_full_data(filtered_matches, false, true);
    return full_data_upcoming;
  }
}

// DB classes
class Team {
  constructor(team_id, team_name) {
    this.team_id = team_id;
    this.team_name = team_name;
  }
}

class Tournament {
  constructor(tournament_id, tournament_name) {
    this.tournament_id = tournament_id;
    this.tournament_name = tournament_name;
  }
}

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
