import "./App.scss";
import { Counter } from "./components/Counter/Counter";
import { useCounterStore } from "./stores/useCounterStrore";

// todo fix store typo

function App() {
	const counters = useCounterStore((state) => state.counters);
	const activeCounter = useCounterStore((state) => state.activeCounter);

	return (
		<>
			{counters.map((counter) => (
				<Counter key={counter.id} {...counter} isActive={counter.id === activeCounter} />
			))}
		</>
	);
}

export default App;
