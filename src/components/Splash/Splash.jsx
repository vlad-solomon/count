import "./Splash.scss";
import SplashLogo from "./SplashLogo.svg";

export function Splash() {
	return (
		<div className="splash">
			<img src={SplashLogo} />
		</div>
	);
}
