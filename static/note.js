var NoteDurationModifiers = [1, 2, 4, 8, 16];
var NoteDurations = [0.0625, 0.125, 0.25, 0.5, 1];

function Note(audioContext, shortestNoteDuration, noteData) {
  this.actualDuration = -1;
  if(noteData == null) {
    var durIndex = this.getRandomInt(0, NoteDurations.length - 1);
    this.durationModifier = NoteDurationModifiers[durIndex];
    this.duration = NoteDurations[durIndex];
  } else {
    this.duration = 0;
    this.actualDuration = noteData.duration;
  }

  this.initialize(audioContext, shortestNoteDuration);

  if(noteData == null) {
    this.generateRandomNote();
  } else {
    var noteTable = new NoteTable();
    var bufferIndex = 0;
    for(var i = 0; i < noteData.pitches.length; i++) {
      if(noteData.pitches[i] > 0.9 && bufferIndex == 0) {
        this.freq = noteTable.noteInChromaticScaleAtIndex(i).freq;
        this.buffers[bufferIndex] = this.audioContext.createBuffer(1, noteData.duration * this.sampleRate, this.sampleRate);
        this.fillBufferWithFrequency(bufferIndex, this.freq);
        bufferIndex++;
      }
    }
  }
}

Note.prototype.initialize = function(audioContext, shortestNoteDuration) {
  this.audioContext = audioContext;
  this.sampleRate = audioContext.sampleRate;
  this.shortestNoteDuration = shortestNoteDuration;
  var numFrames = 0;

  if(this.actualDuration == -1) {
    this.actualDuration = shortestNoteDuration * this.durationModifier;
  }
  numFrames = this.sampleRate * this.actualDuration;

  this.buffers = [];
}

Note.prototype.generateRandomNote = function(min, max) {
  var noteTable = new NoteTable();
  // are we a silent note (rest)?
  this.isRest = this.getRandomInt(0, noteTable.count - 1) == noteTable.count - 1 ? true: false;

  if(this.isRest == true) {
    return;
  }

  var randIndex = this.getRandomInt(0, noteTable.count - 1);
  this.freq = noteTable.frequencyAtIndex(randIndex);;
  // now we've got our frequency
  this.fillBufferWithFrequency(0, this.freq);
}

Note.prototype.fillBufferWithFrequency = function(index, freq) {
  // fill the buffer
  var buf = this.buffers[index].getChannelData(0);
  for (var i = 0; i < buf.length; i++) {
    buf[i] = Math.sin(freq * (2 * Math.PI) * i / this.sampleRate);
  }
}

Note.prototype.playOn = function(time) {
  if(this.isRest == true) {
    return;
  }

  this.currentBufferSource = this.audioContext.createBufferSource();

  for(var i = 0; i < this.buffers.length; i++) {
    var source = this.audioContext.createBufferSource();
    source.buffer = this.buffers[i];
    source.connect(this.audioContext.destination);
    source.noteOn(time);
  }
}

Note.prototype.playOff = function (time) {
  if(this.currentBufferSource != null) {
    this.currentBufferSource.noteOff(time);
  }
}

Note.prototype.getDuration = function() {
  if(this.actualDuration > 0) {
    return this.actualDuration;
  } else {
    return this.shortestNoteDuration * this.durationModifier;
  }
}

Note.prototype.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
