import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { FILE_SIZE } from 'src/infrastructure/common/constants/file/file.constant';

const fileOptions: MulterOptions = {
  limits: {
    fileSize: FILE_SIZE,
  },
  fileFilter: (request, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|pdf)$/)) {
      return callback(new Error('Only files are allowed!'), false);
    }
    callback(null, true);
  },
  storage: diskStorage({
    destination: join(process.cwd(), '..', 'uploads'),
    filename: (request, file, callback) => {
      const extension = extname(file.originalname);
      const uniqueSuffix = uuidv4();
      const filename = `${uniqueSuffix}${extension}`;
      callback(null, filename);
    },
  }),
};
export default fileOptions;
