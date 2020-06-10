const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  codes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Code'
  }],
  status: {
    type: String,
    enum: ['Active', 'Locked', 'Pending'],
    default: 'Active'
  }
}, {
  timestamps: true,
  toObject: {
    transform: function (doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports  = mongoose.model('Game', GameSchema);
