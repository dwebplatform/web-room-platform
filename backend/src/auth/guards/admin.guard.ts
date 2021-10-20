import { CanActivate, ExecutionContext } from "@nestjs/common";


export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext){
    //TODO: в конструктор AdminGuard будут передаваться типы пользователей, которые могут совершать данное действие
    //TODO: если тип пользователя с данным id не входит в список переданный в конструктор, то тогда, вовзрашаем false 
    const request = context.switchToHttp().getRequest();

    return request.userId ? true: false;
  }
}
