import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

/**
 * USE ONLY FOR TESTS
 */
@Module({
  imports: [MikroOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppTestModule {}
