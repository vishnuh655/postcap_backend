import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedditModule } from './reddit/reddit.module';

@Module({
  imports: [RedditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
