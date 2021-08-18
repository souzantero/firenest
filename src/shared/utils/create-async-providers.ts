import { Abstract, ModuleMetadata, Provider, Type } from '@nestjs/common';

export interface AsyncModuleOptions<T> extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AsyncModuleOptionsFactory<T>>;
  useClass?: Type<AsyncModuleOptionsFactory<T>>;
  useFactory?: (...args: any[]) => Promise<T> | T;
  inject?: any[];
}

export interface AsyncModuleOptionsFactory<T> {
  createOptions(): Promise<T> | T;
}

export function createAsyncOptionsProviders<T>(
  provide: string | symbol | Type<any> | Abstract<any> | Function,
  options: AsyncModuleOptions<T>,
): Provider[] {
  if (options.useExisting || options.useFactory) {
    return [createAsyncOptionsProvider<T>(provide, options)];
  }
  return [
    createAsyncOptionsProvider<T>(provide, options),
    {
      provide: options.useClass,
      useClass: options.useClass,
    },
  ];
}

function createAsyncOptionsProvider<T>(
  provide: string | symbol | Type<any> | Abstract<any> | Function,
  options: AsyncModuleOptions<T>,
): Provider {
  if (options.useFactory) {
    return {
      provide,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
  return {
    provide,
    useFactory: async (optionsFactory: AsyncModuleOptionsFactory<T>) =>
      await optionsFactory.createOptions(),
    inject: [options.useExisting || options.useClass],
  };
}
