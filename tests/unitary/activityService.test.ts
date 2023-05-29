import { notFoundError } from '@/errors';
import activitiesService from '@/services/activity-service';
import activityRepository from '@/repositories/activity-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { forBiddenError } from '@/errors/forbidden-error';
import { createEnrollment, createTicket, createTicketType, createActivity } from '../factories';

jest.mock('@/repositories/activity-repository');
jest.mock('@/repositories/enrollment-repository');
jest.mock('@/repositories/tickets-repository');

describe('findActivitiesService', () => {
  it('should return all activities', async () => {
    const activities = [
      { id: 1, name: 'Activity 1', capacity: 10 },
      { id: 2, name: 'Activity 2', capacity: 5 },
    ];

    activityRepository.findActivitiesByEnrollmentId= jest.fn().mockResolvedValue(activities);

  })
});

describe('postService', () => {
  it('should create am active for the given user and activity', async () => {
    const userId = 1;
    const activityId = 1;
    const enrollment = createEnrollment(1, userId, activityId);
    const activity = createActivity(activityId, 'Activity 1', 10);

    enrollmentRepository.findWithAddressByUserId = jest.fn().mockResolvedValue(enrollment);
    activityRepository.createActivity = jest.fn().mockResolvedValue(activity);

    await activitiesService.createActivity(userId, activityId);

    expect(enrollmentRepository.findWithAddressByUserId).toHaveBeenCalledWith(userId);
    expect(ticketRepository.findTicketByEnrollmentId).toHaveBeenCalledWith(enrollment.id);
    expect(activityRepository.createActivity).toHaveBeenCalledWith(userId, activityId);
  });

  it('should throw notFoundError if no enrollment is found for the user', async () => {
    const userId = 1;
    const activityId = 1;

    enrollmentRepository.findWithAddressByUserId = jest.fn().mockResolvedValue(null);

    await expect(activitiesService.createActivity(userId, activityId)).rejects.toEqual(notFoundError());
    expect(enrollmentRepository.findWithAddressByUserId).toHaveBeenCalledWith(userId);
  });

  it('should throw notFoundError if no ticket is found for the enrollment', async () => {
    const userId = 1;
    const activityId = 1;
    const enrollment = { id: 1, userId, activityId };

    enrollmentRepository.findWithAddressByUserId = jest.fn().mockResolvedValue(enrollment);
    ticketRepository.findTicketByEnrollmentId = jest.fn().mockResolvedValue(null);

    await expect(activitiesService.createActivity(userId, activityId)).rejects.toEqual(notFoundError());
    expect(enrollmentRepository.findWithAddressByUserId).toHaveBeenCalledWith(userId);
    expect(ticketRepository.findTicketByEnrollmentId).toHaveBeenCalledWith(enrollment.id);
  });
  it('should throw forbiddenError if the ticket status is not "PAID"', async () => {
    const userId = 1;
    const activityId = 1;
    const enrollment = { id: 1, userId, activityId };
    const ticket = { id: 1, status: 'PENDING', TicketType: { isRemote: false } };

    enrollmentRepository.findWithAddressByUserId = jest.fn().mockResolvedValue(enrollment);
    ticketRepository.findTicketByEnrollmentId = jest.fn().mockResolvedValue(ticket);

    await expect(activitiesService.createActivity(userId, activityId)).rejects.toEqual(forBiddenError());
    expect(enrollmentRepository.findWithAddressByUserId).toHaveBeenCalledWith(userId);
    expect(ticketRepository.findTicketByEnrollmentId).toHaveBeenCalledWith(enrollment.id);
  });
});