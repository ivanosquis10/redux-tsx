import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Title,
} from "@tremor/react";
import { useUserActions } from "../hooks/actions/useUserActions";
import { useAppSelector } from "../hooks/store";
import { IconDelete } from "./Icons";

export default function ListOfUser() {
	const users = useAppSelector((state) => state.users);
	const { removeUser } = useUserActions();

	return (
		<Card className=''>
			<Title>
				Usuarios <Badge>{users.length}</Badge>
			</Title>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell> ID </TableHeaderCell>
						<TableHeaderCell> Nombre </TableHeaderCell>
						<TableHeaderCell> Email </TableHeaderCell>
						<TableHeaderCell> Acciones </TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell className="flex items-center">
								<img
									width={40}
									height={40}
									className="mr-2 rounded-full"
									src={`https://unavatar.io/github/${user.github}`}
									alt="avatar of the user"
									loading="lazy"
								/>
								{user.name}
							</TableCell>
							<TableCell> {user.email}</TableCell>
							<TableCell>
							
								<button
									type="button"
									onClick={() => removeUser(user.id)}
									aria-label="boton para eliminar"
								>
									<IconDelete />
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}