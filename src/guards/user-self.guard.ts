import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserSelfGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService, ){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    if (req.user.roles.includes('ADMIN')) {
      return true;
    }

    if (String(req.user.id) !== String(req.params.id)) {
      throw new ForbiddenException({
        message: 'You don\'t have such rights!',
      });
    }
    return true;
  }
}