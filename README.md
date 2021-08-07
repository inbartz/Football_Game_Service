# Football_Game_Service
Use to get the fixtures (upcoming matches) and the results of football matches.

To run the project follow the next steps: 

1. run git clone https://github.com/inbartz/Football_Game_Service.git
2. add to the main directory file named .env with the environment variables: COOKIE_SECRET(required)
 and PORT(default value is 5000). 
   
   for example: 
      
      COOKIE_SECRET=12345
      
      PORT=4000
3. run npm start



The service has the following features:

1. Get list of matches by team

    use: http://localhost:*PORT*/matches/team?team_name=*team_name*
    
    for example: http://localhost:5000/matches/team?team_name=Liverpool
    
2. Get list of matches by team filtered by status.

    use: http://localhost:*PORT*/matches/status?status=*status*
    
    for example: http://localhost:5000/matches/status?status=upcoming
    
3. Get list of matches by tournament.

    use: http://localhost:*PORT*/matches/tournament?tournament=*tournament*
    
    for example: http://localhost:5000/matches/tournament?tournament=fa
    
4. Get list of matches by tournament filtered by status.

    use: http://localhost:*PORT*/matches/tournament?tournament=*tournament*&status=*status*
    
    for example: http://localhost:5000/matches/tournament?tournament=fa&status=played
    








