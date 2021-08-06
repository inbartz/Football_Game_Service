-- Create teams table
CREATE TABLE [dbo].[teams](
	[teams_id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
	[teams_name] [varchar](300) NOT NULL,
	PRIMARY KEY (teams_id),
)

-- Create played matches
-- CREATE TABLE [dbo].[played](
-- 	[played_id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
-- 	[home_team] [varchar](300) NOT NULL,
--     [home_score][int] NOT NULL,
--     [away_team] [varchar](300) NOT NULL,
--     [popularity][int] NOT NULL,
-- 	PRIMARY KEY (teams_id),
-- )