import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import ExampleQuest1 from "./levels/exampleLevel/quest1/Quest";
import ExampleQuest2 from "./levels/exampleLevel/quest2/Quest";
import Tutorial from "./components/Tutorial";
import LevelOverview from "./components/LevelOverview";

function App(): ReactElement {
	return (
		<BrowserRouter>
			<Navigation />
			<div className="text-center">
				<Switch>
					<Route path="/" exact component={LandingPage} />
					<Route path="/LevelOverview" exact component={LevelOverview} />
					<Route path="/ExampleQuest1" exact component={ExampleQuest1} />
					<Route path="/ExampleQuest2" exact component={ExampleQuest2} />
					<Route path="/Tutorial" exact component={Tutorial} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
