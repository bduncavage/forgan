var NoteDurationModifiers = [1, 2, 4, 8, 16];
var NoteDurations = [0.0625, 0.125, 0.25, 0.5, 1];

function Note(audioContext) {
  this.audioContext = audioContext;
  this.sampleRate = audioContext.sampleRate;
  
  var durIndex = this.getRandomInt(0, NoteDurations.length);
  this.durationModifier = NoteDurationModifiers[durIndex];
  this.duration = NoteDurations[durIndex];

  this.buffer = this.audioContext.createBuffer(1, 44100, this.sampleRate); 
  // fill the buffer with a sine wave of a random frequency
  this.generateRandomNote(); 
}

Note.prototype.generateRandomNote = function(min, max) {
  // are we a silent note (rest)?
  this.isRest = this.getRandomInt(0, 22) == 21 ? true: false;
  if(this.isRest == true) {
    return;
  }

  // are we stepping down or up from middle A?
  var downStep = this.getRandomInt(0, 2) == 0 ? true : false;
  var steps = this.getRandomInt(0, 8);
  // if we are up stepping, there are 5 more notes
  var extraUpSteps = this.getRandomInt(0, 6);

  var actualSteps = downStep ? steps * -1 : steps + extraUpSteps;

  this.freq = 440 * Math.pow(2, (actualSteps / 12));

  // now we've got our frequency
  // fill the buffer
  var buf = this.buffer.getChannelData(0);
  for (var i = 0; i < buf.length; i++) {
    buf[i] = Math.sin(this.freq * (2 * Math.PI) * i / this.sampleRate);
  }
}

Note.prototype.playOn = function(time) {
  if(this.isRest == true) {
    return;
  }

  this.currentBufferSource = this.audioContext.createBufferSource();

  var source = this.currentBufferSource;
  source.buffer = this.buffer;
  source.connect(this.audioContext.destination);
  source.noteOn(time);
}

Note.prototype.playOff = function (time) {
  if(this.currentBufferSource != null) {
    this.currentBufferSource.noteOff(time);
  }
}

Note.prototype.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
