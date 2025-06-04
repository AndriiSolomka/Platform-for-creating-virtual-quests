/* eslint-disable */
import { ScheduleService } from '../schedule.service';
import { UserService } from '../../user/user.service';

describe('ScheduleService', () => {
  let scheduleService: ScheduleService;
  let userService: jest.Mocked<UserService>;

  beforeEach(() => {
    userService = {
      deleteUnconfirmedUsers: jest.fn().mockResolvedValue(undefined),
    } as any;

    scheduleService = new ScheduleService(userService);
  });

  it('should call userService.deleteUnconfirmedUsers when deleteUnconfirmedUsers is triggered', async () => {
    await scheduleService.deleteUnconfirmedUsers();
    expect(userService.deleteUnconfirmedUsers).toHaveBeenCalled();
  });

  it('should propagate errors from userService.deleteUnconfirmedUsers', async () => {
    userService.deleteUnconfirmedUsers.mockRejectedValueOnce(new Error('fail'));
    await expect(scheduleService.deleteUnconfirmedUsers()).rejects.toThrow(
      'fail',
    );
  });
});
