import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { dataSource } from 'src/database';
import { AuthDto } from './dto/auth-credinals.dto';
import { User } from './user.enity';
import * as bcrypt from 'bcrypt';

export const authRepositoy = dataSource.getRepository(User).extend({
  async signUp(authDto: AuthDto): Promise<void> {
    const { username, password } = authDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const users = authRepositoy.create({ username, password: hashPassword });

    try {
      await authRepositoy.save(users);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  },
});
