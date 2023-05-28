import { UserId, Users } from '../../interfaces';
import { addUsers, deleteUserById } from "../../store/users/slice";
import { useAppDispatch } from "../store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const addUser = ({ name, email, github }: Users) => {
		dispatch(addUsers({ name, email, github }));
	}

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	}

	

	return {
		removeUser,
		addUser,
	};
};