import { Inject } from '@nestjs/common';
import { getFirebaseAdminAppToken } from './firebase-admin.utils';

export function InjectFirebaseAdminApp(appName?: string) {
  return Inject(getFirebaseAdminAppToken(appName));
}
