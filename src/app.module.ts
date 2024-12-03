import { UserModule, AppsModule } from '@module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, AppsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
