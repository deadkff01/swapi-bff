import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { MoviesModule } from './movies/movies.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [ConfigModule.forRoot(), TerminusModule, MoviesModule, PeopleModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
