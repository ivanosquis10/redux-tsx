import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/actions/useUserActions";

export const CreateNewYUser = () => {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

  const timeNotification = (seconds = 1000) => {
    setTimeout(() => {
      setResult(null)
    }, seconds);
  }

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setResult(null);

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		// if ([name, email, github].includes("")) return setResult("ko");
		if ([name, email, github].includes("")) {
			setResult("ko");
			return timeNotification()
		}

		addUser({ name, email, github });
    setResult("ok");
		form.reset();
		timeNotification()
	};

	return (
		<Card className="h-full">
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit} className="space-y-3 mt-3">
				<TextInput name="name" placeholder="Aqui tu nombre" />
				<TextInput name="email" placeholder="Aqui tu email" />
				<TextInput name="github" placeholder="Aqui tu usuario de github" />
				<div className="flex items-center justify-between">
					<Button type="submit">Crear usuario!</Button>

					{result === "ok" && (
						<Badge color="green">Guardado correctamente</Badge>
					)}

					{result === "ko" && <Badge color="red">Campos Oblogatorios</Badge>}
				</div>
			</form>
		</Card>
	);
};
