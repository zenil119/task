import { dataSource } from 'src/database';
import { AuthDto } from './dto/auth-credinals.dto';
import { User } from './user.enity';

export const authRepositoy = dataSource.getRepository(User).extend({
  
});
