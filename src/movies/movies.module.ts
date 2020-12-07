import { Module, HttpModule } from '@nestjs/common';
import { MoviesController } from './controller/movies.controller';
import { MoviesService } from './service/movies.service';

@Module({
  imports: [HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
