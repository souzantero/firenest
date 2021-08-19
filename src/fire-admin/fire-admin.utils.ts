import { DEFAULT_FIRE_ADMIN_APP } from './fire-admin.constants';

export function getFireAdminAppToken(appName?: string) {
  return appName && appName !== DEFAULT_FIRE_ADMIN_APP
    ? `${appName}${DEFAULT_FIRE_ADMIN_APP}`
    : DEFAULT_FIRE_ADMIN_APP;
}
