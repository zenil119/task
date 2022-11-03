import { Injectable, UnauthorizedException } from '@nestjs/common';
import { authRepositoy } from './auth.repository';
import { AuthDto } from './dto/auth-credinals.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signUp(authDto: AuthDto): Promise<void> {
    return await authRepositoy.signUp(authDto);
  }

  async signIn(authDto: AuthDto): Promise<{ accessToken: string }> {
    const { username, password } = authDto;
    const user = await authRepositoy.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check username or password');
    }
  }
}
