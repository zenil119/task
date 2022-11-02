import { Injectable } from '@nestjs/common';
import { authRepositoy } from './auth.repository';
import { AuthDto } from './dto/auth-credinals.dto';
import { User } from './user.enity';

@Injectable()
export class AuthService {
  async signUp(authDto: AuthDto): Promise<User> {
    const { username, password } = authDto;
    const users = authRepositoy.create({ username, password });
    await authRepositoy.save(users);
    return users;
  }
}
