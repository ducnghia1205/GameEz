const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  value: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  expired: {
    type: Date,
    require: true
  },
  status: {
    type: String,
    enum: ['Active', 'Locked'],
    default: 'Active'
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
  toObject: {
    transform: function (doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports  = mongoose.model('Code', CodeSchema);
