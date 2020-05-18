var data;
var circles = [];
var tests = [];
var retHome;
var testOn;

class Circl {
  constructor(x, y, radius, movie, bech, rd, ko, vill, land, kd, waithe, white, imdb) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.bech = bech;
    this.rd = rd;
    this.ko = ko;
    this.vill = vill;
    this.land = land;
    this.kd = kd;
    this.waithe = waithe;
    this.white = white;
    this.radius = radius;
    this.diameter = radius * 2;
    this.movie = movie;
    this.chosen = false;
    this.color = [237 + random(30), 158 + random(25), 203 + random(20)];
    this.on = false;
    this.imdb=imdb;
    this.titleOn=false;
  }
  mouseOn(mX, mY) {
    var d = dist(mX, mY, this.x, this.y);
    this.on = d < this.radius;
  }
  fP (test){
  if(test==0){
    return "PASSES"; 
  } else {
    return "FAILS";
  }
  
}
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    //frameRate(20);
    if (this.on) {
      fill(255);
      strokeWeight(2);
      stroke(this.color);
      rect(this.x - (this.movie.length * 10 / 2), this.y - 52, this.movie.length * 10, 25);
      fill(this.color[0] - 60, this.color[1] - 60, this.color[2] - 60);
      textAlign(CENTER, BOTTOM);
      noStroke();
      textSize(16);
      text(this.movie, this.x, this.y - 30);
    }
  }
}

class Bechdel {
  constructor(test, rules, X, Y, lines) {
    this.test = test;
    this.rules = rules;
    this.x = X;
    this.y = Y;
    this.width = test.length * 10;
    this.height = 30;
    this.centerX = this.x + (this.width / 2);
    this.centerY = 20 + this.y;
    this.onSq = false;
    this.chosen = false;
    this.lines = lines;
  }
  mouseOnSq(mX, mY) {
    var dX = Math.abs(mX - this.centerX);
    var dY = Math.abs(mY - this.centerY);
    this.onSq = (this.width / 2 > dX) && (this.height / 2 > dY);
  }

  show() {
    fill(255);
    strokeWeight(2);
    stroke(0);
    rect(this.x, this.y, this.width, this.height);
    fill(30);
    noStroke();
    textSize(16);
    textAlign(CENTER, BASELINE);
    text(this.test, this.centerX, this.centerY);
    if (this.onSq && this.test != " HOME ") {
      fill(255);
      strokeWeight(2);
      stroke(0);
      rect(80, 195, 440, this.lines * 35);
      fill(0);
      noStroke();
      textSize(24);
      textAlign(LEFT, TOP);
      text(this.rules, 100, 205);
    }
  }
}

function preload() {
  data = loadJSON("bechdel.json");

}

function setup() {
  createCanvas(600, 600);
  var movies = data.bec;
  for (var i = 0; i < movies.length; i++) {
    circles.push(new Circl(100, 100, 25, movies[i].movie, movies[i].bechdel, movies[i].rees_davies, movies[i].ko, movies[i].villarobos, movies[i].landau, movies[i].koeze_dottle, movies[i].waithe, movies[i].white, movies[i].idmb));
  }
  var bechd = new Bechdel("Bechdel", "Movie passes if:\n-There are two named female \n  characters\n-Female characters have at least \n  one conversation not about a man", 25, 50, 5);
  var rD = new Bechdel("Rees Davies", "Movie passes if: \n-Every department has two or more \n  women", 175, 50, 3);
  var ko = new Bechdel(" Ko ", "Movie passes if:\n-There’s a non-white, female-identifying \n  person in the film\n-She speaks in five or more scenes\n-She speaks English", 375, 50, 5);
  var villa = new Bechdel("Villalobos", "Movie passes if:\n-The film has a Latina lead\n-The lead or another Latina\n  character is shown as professional or\n  college educated,\n-She speaks in unaccented English,\n-She is not sexualized", 475, 50, 8);
  var land = new Bechdel("Landau", "Movie fails if: \n-A primary female character ends up \n  dead\n-A primary female character ends up\n  pregnant\n-A primary female character causes\n  a plot problem for a male protagonist", 25, 525, 7);
  var k_D = new Bechdel("Koeze-Dottel", "Movie passes if:\n-The supporting cast is 50 percent\n  women", 175, 525, 3);
  var waithe = new Bechdel("Waithe", "Movie passes if:\n-There’s a black woman in the work\n-She’s in a position of power\n-She’s in a healthy relationship", 375, 525, 4);
  var white = new Bechdel("White", "Movie passes if:\n-Half of the department heads are\n  women\n-Half the members of each department\n  are women\n-Half the crew members are\n  women", 500, 525, 7);
  tests = [waithe, white, k_D, land, villa, ko, rD, bechd];
  retHome = new Bechdel(" HOME ", "", 10, 10);
  testOn = false;
}

