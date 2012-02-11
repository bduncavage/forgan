NoteDict = { 130.81:"C1", 146.83:"D1", 164.81:"E1", 174.61:"F1",
              196.00:"G1", 220.00:"A1", 246.94:"B1", 261.63:"C2",
              293.66:"D2", 329.63:"E2", 349.23:"F2", 392.00:"G2",
              440.00:"A2", 493.88:"B2", 523.25:"C3", 587.33:"D3",
              659.26:"E3", 698.46:"F3", 783.99:"G3", 880.00:"A3",
              987.77:"B3", 1046.50:"C4", 1174.66:"D4", 1381.51:"E4",
              1396.91:"F4", 1567.98:"G4", 1760.00:"A4", 1975.53:"B4",
              2093.00:"C4"};

ChromaticScale = {
  A:440,
  As:466.16,
  Bb:466.16,
  B:493.88,
  C:523.25,
  Cs:554.37,
  Db:554.37,
  D:587.33,
  Ds:622.25,
  Eb:622.25,
  E:659.25,
};  

function NoteTable() {
  this.count = 0;
  for(key in NoteDict) {
    this.count++;
  }
}

NoteTable.prototype.noteForFrequency = function(freq) {
  for(key in NoteDict) {
    if(freq == key) {
      return NoteDict[key];
    }
  }
}

NoteTable.prototype.frequencyForNote = function(note) {
  for(key in NoteDict) {
    if(NoteDict[key] == note) {
      return key;
    }
  }
}

NoteTable.prototype.frequencyAtIndex = function(index) {
  var count = 0;
  for(key in NoteDict) {
    if(count == index) {
      return key;
    }
    count++;
  }
}

NoteTable.prototype.noteAtIndex = function(index) {
  var count = 0;
  for(key in NoteDict) {
    if(count == index) {
      return NoteDict[key];
    }
  }
}
