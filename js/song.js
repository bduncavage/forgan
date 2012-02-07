function Song(audioContext, measureCount, tempo) {
  this.audioContext = audioContext;
  this.tempo = tempo;
  this.measures = [];

  for (var i = 0; i < measureCount; i++) {
    this.measures[i] = new Measure(this.audioContext, tempo);
  }
}

Song.prototype.playOn = function(time) {
  var startTime = time + this.audioContext.currentTime;
  var cumulativeTime = 0;

  for (var i = 0; i < this.measures.length; i++) {
    if(i == 0) {
      cumulativeTime = startTime + this.measures[i].totalDuration;
      this.measures[i].playOn(startTime);
      this.measures[i].playOff(cumulativeTime);
    } else {
      var prevMeasure = this.measures[i - 1];
      var measureOnTime = cumulativeTime + prevMeasure.totalDuration;
      this.measures[i].playOn(measureOnTime);
      this.measures[i].playOff(measureOnTime + this.measures[i].totalDuration);
    }
  }
}

Song.prototype.playOff = function(time) {
  var stopTime = this.audioContext.currentTime + time;

  for(var i = 0; i < this.measures.length; i++) {
    measure[i].playOff(stopTime);
  }
}

