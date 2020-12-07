import { Module, HttpModule } from '@nestjs/common';
import { PeopleController } from './controller/people.controller';
import { PeopleService } from './service/people.service';

@Module({
  imports: [HttpModule],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
