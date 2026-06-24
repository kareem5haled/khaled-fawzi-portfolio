import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;       // مثلاً: Logo, Branding, Poster, UI/UX...
  imageUrl: string;        // رابط الصورة الرئيسية
  images?: string[];       // صور إضافية لو فيه أكتر من صورة للمشروع
  client?: string;         // اسم العميل (اختياري)
  projectUrl?: string;     // لينك خارجي لو المشروع منشور حد
  featured: boolean;       // عشان نعرض أعمال مختارة في الصفحة الرئيسية
  order: number;           // ترتيب العرض
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    client: {
      type: String,
      trim: true,
    },
    projectUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // بيضيف createdAt و updatedAt تلقائياً
);

export default model<IProject>('Project', projectSchema);