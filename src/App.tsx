import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Quest from "./components/Quest";
import Tutorial from "./components/Tutorial";
import LevelOverview from "./components/LevelOverview";
import Footer from "./components/Footer";
import { Quiz } from "./components/Quiz";
import { Theory } from "./components/Theory";

import exampleQuest1 from "./levels/exampleLevels/exampleQuest1";
import exampleQuest2 from "./levels/exampleLevels/exampleQuest2";
import exampleQuiz1 from "./levels/exampleLevels/exampleQuiz1";
import exampleTheory1 from "./levels/exampleLevels/exampleTheory1";
import level1Quest1 from "./levels/level1/level1Quest1";
import level1Quest2 from "./levels/level1/level1Quest2";
import level2Quest1 from "./levels/level2/level2Quest1";

function App(): ReactElement {
	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route path="/" exact component={LandingPage} />
				<Route path="/LevelOverview" exact component={LevelOverview} />
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
						<Quest config={exampleQuest2} nextPage="/ExampleQuiz1"></Quest>
					)}
				/>
				<Route
					path="/ExampleQuiz1"
					exact
					component={() => <Quiz config={exampleQuiz1}></Quiz>}
				/>
				<Route
					path="/ExampleTheory1"
					exact
					component={() => <Theory config={exampleTheory1}></Theory>}
				/>
				<Route
					path="/level1Quest1"
					exact
					component={() => <Quest config={level1Quest1} nextPage="/level1Quest2"></Quest>}
				/>
				<Route
					path="/level1Quest2"
					exact
					component={() => <Quest config={level1Quest2} nextPage="/level2Quest1"></Quest>}
				/>
				<Route
					path="/level2Quest1"
					exact
					component={() => (
						<Quest config={level2Quest1} nextPage="/ExampleQuest1"></Quest>
					)}
				/>
				<Route path="/Tutorial" exact component={Tutorial} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
