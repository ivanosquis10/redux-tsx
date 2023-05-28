export type UserId = string;

export interface Users {
	name: string;
	email: string;
	github: string;
}

export interface UsersWithId extends Users {
	id: UserId;
} 