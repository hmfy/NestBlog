import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PORT } from '../setting'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()
    .setTitle('server nest')
    .setDescription('server document')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.listen(PORT)
}
bootstrap().then((r) => r)
