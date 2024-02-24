import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { TokenService } from "./token.service";
import { Token } from "src/hamechidun/DTO/token";

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly tokenService: TokenService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest(); // Get the request object
    const token={
      userId:11015166,//request.headers['authorization'],
      pipelinesIds:"1,2,3"
      } as Token
    this.tokenService.setToken(token); // Now you can use the token

    return next.handle().pipe(
      tap(() => {
        this.tokenService.setToken(null); // Remove after request completion
      }),
    );
  }
}