function Note(audioContext) {
  this.audioContext = audioContext;
  this.sampleRate = audioContext.sampleRate;

  this.buffer = this.audioContext.createBuffer(1, 4096, this.sampleRate); 
  // fill the buffer with a sine wave of a random frequency
  this.generateRandomNote(); 
}

Note.prototype.generateRandomNote = function(min, max) {
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
  var source = this.audioContext.createBufferSource();
  source.buffer = this.buffer;
  source.connect(this.audioContext.destination);
  source.noteOn(time);
}

Note.prototype.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
