import { DynamicModule, Module } from '@nestjs/common';
import { FireAdminCoreModule } from './fire-admin-core.module';
import { FireAdminModuleOptions } from './fire-admin.interfaces';

@Module({})
export class FireAdminModule {
  static register(options: FireAdminModuleOptions): DynamicModule {
    return {
      module: FireAdminModule,
      imports: [FireAdminCoreModule.register(options)],
    };
  }
}
