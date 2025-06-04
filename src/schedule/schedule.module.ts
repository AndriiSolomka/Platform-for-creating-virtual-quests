import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [ScheduleService],
})
export class ScheduleModule {}
