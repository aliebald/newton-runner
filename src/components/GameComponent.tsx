import React, { ReactElement } from "react";
import Game from "../GameLogic/game";
import { GameConfig } from "../GameLogic/GameConfig";

export default class GameComponent extends React.Component<{ settings: GameConfig }> {
	render(): ReactElement {
		return <div id="gameDestination"></div>;
	}

	componentDidMount(): void {
		const game = new Game(this.props.settings);
	}
}
