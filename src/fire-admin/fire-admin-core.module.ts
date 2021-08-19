import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  FireAdminModuleAsyncOptions,
  FireAdminModuleOptions,
  FireAdminOptionsFactory,
} from './fire-admin.interfaces';
import * as firebase from 'firebase-admin';
import { getFireAdminAppToken } from './fire-admin.utils';
import { FIRE_ADMIN_MODULE_OPTIONS } from './fire-admin.constants';

@Global()
@Module({})
export class FireAdminCoreModule {
  static register(options: FireAdminModuleOptions): DynamicModule {
    const fireAdminAppName = getFireAdminAppToken(options.appName);
    const fireAdminAppProvider = {
      provide: fireAdminAppName,
      useFactory: () => {
        if (!firebase.apps.some((app) => app.name === fireAdminAppName)) {
          firebase.initializeApp(options.appOptions, fireAdminAppName);
        }

        return firebase.app(fireAdminAppName);
      },
    };

    return {
      module: FireAdminCoreModule,
      providers: [fireAdminAppProvider],
      exports: [fireAdminAppProvider],
    };
  }

  static registerAsync(options: FireAdminModuleAsyncOptions): DynamicModule {
    const fireAdminAppName = getFireAdminAppToken(options.appName);

    const fireAdminAppProvider = {
      provide: fireAdminAppName,
      useFactory: (
        fireAdminModuleOptions: Omit<FireAdminModuleOptions, 'appName'>,
      ) => {
        if (!firebase.apps.some((app) => app.name === fireAdminAppName)) {
          firebase.initializeApp(
            fireAdminModuleOptions.appOptions,
            fireAdminAppName,
          );
        }

        return firebase.app(fireAdminAppName);
      },
      inject: [FIRE_ADMIN_MODULE_OPTIONS],
    };

    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: FireAdminCoreModule,
      imports: options.imports || [],
      providers: [...asyncProviders, fireAdminAppProvider],
      exports: [fireAdminAppProvider],
    };
  }

  private static createAsyncProviders(
    options: FireAdminModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: FireAdminModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: FIRE_ADMIN_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: FIRE_ADMIN_MODULE_OPTIONS,
      useFactory: async (optionsFactory: FireAdminOptionsFactory) =>
        await optionsFactory.createFireAdminOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
