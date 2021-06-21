import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename: (req, file, callback) => {
      const fileHash = crypto.randomBytes(8).toString('hex');
      callback(null, `${req.user.id}/${fileHash}-${file.originalname}`);
    },
  }),
};
