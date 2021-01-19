import React, { ReactElement, useState } from "react";
import UnknownPageError from "./components/UnknownPageError";
import { Alert } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Quest from "./components/Quest";
import LevelOverview from "./components/LevelOverview";
import Footer from "./components/Footer";
import { Quiz } from "./components/Quiz";
import { Theory } from "./components/Theory";
import { Statistics } from "./components/Statistics";
import Login from "./components/Login";
import { isLoggedIn } from "./userdata";
import LoginPopup from "./components/LoginPopup";
import Questionnaire from "./components/Questionnaire";

import exampleStory1 from "./levels/exampleLevels/exampleStory1";
import level1Story1 from "./levels/level1/level1Story1";
import level1Story2 from "./levels/level1/level1Story2";
import level1Theory1 from "./levels/level1/level1Theory1";
import level1QuizExplanation1 from "./levels/level1/level1QuizIntro1";
import level1GameMechanics1 from "./levels/level1/level1GameMechanics1";
import level1Quiz1 from "./levels/level1/level1Quiz1";
import level1Quiz2 from "./levels/level1/level1Quiz2";
import { settings as level1Quest1 } from "./levels/level1/level1Quest1";
import { settings as level1Quest2 } from "./levels/level1/level1Quest2";
import { settings as level1Quest3 } from "./levels/level1/level1Quest3";
import level2Story1 from "./levels/level2/level2Story1";
import level2Story2 from "./levels/level2/level2Story2";
import level2Theory1 from "./levels/level2/level2Theory1";
import level2Quiz1 from "./levels/level2/level2Quiz1";
import level2Quiz2 from "./levels/level2/level2Quiz2";
import level2Quest1 from "./levels/level2/level2Quest1";
import level2Quest2 from "./levels/level2/level2Quest2";
import level2Quest3 from "./levels/level2/level2Quest3";

