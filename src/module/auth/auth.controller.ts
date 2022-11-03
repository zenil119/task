import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-credinals.dto';
import { User } from './user.enity';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async signUp(@Body() authDto: AuthDto): Promise<void> {
    return await this.authService.signUp(authDto);
  }

  @Post('/signin')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async signIn(@Body() authDto: AuthDto): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authDto);
  }
}
