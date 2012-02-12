function NoteTable(numOctaves) {
  this.numOctaves = numOctaves;
  this.numPitches = numOctaves * 12;

  this.notes = [];
  this.computeNotes();
}

NoteTable.prototype.computeNotes = function() {
  var limit = 36 + this.numPitches;

  var i = 0;
  for(var p = 36; p < limit; p++) {
    this.notes[i] = 440 * Math.pow(2, (p - 69) / 12);
    i++;
  }
}