function home() {
  //homescreen
  var count = 0;
  //prints intial rectangle
  for (var row = 0; row < 7; row++) {
    if (row == 1 || row == 5) {
      for (var col = 0; col < 7; col++) {
        circles[count].x = 135 + (55 * col)
        circles[count].y = 130 + (55 * row);
        circles[count].show();
        circles[count].mouseOn(mouseX, mouseY);
        count++;
      }
    } else if (row >= 2 && row <= 4) {
      for (var col2 = 0; col2 < 8; col2++) {
        circles[count].x = 110 + (55 * col2)
        circles[count].y = 130 + (55 * row);
        circles[count].show();
        circles[count].mouseOn(mouseX, mouseY);
        count++;
      }
    } else {
      for (var col2 = 0; col2 < 6; col2++) {
        circles[count].x = 160 + (55 * col2)
        circles[count].y = 130 + (55 * row);
        circles[count].show();
        circles[count].mouseOn(mouseX, mouseY);
        count++;
      }
    }
  } //end of for loop

  for (var k = 0; k < tests.length; k++) {
    tests[k].show();
    tests[k].mouseOnSq(mouseX, mouseY);
  }
}

function bech() {
  var passed1 = 0;
  var failed1 = 0;
  textSize(120);
  textAlign(CENTER, TOP);
  text("PASSED", 300, 100);
  text("FAILED", 300, 400);
  //change x, y values
  for (var j = 0; j < circles.length; j++) {
    if (0 == circles[j].bech) {
      circles[j].y = 75 + 50 * Math.floor(passed1 / 9);
      circles[j].x = 85 + (55 * (passed1 % 9));
      passed1++;
    } else {
      circles[j].y = 400 + 50 * Math.floor(failed1 / 9);
      circles[j].x = 85 + (55 * (failed1 % 9));
      failed1++;
    }
    circles[j].show();
    circles[j].mouseOn(mouseX, mouseY);
  }
  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1, 450, 225);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1, 450, 510);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1 / 50 * 100 + "%", 50, 225);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1 / 50 * 100 + "%", 50, 510);
}

function rd() {
  var passed1 = 0;
  var failed1 = 0;
  textSize(120);
  textAlign(CENTER, TOP);
  text("PASSED", 300, 100);
  text("FAILED", 300, 400);
  //change x, y values
  for (var j = 0; j < circles.length; j++) {
    if (0 == circles[j].rd) {
      circles[j].y = 100 + 50 * Math.floor(passed1 / 9);
      circles[j].x = 85 + (55 * (passed1 % 9));
      passed1++;
    } else {
      circles[j].y = 400 + 50 * Math.floor(failed1 / 9);
      circles[j].x = 85 + (55 * (failed1 % 9));
      failed1++;
    }
    circles[j].show();
    circles[j].mouseOn(mouseX, mouseY);
  }
  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1, 450, 225);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1, 450, 510);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1 / 50 * 100 + "%", 50, 225);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1 / 50 * 100 + "%", 50, 510);
}

function ko() {
  var passed1 = 0;
  var failed1 = 0;
  textSize(120);
  textAlign(CENTER, TOP);
  text("PASSED", 300, 100);
  text("FAILED", 300, 400);
  //change x, y values
  for (var j = 0; j < circles.length; j++) {
    if (0 == circles[j].ko) {
      circles[j].y = 100 + 50 * Math.floor(passed1 / 9);
      circles[j].x = 85 + (55 * (passed1 % 9));
      passed1++;
    } else {
      circles[j].y = 400 + 50 * Math.floor(failed1 / 9);
      circles[j].x = 85 + (55 * (failed1 % 9));
      failed1++;
    }
    circles[j].show();
    circles[j].mouseOn(mouseX, mouseY);
  }
  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1, 450, 225);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1, 450, 510);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1 / 50 * 100 + "%", 50, 225);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(Math.round(failed1 / 50 * 100) + "%", 50, 510);
}

function vill() {
  var passed1 = 0;
  var failed1 = 0;
  textSize(120);
  textAlign(CENTER, TOP);
  text("PASSED", 300, 75);
  text("FAILED", 300, 350);
  //change x, y values
  for (var j = 0; j < circles.length; j++) {
    if (0 == circles[j].vill) {
      circles[j].y = 100 + 50 * Math.floor(passed1 / 9);
      circles[j].x = 85 + (55 * (passed1 % 9));
      passed1++;
    } else {
      circles[j].y = 305 + 50 * Math.floor(failed1 / 9);
      circles[j].x = 85 + (55 * (failed1 % 9));
      failed1++;
    }
    circles[j].show();
    circles[j].mouseOn(mouseX, mouseY);
  }
  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1, 450, 175);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1, 450, 515);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1 / 50 * 100 + "%", 50, 175);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1 / 50 * 100 + "%", 50, 515);
}

