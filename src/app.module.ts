import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChairmanModule } from './modules/chairman/chairman.module';

@Module({
  imports: [ChairmanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
