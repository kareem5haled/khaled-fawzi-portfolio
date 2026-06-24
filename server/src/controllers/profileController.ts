import { Request, Response } from 'express';
import Profile from '../models/Profile';

// GET /api/profile - هات بيانات البروفايل (دايماً واحد بس)
export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

// PUT /api/profile - تعديل البروفايل (محمي - admin بس)
// لو مفيش بروفايل أصلاً، بيعمل واحد جديد (upsert)
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error });
  }
};