function land() {
  var passed1 = 0;
  var failed1 = 0;
  textSize(120);
  textAlign(CENTER, TOP);
  text("PASSED", 300, 100);
  text("FAILED", 300, 400);
  //change x, y values
  for (var j = 0; j < circles.length; j++) {
    if (0 == circles[j].land) {
      circles[j].y = 100 + 50 * Math.floor(passed1 / 9);
      circles[j].x = 85 + (55 * (passed1 % 9));
      passed1++;
    } else {
      circles[j].y = 400 + 50 * Math.floor(failed1 / 9);
      circles[j].x = 85 + (55 * (failed1 % 9));
      failed1++;
    }
    circles[j].show();
    circles[j].mouseOn(mouseX, mouseY);
  }
  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1, 450, 225);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1, 450, 510);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1 / 50 * 100 + "%", 50, 225);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1 / 50 * 100 + "%", 50, 510);
}

function kd() {
  var passed1 = 0;
  var failed1 = 0;
  textSize(120);
  textAlign(CENTER, TOP);
  text("PASSED", 300, 100);
  text("FAILED", 300, 400);
  //change x, y values
  for (var j = 0; j < circles.length; j++) {
    if (0 == circles[j].kd) {
      circles[j].y = 100 + 50 * Math.floor(passed1 / 9);
      circles[j].x = 85 + (55 * (passed1 % 9));
      passed1++;
    } else {
      circles[j].y = 375 + 50 * Math.floor(failed1 / 9);
      circles[j].x = 85 + (55 * (failed1 % 9));
      failed1++;
    }
    circles[j].show();
    circles[j].mouseOn(mouseX, mouseY);
  }
  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1, 450, 225);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1, 450, 510);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1 / 50 * 100 + "%", 50, 225);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1 / 50 * 100 + "%", 50, 510);
}

function white() {
  var passed1 = 0;
  var failed1 = 0;
  textSize(120);
  textAlign(CENTER, TOP);
  text("PASSED", 300, 75);
  text("FAILED", 300, 375);
  //change x, y values
  for (var j = 0; j < circles.length; j++) {
    if (0 == circles[j].white) {
      circles[j].y = 100 + 50 * Math.floor(passed1 / 9);
      circles[j].x = 85 + (55 * (passed1 % 9));
      passed1++;
    } else {
      circles[j].y = 305 + 50 * Math.floor(failed1 / 9);
      circles[j].x = 85 + (55 * (failed1 % 9));
      failed1++;
    }
    circles[j].show();
    circles[j].mouseOn(mouseX, mouseY);
  }
  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1, 450, 175);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1, 450, 515);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1 / 50 * 100 + "%", 50, 175);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1 / 50 * 100 + "%", 50, 515);
}

function waithe() {
  var passed1 = 0;
  var failed1 = 0;
  textSize(120);
  textAlign(CENTER, TOP);
  text("PASSED", 300, 100);
  text("FAILED", 300, 375);
  //change x, y values
  for (var j = 0; j < circles.length; j++) {
    if (0 == circles[j].waithe) {
      circles[j].y = 100 + 50 * Math.floor(passed1 / 9);
      circles[j].x = 85 + (55 * (passed1 % 9));
      passed1++;
    } else {
      circles[j].y = 315 + 50 * Math.floor(failed1 / 9);
      circles[j].x = 85 + (55 * (failed1 % 9));
      failed1++;
    }
    circles[j].show();
    circles[j].mouseOn(mouseX, mouseY);
  }
  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1, 450, 200);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1, 450, 510);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(passed1 / 50 * 100 + "%", 50, 200);

  fill(0);
  textSize(72);
  textAlign(LEFT, TOP);
  text(failed1 / 50 * 100 + "%", 50, 510);
}

