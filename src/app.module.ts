import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { TagModule } from './tag/tag.module'
import { LinkModule } from './link/link.module'
import { DemoModule } from './demo/demo.module'
import { TalkModule } from './talk/talk.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileModule } from './file/file.module'
import { dbPath } from '../setting'

@Module({
  imports: [
    ArticleModule,
    TagModule,
    LinkModule,
    DemoModule,
    TalkModule,
    FileModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: dbPath,
      logging: 'all',
      logger: 'advanced-console',
      autoLoadEntities: true,
      // entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
