import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String, required: true },
    views: { type: Number, default: 0 }
  },
  { timestamps: true } // createdAt, updatedAt
);

videoSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

videoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    delete ret._id;
  }
});

export const Video = mongoose.model("Video", videoSchema);