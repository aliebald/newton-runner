import React, { ReactElement } from "react";
import Game from "../GameLogic/game";
import { gameSettingsType } from "../GameLogic/gameSettingsType";

export default class GameComponent extends React.Component<{ settings: gameSettingsType }> {
	render(): ReactElement {
		return <div id="gameDestination"></div>;
	}

	componentDidMount(): void {
		const game = new Game(this.props.settings);
	}
}
