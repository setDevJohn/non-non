export type EventStatus = 'draft' | 'waiting_confirmation' | 'ready' | 'active' | 'finished' | 'cancelled';

export interface Event {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  entryFee: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  entryFee?: number;
}

export interface UpdateEventStatusData {
  status: EventStatus;
}

export interface InviteParticipantData {
  userIds: string[];
}
