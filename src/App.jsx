import "./App.scss";
import { Splash } from "./components/Splash/Splash";
import { ActionButton } from "./components/ActionButton/ActionButton";
import { Modal } from "./components/Modal/Modal";
import { Groups } from "./components/Group/Group";

function App() {
	return (
		<>
			{/* <Splash /> */}
			<Modal />
			<Groups />
			<ActionButton />
			{/* //todo empty state */}
		</>
	);
}

export default App;
