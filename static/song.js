function Song(audioContext, duration, tempo) {
  this.audioContext = audioContext;
  this.tempo = tempo;
  this.measures = [];

  var timeSignature = 4; // TODO: support non-4/4 time?
  var measureCount = ((tempo / 60) * duration) / timeSignature;

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
      console.log('Playing measure['+i+'] on time: '+startTime);
      this.measures[i].playOn(startTime);
      this.measures[i].playOff(cumulativeTime);
    } else {
      console.log('Playing measure['+i+'] on time: '+cumulativeTime);
      this.measures[i].playOn(cumulativeTime);
      this.measures[i].playOff(cumulativeTime + this.measures[i].totalDuration);
      cumulativeTime += this.measures[i].totalDuration;
    }
  }
}

Song.prototype.playOff = function(time) {
  var stopTime = this.audioContext.currentTime + time;

  for(var i = 0; i < this.measures.length; i++) {
    measure[i].playOff(stopTime);
  }
}

