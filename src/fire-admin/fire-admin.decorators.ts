import { Inject } from '@nestjs/common';
import { getFireAdminAppToken } from './fire-admin.utils';

export function InjectFireAdminApp(appName?: string) {
  return Inject(getFireAdminAppToken(appName));
}
