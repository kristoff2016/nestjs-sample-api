import { Controller, Request, Post, HttpCode } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';

@Controller()
export class AuthController {

  constructor(private authService: AuthService) { }

  @HttpCode(200)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @HttpCode(200)
  @Post('register')
  async register(@Request() req) {
    return this.authService.register(req);
  }
}

