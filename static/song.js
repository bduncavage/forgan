function Song(audioContext, duration, tempo, notes) {
  this.audioContext = audioContext;
  this.tempo = tempo;
  this.measures = [];

  var timeSignature = 4; // TODO: support non-4/4 time?
  var measureCount = ((tempo / 60) * duration) / timeSignature;

  // if notes are provided, just shove them all into a measure
  if(notes != null) {
    var measure = (new Measure(audioContext, tempo, false));
    for(var i = 0; i < notes.length; i++) {
      measure.addNote(notes[i]);
    };
    this.measures[0] = measure; 
  } else {
    for (var i = 0; i < measureCount; i++) {
      this.measures[i] = new Measure(this.audioContext, tempo);
    }
  }
}

Song.prototype.playOn = function(time) {
  var startTime = time + this.audioContext.currentTime;
  var cumulativeTime = 0;

  for (var i = 0; i < this.measures.length; i++) {
    if(i == 0) {
      cumulativeTime = startTime + this.measures[i].getTotalDuration();
      console.log('Playing measure['+i+'] on time: '+startTime);
      this.measures[i].playOn(startTime);
      this.measures[i].playOff(cumulativeTime);
    } else {
      console.log('Playing measure['+i+'] on time: '+cumulativeTime);
      this.measures[i].playOn(cumulativeTime);
      this.measures[i].playOff(cumulativeTime + this.measures[i].getTotalDuration());
      cumulativeTime += this.measures[i].getTotalDuration();
    }
  }
}

Song.prototype.playOff = function(time) {
  var stopTime = this.audioContext.currentTime + time;

  for(var i = 0; i < this.measures.length; i++) {
    this.measures[i].playOff(stopTime);
  }
}

Song.prototype.stop = function () {
  // stop NOW, no noteOff bullcrap
  // basically tell everything to pull
  // the plug from the hardware destination
  for(var i = 0; i < this.measures.length; i++) {
    this.measures[i].stop();
  }
}
