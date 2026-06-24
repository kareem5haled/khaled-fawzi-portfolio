import { Request, Response } from 'express';

// POST /api/upload - برفع صورة واحدة ويرجع اللينك
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file as any; // multer-storage-cloudinary بيضيف path = secure_url

    res.status(200).json({
      imageUrl: file.path,
      publicId: file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
};