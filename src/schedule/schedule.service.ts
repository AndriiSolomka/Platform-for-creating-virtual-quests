import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ScheduleService {
  constructor(private readonly userService: UserService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async deleteUnconfirmedUsers(): Promise<void> {
    console.log('Running scheduled task to delete unconfirmed users');
    await this.userService.deleteUnconfirmedUsers();
  }
}
