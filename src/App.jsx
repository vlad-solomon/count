import "./App.scss";
import { Group } from "./components/Group/Group";
import { useCounterStore } from "./stores/useCounterStore";
import { Splash } from "./components/Splash/Splash";
import { ActionButton } from "./components/ActionButton/ActionButton";
import { Modal } from "./components/Modal/Modal";

function App() {
	const groups = useCounterStore((state) => state.groups);
	const isCreatingCounter = useCounterStore((state) => state.isCreatingCounter);

	return (
		<>
			{isCreatingCounter && <Modal />}
			{/* <Splash /> */}
			{groups.map(({ id, name, isExpanded }) => (
				<Group key={id} id={id} title={name} isExpanded={isExpanded} />
			))}
			<ActionButton />
		</>
	);
}

export default App;
