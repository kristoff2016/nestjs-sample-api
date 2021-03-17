import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from './todo/todo.module'
import { AuthModule } from './auth/auth.module'

import { DatabaseConnectionService } from './db.connection'
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    AuthModule, 
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
