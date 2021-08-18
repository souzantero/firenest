import { DEFAULT_FIREBASE_ADMIN_APP } from './firebase-admin.constants';

export function getFirebaseAdminAppToken(appName?: string) {
  return appName && appName !== DEFAULT_FIREBASE_ADMIN_APP
    ? `${appName}FirebaseAdminApp`
    : DEFAULT_FIREBASE_ADMIN_APP;
}
