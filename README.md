# Football_Game_Service
Use to get the fixtures (upcoming matches) and the results of football matches.

## To run the project follow the next steps:
- run: git clone https://github.com/inbartz/Football_Game_Service.git
- run: cd Football_Game_Service
- add: to the main directory file named .env with the environment variables: COOKIE_SECRET(required) and PORT(default value is 5000).
  for example:
  
      COOKIE_SECRET=12345
      PORT=4000   
- run: npm start 


## The service has the following features:

- Get list of matches by team.
  
  For example: http://localhost:5000/matches/team?team_name=Liverpool
- Get list of matches by team filtered by status.

  For example: http://localhost:5000/matches/status?team_name=Liverpool&status=played
- Get list of matches by tournament.

  For example: http://localhost:5000/matches/tournament?tournament=fa
- Get list of matches by tournament filtered by status.
 
  For example: http://localhost:5000/matches/tournament?tournament=fa&status=played

