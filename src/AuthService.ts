import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthService {
  getAuthorizationHeader(request: Request): string {
    const token = request.headers['authorization'];
    if (!token) {
      throw new Error('Authorization header not found');
    }
    return token;
  }
}
