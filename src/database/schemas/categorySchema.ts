import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  { _id: String, title: String, color: String },
  { versionKey: false },
);

export const CategoryModel = mongoose.model('Category', CategorySchema);
