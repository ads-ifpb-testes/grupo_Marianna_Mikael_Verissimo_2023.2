import multer from 'multer';
import uploadConfig from '../config/upload';

export default {
    image: multer(uploadConfig.upload("./tmp/imovelImage"))
}