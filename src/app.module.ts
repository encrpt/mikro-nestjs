import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChairmanModule } from './modules/chairman/chairman.module';

@Module({
  imports: [MikroOrmModule.forRoot(), ChairmanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
