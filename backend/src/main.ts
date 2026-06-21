import { setServers } from 'node:dns/promises';
setServers(['1.1.1.1', '8.8.8.8']);
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Application failed to run:', err);
  process.exit(1);
});
