# Football_Game_Service
Use to get the fixtures (upcoming matches) and the results of football matches.

## To run the project follow the next steps:
- run git clone https://github.com/inbartz/Football_Game_Service.git
- add to the main directory file named .env with the environment variables: COOKIE_SECRET(required) and PORT(default value is 5000).
  for example:
  
      COOKIE_SECRET=12345
      PORT=4000   
- run npm start 


## The service has the following features:

- Get list of matches by team, use: http://localhost:PORT/matches/team?team_name=TEAM_NAME
  
  for example: http://localhost:5000/matches/team?team_name=Liverpool
- Get list of matches by team filtered by status, use: http://localhost:PORT/matches/status?status=STATUS 

  for example: http://localhost:5000/matches/status?status=upcoming
- Get list of matches by tournament, use: http://localhost:PORT/matches/tournament?tournament=TOURNAMENT

  for example: http://localhost:5000/matches/tournament?tournament=fa
- Get list of matches by tournament filtered by status, use: http://localhost:PORT/matches/tournament?tournament=TOURNAMENT&status=STATUS
 
  for example: http://localhost:5000/matches/tournament?tournament=fa&status=played








