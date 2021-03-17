import {
    CanActivate,
    ExecutionContext,
    Injectable,
    BadRequestException,
  } from '@nestjs/common';
  
  import { decryptToken } from 'src/utils/helper';
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      return validateAuth(request);
    }
  }
  
  const validateAuth = async (request: { route: any; headers: { authorization: any; }; user: string | object; }) => {
    const token = request.headers.authorization;
    if (!token) {
      throw new BadRequestException('Missing Token');
    }
    const user = await decryptToken(token);
    if (!user) {
      throw new BadRequestException('Token is invalid');
    }
    request.user = user;
    return true;
  };
