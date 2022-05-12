const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Message = mongoose.model('message', messageSchema);

export { Message };
