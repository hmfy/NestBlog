import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path'; // 引入 join 方法来拼接路径
import * as swaggerUi from 'swagger-ui-express'; // 引入 swagger-ui-express
import { PORT } from '../setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 提供 swagger-ui-dist 静态文件
  app.use('/docs/swagger-ui', express.static(join(__dirname, '..', 'node_modules', 'swagger-ui-dist')));

  // 配置 Swagger 文档
  const options = new DocumentBuilder()
    .setTitle('个人博客')
    .setDescription('接口文档，按入参要求调用')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // 设置 Swagger 路径，并将静态资源映射到 '/docs/swagger-ui'
  SwaggerModule.setup('docs', app, document, {
    customCssUrl: '/docs/swagger-ui/swagger-ui.css', // 使用 '/docs/swagger-ui' 作为前缀
    customJs: '/docs/swagger-ui/swagger-ui-bundle.js', // 更正为 customJs
    // customJsUrl: '/docs/swagger-ui/swagger-ui-bundle.js',
    // customJsUrl: '/docs/swagger-ui/swagger-ui-standalone-preset.js',
  });

  await app.listen(PORT);
}

bootstrap().then((r) => r);
