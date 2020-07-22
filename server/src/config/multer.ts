import multer from 'multer'; //uploads de imagens
import path from 'path'; //dependência do node que lida com caminhos
import crypto from 'crypto'; //gera um hash aleatório de dados

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'), //path.resolve resolve o caminha da forma mais correta possível
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex'); //converte para uma string hexadecimal

      const filename = `${hash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