function App(): ReactElement {
	const [networkError, setNetworkError] = useState(checkNetworkError());
	const [showBetaAlert, setShowBetaAlert] = useState(true);
	const [loggedIn, setLoggedIn] = useState(isLoggedIn());
	const [showLoginPopup, setShowLoginPopup] = useState(
		location.pathname !== "/login" && !loggedIn
	);

	// For deployment to GH Pages:
	// Change <BrowserRouter> to <HashRouter basename="/">
	return (
		<BrowserRouter>
			<Alert
				variant="danger"
				onClose={() => setShowBetaAlert(false)}
				dismissible
				style={{ margin: "0" }}
				show={showBetaAlert}
			>
				Danke f&uuml;rs testen der <b>Betaversion vom 19. Januar 2021</b>. Wir w&uuml;rden
				uns sehr &uuml;ber dein Feedback freuen!&nbsp;
				<a href="mailto:physics.game.team@gmail.com">Kontakt</a>
			</Alert>
			<Alert
				variant="danger"
				onClose={removeNetworkError}
				dismissible
				style={{ margin: "0" }}
				show={networkError}
			>
				Ein Netzwerkfehler ist aufgetreten und du wurdest automatisch abgemeldet. Bitte
				versuche es sp&auml;ter erneut.
			</Alert>
			<LoginPopup show={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
			<Navigation loggedIn={loggedIn} />
			<Switch>
				<Route path="/" exact component={() => <LandingPage loggedIn={loggedIn} />} />
				<Route path="/LevelOverview" exact component={LevelOverview} />
				<Route path="/Statistics" exact component={Statistics} />
				<Route
					path="/login"
					exact
					component={() => <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
				/>
				<Route
					path="/exampleStory1"
					exact
					component={() => (
						<Theory
							config={exampleStory1}
							nextPage="/level1Quiz1"
							isStory={true}
						></Theory>
					)}
				/>
				<Route
					path="/level1Story1"
					exact
					component={() => (
						<Theory
							config={level1Story1}
							nextPage="/level1Theory1"
							isStory={true}
						></Theory>
					)}
				/>
				<Route
					path="/level1Theory1"
					exact
					component={() => (
						<Theory config={level1Theory1} nextPage="/level1Quiz1Explanation1"></Theory>
					)}
				/>
				<Route
					path="/level1Quiz1Explanation1"
					exact
					component={() => (
						<Theory
							config={level1QuizExplanation1}
							nextPage="/level1Quiz1"
							isStory={true}
						></Theory>
					)}
				/>
				<Route
					path="/level1Quiz1"
					exact
					component={() => (
						<Quiz
							config={level1Quiz1}
							nextPage="/level1GameMechanics1"
							theoryLink="/level1Theory1"
						></Quiz>
					)}
				/>
				<Route
					path="/level1GameMechanics1"
					exact
					component={() => (
						<Theory
							config={level1GameMechanics1}
							nextPage="/level1Quest1"
							isStory={true}
						></Theory>
					)}
				/>
				<Route
					path="/level1Quest1"
					exact
					component={() => <Quest config={level1Quest1} nextPage="/level1Quest2"></Quest>}
				/>
				<Route
					path="/level1Quest2"
					exact
					component={() => <Quest config={level1Quest2} nextPage="/level1Quiz2"></Quest>}
				/>
				<Route
					path="/level1Quiz2"
					exact
					component={() => <Quiz config={level1Quiz2} nextPage="/level1Quest3"></Quiz>}
				/>
				<Route
					path="/level1Quest3"
					exact
					component={() => <Quest config={level1Quest3} nextPage="/level1Story2"></Quest>}
				/>
				<Route
					path="/level1Story2"
					exact
					component={() => (
						<Theory
							config={level1Story2}
							nextPage="/level1Questionnaire"
							isStory={true}
						></Theory>
					)}
				/>
				<Route
					path="/level1Questionnaire"
					exact
					component={() => <Questionnaire level={1} nextPage="/level2Story1" />}
				/>
				<Route
					path="/level2Story1"
					exact
					component={() => (
						<Theory
							config={level2Story1}
							nextPage="/level2Theory1"
							isStory={true}
						></Theory>
					)}
				/>
				<Route
					path="/level2Theory1"
					exact
					component={() => (
						<Theory config={level2Theory1} nextPage="/level2Quiz1"></Theory>
					)}
				/>
				<Route
					path="/level2Quiz1"
					exact
					component={() => (
						<Quiz
							config={level2Quiz1}
							nextPage="/level2Quest1"
							theoryLink="/level2Theory1"
						></Quiz>
					)}
				/>
				<Route
					path="/level2Quest1"
					exact
					component={() => <Quest config={level2Quest1} nextPage="/level2Quest2"></Quest>}
				/>
				<Route
					path="/level2Quest2"
					exact
					component={() => <Quest config={level2Quest2} nextPage="/level2Quiz2"></Quest>}
				/>
				<Route
					path="/level2Quiz2"
					exact
					component={() => (
						<Quiz
							config={level2Quiz2}
							nextPage="/level2Quest3"
							theoryLink="/level2Theory1"
						></Quiz>
					)}
				/>
				<Route
					path="/level2Quest3"
					exact
					component={() => <Quest config={level2Quest3} nextPage="/level2Story2"></Quest>}
				/>
				<Route
					path="/level2Story2"
					exact
					component={() => (
						<Theory
							config={level2Story2}
							nextPage="/level2Questionnaire"
							isStory={true}
						></Theory>
					)}
				/>
				<Route
					path="/level2Questionnaire"
					exact
					component={() => <Questionnaire level={2} nextPage="/" />}
				/>

				<Route component={UnknownPageError} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);

	function checkNetworkError(): boolean {
		return "networkError" in sessionStorage && sessionStorage.networkError === "true";
	}

	function removeNetworkError() {
		sessionStorage.removeItem("networkError");
		setNetworkError(false);
	}
}

export default App;