function showStats(circ) {
  //circle
  fill(circ.color);
  ellipse(300, 300, 500);
  
  //rectangle
  fill(255);
  strokeWeight(3);
  stroke(circ.color[0] - 30, circ.color[1] - 30, circ.color[2] - 30);
  //prevents rectangles/text getting cut off by window
  if (circ.movie.length > 30) {
    rect(300 - circ.movie.length * 12 / 2, 80, circ.movie.length * 12, 50);
  fill(circ.color[0] - 60, circ.color[1] - 60, circ.color[2] - 60);
  //Movie title format
  textAlign(CENTER, CENTER);
  noStroke();
  textSize(24);
  } else {
    rect(300 - circ.movie.length * 20 / 2, 80, circ.movie.length * 20, 50);
  //movie title format
  fill(circ.color[0] - 60, circ.color[1] - 60, circ.color[2] - 60);
  textAlign(CENTER, CENTER);
  noStroke();
  textSize(36);
  }
  text(circ.movie, 300, 105);
  
  //If movie Test failed or passed
  // bech, rd, ko, vill, land, kd, waithe, white
  textAlign(LEFT);
  
  textSize(36);
  fill(255);
   text("-Ko: " + circ.fP(circ.ko), 140,160);
   text("-Landau: " + circ.fP(circ.land), 140,200);
  text("-Bechdel: " + circ.fP(circ.bech), 140,240);
  text("-Villalobos: " + circ.fP(circ.vill), 140,280);
   text("-Rees Davies: " + circ.fP(circ.rd), 140,320);
  text("-Koeze-Dottel: " + circ.fP(circ.kd), 140,360);
   text("-Waithe: " + circ.fP(circ.waithe), 140,400);
  text("-White: " + circ.fP(circ.white), 140,440);
  
  

}


function draw() {
  background(255);
  //creates mouse tracker
  /*textSize(16);
  fill(0);
  textAlign(CENTER, CENTER);
  text("X: " + mouseX + "  Y: " + mouseY, 500, 30);*/
  if (testOn == false) {
    home();
  }
  for (var i = 0; i < circles.length; i++) {
    if (circles[i].chosen) {
      showStats(circles[i]);
      retHome.show();
      retHome.mouseOnSq(mouseX, mouseY);
      if(circles[i].titleOn){
        //functionclick
      }
    }
  }
  if (tests[6].chosen) {
    rd();
    retHome.show();
    retHome.mouseOnSq(mouseX, mouseY);
  }
  if (tests[7].chosen) {
    bech();
    retHome.show();
    retHome.mouseOnSq(mouseX, mouseY);
  }
  if (tests[5].chosen) {
    ko();
    retHome.show();
    retHome.mouseOnSq(mouseX, mouseY);
  }
  if (tests[4].chosen) {
    vill();
    retHome.show();
    retHome.mouseOnSq(mouseX, mouseY);
  }
  if (tests[3].chosen) {
    land();
    retHome.show();
    retHome.mouseOnSq(mouseX, mouseY);
  }
  if (tests[2].chosen) {
    kd();
    retHome.show();
    retHome.mouseOnSq(mouseX, mouseY);
  }
  if (tests[1].chosen) {
    white();
    retHome.show();
    retHome.mouseOnSq(mouseX, mouseY);
  }
  if (tests[0].chosen) {
    waithe();
    retHome.show();
    retHome.mouseOnSq(mouseX, mouseY);
  }
}

function mousePressed() {
  //bechdel
  if (tests[7].onSq) {
    tests[7].chosen = true;
    testOn = true;
  }
  //rd
  if (tests[6].onSq) {
    tests[6].chosen = true;
    testOn = true;
  }
  //ko
  if (tests[5].onSq) {
    tests[5].chosen = true;
    testOn = true;
  }
  //villa
  if (tests[4].onSq) {
    tests[4].chosen = true;
    testOn = true;
  }
  //land
  if (tests[3].onSq) {
    tests[3].chosen = true;
    testOn = true;
  }
  //kd
  if (tests[2].onSq) {
    tests[2].chosen = true;
    testOn = true;
  }
  //white
  if (tests[1].onSq) {
    tests[1].chosen = true;
    testOn = true;
  }
  //waithe
  if (tests[0].onSq) {
    tests[0].chosen = true;
    testOn = true;
  }
  for (var i = 0; i < circles.length; i++) {
    if (circles[i].on) {
      circles[i].chosen = true;
      testOn = true;
      for (var m = 0; m < tests.length; m++) {
      tests[m].chosen = false;
    }
    }
  }
  if (retHome.onSq) {
    testOn = false;
    retHome.onSq = false;
    for (var m = 0; m < tests.length; m++) {
      tests[m].chosen = false;
    }
    for (var i = 0; i < circles.length; i++) {
      if (circles[i].chosen) {
        circles[i].chosen = false;
      }
    }
  }
  //working
  /*for (var i = 0; i < circles.length; i++) {
    if (circles[i].chosen) {
    circles[i].titleOn= true;
    }
  }*/
  


}