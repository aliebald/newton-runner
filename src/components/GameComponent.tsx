import React, { ReactElement, useEffect, useState } from "react";
import Game from "../GameLogic/game";
import { GameConfig } from "../GameLogic/GameConfig";

export default function GameComponent(props: {
	settings: GameConfig;
	data: { y: number }[];
}): ReactElement {
	const [game, setGame] = useState<Game | undefined>(undefined);

	useEffect(() => {
		if (game == undefined) {
			setGame(new Game(props.settings, props.data));
		}
	});

	return <div id="gameDestination"></div>;
}
