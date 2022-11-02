import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-credinals.dto';
import { User } from './user.enity';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async signUp(@Body() authDto: AuthDto): Promise<User> {
    return await this.authService.signUp(authDto);
  }
}
