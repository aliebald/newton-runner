import React, { ReactElement, useState } from "react";
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

import exampleStory1 from "./levels/exampleLevels/exampleStory1";
import exampleQuest1 from "./levels/exampleLevels/exampleQuest1";
import exampleQuest2 from "./levels/exampleLevels/exampleQuest2";
import level1Theory1 from "./levels/level1/level1Theory1";
import level1GameMechanics1 from "./levels/level1/level1GameMechanics1";
import level1Quiz1 from "./levels/level1/level1Quiz1";
import level1Quiz2 from "./levels/level1/level1Quiz2";
import { settings as level1Quest1 } from "./levels/level1/level1Quest1";
import { settings as level1Quest2 } from "./levels/level1/level1Quest2";
import { settings as level1Quest3 } from "./levels/level1/level1Quest3";
import level2Quest1 from "./levels/level2/level2Quest1";
import level2Quest2 from "./levels/level2/level2Quest2";
import level2Quest3 from "./levels/level2/level2Quest3";

function App(): ReactElement {
	const [showBetaAlert, setShowBetaAlert] = useState(true);

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
				Danke fürs testen der <b>Betaversion vom 15. Dezember 2020</b>. Wir w&uuml;rden uns
				sehr über dein Feedback freuen!{" "}
				<a href="mailto:physics.game.team@gmail.com">Kontakt</a>
			</Alert>
			<Navigation />
			<Switch>
				<Route path="/" exact component={LandingPage} />
				<Route path="/LevelOverview" exact component={LevelOverview} />
				<Route path="/Statistics" exact component={Statistics} />
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
					path="/ExampleQuest1"
					exact
					component={() => (
						<Quest config={exampleQuest1} nextPage="/ExampleQuest2"></Quest>
					)}
				/>
				<Route
					path="/ExampleQuest2"
					exact
					component={() => (
						<Quest config={exampleQuest2} nextPage="/level1Theory1"></Quest>
					)}
				/>
				<Route
					path="/level1Theory1"
					exact
					component={() => (
						<Theory config={level1Theory1} nextPage="/level1Quiz1"></Theory>
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
					component={() => <Quest config={level1Quest3} nextPage="/level2Quest1"></Quest>}
				/>
				<Route
					path="/level2Quest1"
					exact
					component={() => <Quest config={level2Quest1} nextPage="/level2Quest2"></Quest>}
				/>
				<Route
					path="/level2Quest2"
					exact
					component={() => <Quest config={level2Quest2} nextPage="/level2Quest3"></Quest>}
				/>
				<Route
					path="/level2Quest3"
					exact
					component={() => (
						<Quest config={level2Quest3} nextPage="/ExampleQuest1"></Quest>
					)}
				/>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
