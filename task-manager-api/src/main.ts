import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Use the interceptor globally
  app.useGlobalInterceptors(new TokenInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
