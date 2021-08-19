import { DynamicModule, Module } from '@nestjs/common';
import { FireAdminCoreModule } from './fire-admin-core.module';
import {
  FireAdminModuleAsyncOptions,
  FireAdminModuleOptions,
} from './fire-admin.interfaces';

@Module({})
export class FireAdminModule {
  static register(options: FireAdminModuleOptions): DynamicModule {
    return {
      module: FireAdminModule,
      imports: [FireAdminCoreModule.register(options)],
    };
  }

  static registerAsync(options: FireAdminModuleAsyncOptions): DynamicModule {
    return {
      module: FireAdminModule,
      imports: [FireAdminCoreModule.registerAsync(options)],
    };
  }
}
