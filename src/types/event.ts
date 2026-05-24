export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  entryValue: number;
  maxParticipants: number;
  isPublic: boolean;
  status: 'pending' | 'active' | 'completed';
  participants: Participant[];
  admins: string[]; // user IDs
  createdBy: string;
  prizePool?: number;
  createdAt: string;
}

export interface Participant {
  userId: string;
  userName: string;
  userPhoto?: string;
  points: number;
  ranking: number;
}

export interface CreateEventData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  entryValue: number;
  maxParticipants: number;
  isPublic: boolean;
}
