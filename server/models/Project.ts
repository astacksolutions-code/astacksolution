import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category: 'Web Dev' | 'Graphic Design' | 'Digital Marketing';
  description: string;
  imageUrl: string;
  technologies: string[];
  featured: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Web Dev', 'Graphic Design', 'Digital Marketing'] 
  },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  technologies: [{ type: String }],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProject>('Project', ProjectSchema);
