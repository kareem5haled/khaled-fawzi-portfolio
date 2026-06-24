import { Schema, model, Document } from 'mongoose';

export interface ISocialLink {
  platform: string;   // facebook, instagram, behance, linkedin...
  url: string;
}

export interface IProfile extends Document {
  name: string;
  title: string;          // مثلاً: "Graphic Designer"
  bio: string;            // نبذة عنه
  profileImage?: string;  // صورته الشخصية
  phone: string;
  email?: string;
  socialLinks: ISocialLink[];
  updatedAt: Date;
}

const socialLinkSchema = new Schema<ISocialLink>(
  {
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { _id: false } // مش محتاجين id لكل لينك لوحده
);

const profileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    socialLinks: {
      type: [socialLinkSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default model<IProfile>('Profile', profileSchema);