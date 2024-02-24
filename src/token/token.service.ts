import { Injectable } from "@nestjs/common";
import { Token } from "src/hamechidun/DTO/token";

// token.service.ts
@Injectable()
export class TokenService {
  private token: Token;

  setToken(token: Token) {
    this.token = token;
  }

  getToken(): Token {
    return this.token;
  }
}