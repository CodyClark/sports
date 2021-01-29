# Raspberry Pi Sports LED Matrix
Go-based software to control a raspberry pi LED matrix.

This is a Go project for displaying various types of "Boards" on a Raspberry Pi controlled RGB Matrix. The ideas here were heavily inspired by https://github.com/riffnshred/nhl-led-scoreboard . I chose to create my own project based off of those existing ideas because I wanted to be able to easily extend support for additional sports (see Roadmap section). I chose to write this in Go because I prefer it over Python, and theoretically it will run more efficiently than a Python-based one.

## Current Board Types

- NHL: Displays the day's games. Either live scores (favorite teams' scores are hideable for those who watch games recorded), Upcoming games, or final scores.
- Image Board: Takes a list of directories containg images and displays them. Works with GIF's too!

## Roadmap

### More Sports
My goal is to add new boards for all the major sports that I'm personally interested in. For now, that list includes (order of priority) MLB, College Football, NFL, and possibly something for PGA Tour (maybe in time for the Masters?).

### Web API for on-the-fly config changes
I ultimately would like to integrate a web API that allows certain things to be modified on the fly- this would ideally mean a simple web UI for tweaking things without having to access the Pi and restart the service.

## Installation
My goal is to soon provide an easy installer script...

The manual steps:
- Clone this repository onto your Pi
- Run `script/build.local`. This will result in a binary named "sportsmatrix.bin" inside the cloned repo directory.

## Configuration
You can run the app without passing any configuration, it will just use some sane defaults. Currently it only defaults to showing the NHL board. Each board that is enabled will be rotated through.

Example:
```
---
# Image Board. It rotates between all the images in the given directories
imageConfig:
  enabled: true # Enable the board
  useDiskCache: true # Will cache resized images to disk (somewhere in /tmp)
  boardDelay: 5s # Delay time between each image
  directories:
  - /tmp/images
  
# NHL Board
nhlConfig:
  enabled: true # Enable the board
  hideFavoriteScore: true # Hides the score of a live game that your favorite teams are playing in
  boardDelay: "20s" # Delay time between each game board
  favoriteSticky: true # If this is true, the board will stick to games that your favorite team is playing in. Prioritizes based on ordering
  favoriteTeams: # The list of your favorite teams
  - NYI
  watchTeams: # The list of teams to show games for. Leaving this out or setting to ALL will show all teams in the league
  - ALL
  
# Primary configuration for the matrix  
sportsMatrixConfig:
  screenOffTimes: # Cron values for when the screen should be turned off
  - "38 0 * * *"
  screenOnTimes: # Cron values for when the screen should be turned on
  - "39 0 * * *"
  hardwareConfig: # Hardware config based straight through to the https://github.com/hzeller/rpi-rgb-led-matrix library
    brightness: 60
    hardwareMapping: adafruit-hat-pwm
    showRefreshRate: false
    ```

## Running the Board
The app currently only runs in the foreground, there's no builtin daemonizing mechanism. Maybe one day I'll provide systemd (or whatever Raspbian uses) configs. For now, I suggest either running the app in a screen session or manually backgrounding the process. 

NOTE: You *MUST* run the app via sudo. The underlying C library requires it. It does switch to a less-privileged user after the matrix is initialized.
```
# Run with defaults
sudo ./sportsmatrix.bin run

# With config file
sudo ./sportsmatrix.bin run -c myconfig.conf

# NHL demo mode
sudo ./sportsmatrix.bin nhltest
```
