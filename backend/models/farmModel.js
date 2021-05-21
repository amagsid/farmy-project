import mongoose from 'mongoose';

const farmSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coordinates: [
      {
        type: Array,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    // eslint-disable-next-line comma-dangle
  }
);

const Farm = mongoose.model('Farm', farmSchema);

export default Farm;
