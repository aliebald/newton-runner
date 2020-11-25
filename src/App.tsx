import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Quest from "./components/Quest";
import Tutorial from "./components/Tutorial";
import LevelOverview from "./components/LevelOverview";

import exampleQuest1 from "./levels/exampleLevel/quest1/questConfig";
import exampleQuest2 from "./levels/exampleLevel/quest2/questConfig";

function App(): ReactElement {
	return (
		<BrowserRouter>
			<Navigation />
			<div className="text-center">
				<Switch>
					<Route path="/" exact component={LandingPage} />
					<Route path="/LevelOverview" exact component={LevelOverview} />
					<Route
						path="/ExampleQuest1"
						exact
						component={() => <Quest config={exampleQuest1}></Quest>}
					/>
					<Route
						path="/ExampleQuest2"
						exact
						component={() => <Quest config={exampleQuest2}></Quest>}
					/>
					<Route path="/Tutorial" exact component={Tutorial} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
