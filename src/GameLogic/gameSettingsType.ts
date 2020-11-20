import Game from "./game";

export interface gameSettingsType {
	onPreload?: (this: Game) => void;
	preCreate?: (this: Game) => void;
	afterCreate?: (this: Game) => void;
	onUpdate?: (this: Game) => void;
	controls: controlType;
}

/*
 * controlType contains all premade control logic for the game.
 * If you implement your own controls, set this to none.
 *
 * TODO: More control types will be added here
 */
export enum controlType {
	none,
	arrowKeys
}
