import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [BoardsModule, TypeOrmModule.forRoot(typeORMConfig)], //루트에 inport해서 typeorm 사용가능
  controllers: [],
  providers: [],
})
export class AppModule {}
