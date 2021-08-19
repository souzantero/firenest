import { ModuleMetadata, Type } from '@nestjs/common';
import firebase, { app } from 'firebase-admin';

export interface FireAdminApp extends app.App {}

export interface FireAdminModuleOptions {
  appName?: string;
  appOptions?: firebase.AppOptions;
}

export interface FireAdminModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  appName?: string;
  useExisting?: Type<FireAdminOptionsFactory>;
  useClass?: Type<FireAdminOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<Omit<FireAdminModuleOptions, 'appName'>> | Omit<FireAdminModuleOptions, 'appName'>;
  inject?: any[];
}

export interface FireAdminOptionsFactory {
  createFireAdminOptions():
    | Promise<Omit<FireAdminModuleOptions, 'appName'>>
    | Omit<FireAdminModuleOptions, 'appName'>;
}
