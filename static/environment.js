function RankedMeasure(measure) {
  this.measure = measure;
  this.rank = 0;
}

function Environment() {
  this.MAX_FITNESS_SEGMENTS = 8;
}

Environment.prototype.start = function(seedMeasures, fitnessData) {
  // choose random segements
  var fitnessSegments = [];
  var randStart = getRandomInt(0, fitnessData.segments.length - (this.MAX_FITNESS_SEGMENTS + 1));
  for(var i = 0; i < this.MAX_FITNESS_SEGMENTS; i++) {
    fitnessSegments[i] = fitnessData.segments[randStart + i];
  }

  var rankedMeasures = []
  for(var i = 0; i < seedMeasure.length; i++) {
    rankedMeasures[i] = new RankedMeasure(seedMeasure[i]);
  }
  
}

// ranks measures agains the fitness segments
// measures that fall below a threshold will be killed
// (removed from the list).
// returns a list of fit measures
Environment.prototype.rankAndKill(rankedMeasures, songKey, songModality, fitnessSegments) {
  var noteTable = new NoteTable();

  
}
