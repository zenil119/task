import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authRepositoy } from './auth.repository';
import { JwtPayload } from './jwt-interface';
import { User } from './user.enity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: 'zd0926',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;

    const user: User = await authRepositoy.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
