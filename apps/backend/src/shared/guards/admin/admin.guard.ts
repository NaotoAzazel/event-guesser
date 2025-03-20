import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> {
    // TODO add admin guard logic
    return Promise.resolve(true);
  }
}
