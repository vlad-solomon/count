import "./App.scss";
import { Splash } from "./components/Splash/Splash";
import { ActionButton } from "./components/ActionButton/ActionButton";
// import { Modal } from "./components/Modal/Modal";
import { Groups } from "./components/Group/Group";
import { ModalOverlay } from "./components/ModalOverlay/ModalOverlay";
import { useModalStore } from "./stores/useModalStore";

function App() {
	const modal = useModalStore((state) => state.modal);

	return (
		<>
			<Splash />
			{/* <Modal /> */}
			{modal && <ModalOverlay />}
			<Groups />
			<ActionButton />
			{/* //todo empty state */}
		</>
	);
}

export default App;
