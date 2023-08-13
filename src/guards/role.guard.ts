import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';


// Данную функцию необходимо вынести в отдельный файл
function matchRoles(roles: string [], clientRoles: string[] | string) : boolean {
  return true;
}


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles, 'roles ----');
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user, 'user ----');
    return matchRoles(roles, user.roles);
  }
}
