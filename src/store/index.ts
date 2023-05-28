import { Middleware, configureStore } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser } from "./users/slice";

const persistLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem(
			"__state__redux__users__",
			JSON.stringify(store.getState()),
		);
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		// fase 1: antes de actualizar el estado
		const { type, payload } = action;
		const previousState = store.getState() as RootState;
		next(action);
		//  fase 2: despues de actualizar el estado
		// a esto que aplicamos aqui se le llama optimistic ui, lo que hace es darle feedback al usuario de la respectiva accion y mientras por detras se esta haciendo el llamado a la base de datos con la accion efectuada
		// es decir, si borramos -> el usuario vera que se borro (porque estamos siendo optimistas de que todo saldra bien) y por detras se hace la peticion al servidor
		// en caso de que haya un error haremos un rollback, esto es algo que esta en muchas paginas como ws, fb, tw, etc

		// <- eliminado un usuario
		const userIdToRemove = payload;
		const userToRemove = previousState.users.find(
			(user) => user.id === userIdToRemove,
		);

		fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					// toast.success(`Usuario ${payload} eliminado correctamente`)
										alert(`Usuario ${payload} eliminado correctamente`);
				}
				// throw new Error("Error al eliminar el usuario");
			})
			.catch((err) => {
				// toast.error(`Error deleting user ${userIdToRemove}`);
				if (userToRemove) store.dispatch(rollbackUser(userToRemove));
				console.log(err);
				console.log("error");
			});
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

// obtenemos el tipo que retorna la funcion (con el typeof) y lo devolvemos
// esto solo se hace una vez
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;