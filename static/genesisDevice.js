function GenesisDevice(audioContext) {
  this.audioContext = audioContext;
}

GenesisDevice.prototype.ignite = function(analysisData) {
  this.notes = [];
  var segments = analysisData.segments.slice(0, 20); // 20 segments for testing

  for(var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    var noteData = {};
    noteData.pitches = segment.pitches;
    noteData.duration = segment.duration;
    var note = new Note(this.audioContext, -1, noteData);
    this.notes.push(note);
  }
  return this.notes;
}
