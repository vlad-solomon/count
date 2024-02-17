import "./App.scss";
import { Group } from "./components/Group/Group";
import { useCounterStore } from "./stores/useCounterStore";
import { Splash } from "./components/Splash/Splash";

function App() {
	const groups = useCounterStore((state) => state.groups);

	return (
		<>
			{/* <Splash /> */}
			{groups.map(({ id, name, isExpanded }) => (
				<Group key={id} id={id} title={name} isExpanded={isExpanded} />
			))}
		</>
	);
}

export default App;
