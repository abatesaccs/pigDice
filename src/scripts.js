import {isCPU, npc, dice} from './main.js';

export function PigDice(name){
  this.name = name;
}

export function NPC(diff){
  //easy = true, hard = false
  this.difficulty = diff;
}
export var player = true;
var tempScore = 0;
var playerOneScore = 0;
var playerTwoScore = 0;
var doubles = false;
var compScore = 0;
isCPU = false;


PigDice.prototype.rollDie = function(min, max) {
  return Math.random() * (max - min);
};

NPC.prototype.hardRoll = function(){
  //if turn score is < 20 then roll again
  //when turn score is >= 20 hold
  var cpuDieOne = 0;
  var cpuDieTwo = 0;
  var tempCompVal = 0;
  var notBusted = true;
  var doubles = false;
  while ((tempCompVal <= 20 && notBusted) || doubles) {
    console.log("inloop");
    cpuDieOne = Math.ceil(dice.rollDie(1,7));
    cpuDieTwo = Math.ceil(dice.rollDie(1,7));
    doubles = false;
    var cpuRollTotal = (cpuDieOne + cpuDieTwo);
    if (cpuDieOne === 1 && cpuDieTwo === 1) {
      compScore = 0;
      tempCompVal = 0;
      notBusted = false;
      $("#currentScore").append("Cpu rolled Snake Eyes.<br>");
      $("#playerTwoResults").html("0");
    } else if (cpuDieOne === 1 || cpuDieTwo === 1) {
      tempCompVal = 0;
      notBusted = false;
      $("#currentScore").append("Cpu rolled a one. " + cpuDieOne + ", " + cpuDieTwo + "<br>");
    } else if (cpuDieOne === cpuDieTwo) {
      tempCompVal += cpuRollTotal;
      doubles = true;
      $("#currentScore").append("Cpu rolled Doubles. " + cpuDieOne + ", " + cpuDieTwo + "<br>");
    } else {
      tempCompVal += cpuRollTotal;
      $("#currentScore").append("Cpu rolled " + cpuDieOne + ", " + cpuDieTwo + "<br>");
    }
  }
  if (tempCompVal > 20 && notBusted) {
    npc.npcHold(tempCompVal);
  }
};

NPC.prototype.npcRoll = function(diff) {
  var cpuRolls = 0;
  var cpuHadOne = false;
  $("#currentPlayer").html("Computer: ");

  if (diff === "easy") {
    var cpuDieOne = 0;
    var cpuDieTwo = 0;
    var tempCompVal = 0;
    setTimeout(function(){
      while (cpuRolls < 2) {
        cpuDieOne = Math.ceil(dice.rollDie(1,7));
        cpuDieTwo = Math.ceil(dice.rollDie(1,7));
        var cpuRollTotal = (cpuDieOne + cpuDieTwo);
        if (cpuDieOne === 1 && cpuDieTwo === 1) {
          cpuRolls += 2;
          compScore = 0;
          tempCompVal = 0;
          cpuHadOne = true;
          $("#currentScore").append("Cpu rolled Snake Eyes.<br>");
          $("#playerTwoResults").html("0");
        } else if (cpuDieOne === 1 || cpuDieTwo === 1) {
          cpuRolls += 2;
          tempCompVal = 0;
          cpuHadOne = true;
          $("#currentScore").append("Cpu rolled a one. " + cpuDieOne + ", " + cpuDieTwo + "<br>");
        } else if (cpuDieOne === cpuDieTwo) {
          tempCompVal += cpuRollTotal;
          $("#currentScore").append("Cpu rolled Doubles. " + cpuDieOne + ", " + cpuDieTwo + "<br>");
        } else {
          cpuRolls++;
          tempCompVal += cpuRollTotal;
          $("#currentScore").append("Cpu rolled " + cpuDieOne + ", " + cpuDieTwo + "<br>");
        }
      }
      if (!cpuHadOne) {
        npc.npcHold(tempCompVal);
      }
    }, 250);
  } else if (diff === "hard") {
    console.log("hard");
    npc.hardRoll();
  }
};

NPC.prototype.npcHold = function(turnVal){
  compScore += turnVal;
  player = true;
  if (compScore >= 100) {
    $(".results").html("<p>The Computer Wins!</p><br>");
    $("button#reset").show();
  }
  $("#playerTwoResults").html(" " + compScore);
};

PigDice.prototype.roll = function(){
  var dieOne = Math.ceil(dice.rollDie(1, 7));
  var dieTwo = Math.ceil(dice.rollDie(1, 7));
  $("#cpuResults").html("");
  if (doubles) {
    $("button#hold").prop("disabled", false);
    doubles = false;
  }
  if (dieOne === 1 && dieTwo === 1) {
    tempScore = 0;
    if (player) {
      playerOneScore = 0;
      $("#currentScore").html("");
      $("#playerOneResults").html(" 0");
    } else if (!player) {
      playerTwoScore = 0;
      $("#currentScore").html("");
      $("#playerTwoResults").html(" 0");
    }
    player = !player;
    $("#rolledResult").html("snake eyes and lost all your points!");
    if (isCPU) {
      player = true;
      npc.npcRoll(npc.difficulty);
    }
  } else if (dieOne === 1 || dieTwo === 1) {
    tempScore = 0;
    player = !player;
    $("#rolledResult").html("1!");
    $("#currentScore").html("");
    if (isCPU) {
      player = true;
      npc.npcRoll(npc.difficulty);
    }
  } else if (dieOne === dieTwo) {
    tempScore += (dieOne + dieTwo);
    $("currentScore").html();
    $("#rolledResult").html("doubles, " + dieOne + " and " + dieTwo + " Roll again!");
    $("button#hold").prop("disabled", true);
    doubles = true;
    return tempScore;
  } else {
    tempScore += (dieOne + dieTwo);
    $("#rolledResult").html((dieOne.toString()) + " and " + dieTwo.toString());
    return tempScore;
  }
  // return tempScore;
};

PigDice.prototype.hold = function(){
  if (player) {
    playerOneScore += tempScore;
    player = !player;
    tempScore = 0;
    $("#currentScore").html("");
    if (playerOneScore >= 100) {
      $(".results").html("<p>Player 1 Wins!</p><br>");
      $("button#reset").show();
    } else {
      if (isCPU) {
        player = true;
        npc.npcRoll(npc.difficulty);
      }
      return playerOneScore;
    }
  } else if (!player) {
    playerTwoScore += tempScore;
    player = !player;
    tempScore = 0;
    $("#currentScore").html("");
    if (playerTwoScore >= 100) {
      $(".results").html("<p>Player 2 Wins!</p><br>");
      $("button#reset").show();
    } else {
      return playerTwoScore;
    }
  }
};
