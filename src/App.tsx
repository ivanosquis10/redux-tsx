import { CreateNewYUser } from './components/CreateNewYUser';
import ListOfUser from './components/ListOfUsers';

function App() {
	return (
		<div className='h-screen w-full p-10 grid md:grid-cols-12 gap-2 overflow-x-hidden'>
			<section className='md:col-span-8'>
				<ListOfUser />
			</section>
			<section className='md:col-span-4'>
				<CreateNewYUser />
			</section>
		</div>
	);
}

export default App