import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserId, Users, UsersWithId } from '../../interfaces';

const DEFAULT_STATE: UsersWithId[] = [
	{
		id: "1",
		name: "Ivan Rodriguez",
		email: "ivanosquis10@gmail.com",
		github: "ivanosquis10",
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "janesmith@example.com",
		github: "janesmithDev",
	},
	{
		id: "3",
		name: "Bob Johnson",
		email: "bobjohnson@example.com",
		github: "bobjohnsonDev",
	},
	{
		id: "4",
		name: "Samantha Lee",
		email: "samanthalee@example.com",
		github: "samanthaleeDev",
	},
	{
		id: "5",
		name: "David Brown",
		email: "davidbrown@example.com",
		github: "davidbrownDev",
	},
]

const initialState: UsersWithId[] = (() => {
	const persistedStorage = localStorage.getItem('__state__redux__users__')
	if(persistedStorage) return JSON.parse(persistedStorage).users

	return DEFAULT_STATE
})()

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addUsers: (state, action: PayloadAction<Users>) => {
			// generamos la nueva id
			const id = crypto.randomUUID();
			return [...state, { id, ...action.payload }];
		},

		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((userId) => userId.id !== id);
		},
		// funcion rollback que se encargar de meter al usuario en caso de que haya un error o algo salga mal
		rollbackUser: (state, action: PayloadAction<UsersWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				state.push(action.payload);
			}
		},
	},
});

export default userSlice.reducer
export const { deleteUserById, addUsers, rollbackUser } = userSlice.actions;