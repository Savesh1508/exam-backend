import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService:JwtService,
    private readonly reflector: Reflector
  ){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest()
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({
        message: "You are not registered!"
      });
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: "You are not registered!"
      });
    }

    let user: any;
    try {
      user = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_KEY
      })
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: "You are not registered3!"
      });
    }
    if (!user) {
      throw new UnauthorizedException({
        message: "You are not registered4!"
      });
    }
    req.user = user;

    const hasPermission = user.roles.some((userRole: string) => requiredRoles.includes(userRole));

    if (!hasPermission) {
      throw new ForbiddenException({
        message: 'You don\'t have such rights!'
      });
    }
    return true;
  }
}