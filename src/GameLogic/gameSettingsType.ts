import Game from "./game";

/**
 * @typedef {object} gameSettingsType - collection of settings for a (phaser) game. For implementation examples see example levels.
 */
export interface gameSettingsType {
	/**
	 * Required
	 *
	 * Bounds (height and width) for the game world as well as for the camera
	 */
	gameWorld: {
		height: number;
		width: number;
	};

	/**
	 * Optional
	 *
	 * onPreload gets executed with the preload function of phaser.
	 *
	 * The preload function is the first function that gets executed, before create and update.
	 *
	 * All required Images / Assets should be loaded in this function.
	 */
	onPreload?: (this: Game) => void;

	/**
	 * Optional
	 *
	 * preCreate gets executed at the beginning of the create function of phaser.
	 *
	 * The create function is the second function that gets executed, after preload and before update.
	 *
	 * Only background assets should be loaded here. Initiation of all other assets should be in afterCreate.
	 */
	preCreate?: (this: Game) => void;

	/**
	 * Optional
	 *
	 * afterCreate gets executed at the end of the create function of phaser.
	 *
	 * The create function is the second function that gets executed, after preload and before update.
	 *
	 * Initiation of assets should in this function.
	 * Add all static platforms to this.platforms and all stars to this.stars
	 */
	afterCreate?: (this: Game) => void;

	/**
	 * Optional
	 *
	 * onUpdate gets executed every time the update function of phaser is called. This happens continuously after the game is started.
	 *
	 * All tasks that need to happen continuously throughout the game need to be in onUpdate.
	 *
	 * If controlType is none, onUpdate should also contain some kind of controls (not recommended).
	 */
	onUpdate?: (this: Game) => void;

	/**
	 * Required
	 *
	 * If controls is not "none", this will add the specified controls to the game.
	 * See controlType for more information.
	 */
	controls: controlType;
}

/**
 * @typedef {object} controlType contains all premade control logic for the game.
 * If you implement your own controls, set this to none.
 *
 * TODO: More control types will be added here
 */
export enum controlType {
	none,
	arrowKeys
}
