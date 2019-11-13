import {PigDice} from './scripts.js';
import {NPC} from './scripts.js';
import {player} from './scripts.js';
export var isCpu;
export var dice;
export var npc;

$(document).ready(function(event){
  event.preventDefault();
  var dice = new PigDice("player");
  var npc = new NPC("");
  var name1 = "";
  var name2 = "";

  $("button#2player").click(function(){
    $("#twoPlayer").show();
    $("#gameMode").hide();
  });

  $("button#computer").click(function(){
    $("#difficulty").show();
    $("#gameMode").hide();
    var isCPU = true;
    if (isCPU) {
      console.log("fix this");
    }
  });

  $("#easy").click(function(){
    npc.difficulty = "easy";
    $("#onePlayer").show();
    $("#difficulty").hide();
  });

  $("#hard").click(function(){
    npc.difficulty = "hard";
    $("#onePlayer").show();
    $("#difficulty").hide();
  });

  $("#onePlayerName").click(function(){
    dice.name = $("#playerName").val();
    name1 = dice.name;
    name2 = "Computer";
    $("#scoreName1").html(name1);
    $("#scoreName2").html(name2);
    $("#resultsBlock").show();
    $("div#playButtons").show();
    $("#onePlayer").hide();
  });

  $("button#names").click(function(event){
    event.preventDefault();
    name1 = $("#playerOne").val();
    name2 = $("#playerTwo").val();
    $("#scoreName1").html(name1);
    $("#scoreName2").html(name2);
    $("div#playButtons").show();
    $("#resultsBlock").show();
    $("#twoPlayer").hide();
  });

  $("button#roll").click(function(event){
    event.preventDefault();
    if (player) {
      $("#currentPlayer").html(name1 + ": ");
    } else if (!player) {
      $("#currentPlayer").html(name2 + ": ");
    }
    $("#currentScore").html(dice.roll());
  });

  $("button#hold").click(function(event){
    event.preventDefault();
    console.log("held");

    if (player) {
      $("#currentPlayer").html(name2 + ": ");
      $("#playerOneResults").html(" " + dice.hold());
    } else if (!player) {
      $("#currentPlayer").html(name1 + ": ");
      $("#playerTwoResults").html(" " + dice.hold());
    }
  });

  $("button#reset").click(function(event){
    event.preventDefault();
    location.reload(true);
  });
});
