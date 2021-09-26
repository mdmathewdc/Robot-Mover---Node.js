// console.log("Testing");

const readFromConsole = require('readline');

var robot = { "x": 0, "y": 0, "f": "north", "placed": false }
var directions = ["north", "east", "south", "west"]

const readFromLine = readFromConsole.createInterface({
  input: process.stdin,
  output: process.stdout
});

readFromLine.on('line', (input) => {
  var cmd = input.toLowerCase()   //Convert the command to lowercase
  this.commandHandler(cmd)
});

module.exports.commandHandler = (command) => {
  var regex = command.match(/^place [0-4],[0-4],(?:north|south|east|west)$/)    //Check if PLACE is entered
  var cmd = command

  if (regex != null) {
    cmd = "placedRobot"
  }

  if (robot.placed || cmd == 'placedRobot') {
    switch (cmd) {
      case 'placedRobot':
        place(command)
        break
      case 'move':
        move()
        break
      case 'left':
        left()
        break
      case 'right':
        right()
        break
      case 'report':
        reportThePosition()
        break
      default:
        var msg = "Wrong command..."
        console.log(msg)
        return msg
    }
  } else {
    var msg = "Please place the robot first in a position..."
    console.log(msg)
    return msg
  }
}

function place(command) {
  var location = (command.split(' ')[1]).split(',')
  robot.x = parseInt(location[0])
  robot.y = parseInt(location[1])
  robot.f = location[2]
  robot.placed = true
}

function reportThePositionort() {
  console.log(robot.x + ','+robot.y+","+robot.f.toUpperCase())
}

function move() {
  var change = true
  switch (robot.f) {
    case 'north':
      if (robot.y < 4) {
        robot.y++
        change = false
      }
      break;
    case 'east':
      if (robot.x < 4) {
        robot.x++
        change = false
      }
      break;
    case 'south':
      if (robot.y > 0) {
        robot.y--
        change = false
      }
      break;
    case 'west':
      if (robot.x > 0) {
        robot.x--
        change = false
      }
      break;
  }
  if (change)
    console.log("Cannot move robot....")
}

function right() {
  if (directions.indexOf(robot.f) == directions.length - 1) {
    robot.f = directions[0]
  } else {
    robot.f = directions[directions.indexOf(robot.f) + 1]
  }
}

function left() {
  if (directions.indexOf(robot.f) == 0) {
    robot.f = directions[directions.length - 1]
  } else {
    robot.f = directions[directions.indexOf(robot.f) - 1]
  }
}

