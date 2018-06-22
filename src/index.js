import React from "react";
import ReactDOM from "react-dom";
import {store} from "./store";
import {Provider} from "react-redux";
import {CookiesProvider, Cookies} from "react-cookie";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/index.css";
import {loginFromCookies} from "./actions/userActions";

const render = () => {
	ReactDOM.render(
		<CookiesProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</CookiesProvider>,
		document.getElementById("root")
	);

	registerServiceWorker();
};

const cookies = new Cookies();
const glogtoken = cookies.get("glogtoken", {doNotParse: true});
const gloguser = cookies.get("gloguser", {doNotParse: true});

try {
	if (glogtoken && gloguser) {
		loginFromCookies(gloguser, glogtoken)(store.dispatch).then(render());
	} else {
		render();
	}
} catch (e) {
	render();
}
