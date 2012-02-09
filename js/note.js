var NoteDurationModifiers = [1, 2, 4, 8, 16];
var NoteDurations = [0.0625, 0.125, 0.25, 0.5, 1];

function Note(audioContext, shortestNoteDuration, initialNote) {
  if(initialNote == null) {
    var durIndex = this.getRandomInt(0, NoteDurations.length - 1);
    this.durationModifier = NoteDurationModifiers[durIndex];
    this.duration = NoteDurations[durIndex];
  } else {
    this.duration = initialNote.duration;
    // this is stupid, need a better way
    for(var i = 0; i < NoteDurations; i++) {
      if(this.duration == NoteDurations[i]) {
        this.durationModifier = NoteDurationModifiers[i];
        break;
      }
    }
  }

  this.initialize(audioContext, shortestNoteDuration);

  if(initialNote == null) {
    this.generateRandomNote();
  } else {
    var noteTable = new NoteTable();
    this.freq = noteTable.frequencyForNote(initialNote.noteName);
    this.fillBufferWithFrequency(this.freq);
  }
}

Note.prototype.initialize = function(audioContext, shortestNoteDuration) {
  this.audioContext = audioContext;
  this.sampleRate = audioContext.sampleRate;
  this.shortestNoteDuration = shortestNoteDuration;
  var numFrames = this.sampleRate * (shortestNoteDuration * this.durationModifier);
  this.buffer = this.audioContext.createBuffer(1, numFrames, this.sampleRate); 
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
  this.fillBufferWithFrequency(this.freq);
}

Note.prototype.fillBufferWithFrequency = function(freq) {
  // fill the buffer
  var buf = this.buffer.getChannelData(0);
  for (var i = 0; i < buf.length; i++) {
    buf[i] = Math.sin(freq * (2 * Math.PI) * i / this.sampleRate);
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
