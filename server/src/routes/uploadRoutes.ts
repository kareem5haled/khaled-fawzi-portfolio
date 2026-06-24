import { Router } from 'express';
import upload from '../middleware/upload';
import { uploadImage } from '../controllers/uploadController';
import { protect } from '../middleware/auth';

const router = Router();

// محمي - admin بس يرفع صور
router.post('/', protect, upload.single('image'), uploadImage);

export default router;