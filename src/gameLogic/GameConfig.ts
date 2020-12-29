import Game from "./game";

/**
 * @typedef {object} gameSettingsType - collection of settings for a (phaser) game. For implementation examples see example levels.
 */
export interface GameConfig {
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
	 * onStart gets executed when the game starts.
	 *
	 * Important: Please be aware that the game can start multiple times, if the player restarts the game.
	 * Make sure to the the function for this case.
	 */
	onStart?: (this: Game) => void;

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
	 * Add all static platforms to this.platforms and all collectable points to this.points
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
	 * Optional
	 *
	 * An array of objects, containing x, y and wait values.
	 *
	 * The game goes through this array when the page loads.
	 * Goes to the given `x`, `y` coordinates and waits for `wait` milliseconds, before moving on to the next coordinates.
	 * The coordinates define the top left corner of the camera.
	 * If the given value is to large, a warning will be logged and the camera will simply move as far as possible into that direction.
	 *
	 * Max x value: game bounds - width of the game canvas (which is responsive)
	 *
	 * Max y value: game bounds - height of the game canvas.
	 */
	cameraRide?: {
		x: number;
		y: number;
		wait: number;
	}[];

	/**
	 * Required
	 *
	 * If controls is not "none", this will add the specified controls to the game.
	 * See controlType enum for more information.
	 */
	controls: controlType;

	/**
	 * Required
	 *
	 * The game automatically loads all necessary sprite sheets (animations) for the selected character.
	 * See character enum for more information.
	 */
	character: character;

	/**
	 * Optional
	 *
	 * Set the spawn coordinates for the player.
	 */
	characterSpawnXY?: {
		x: number;
		y: number;
	};

	/**
	 * Optional
	 *
	 * If the Player has at least `pointsToWin` points at the end of the game (and did not collide with a trap), he win's.
	 * Note that the player also wins if he collects a goal.
	 */
	pointsToWin?: number;

	/**
	 * Optional
	 *
	 * Sets the color of the pocket rule on the bottom of each quest.
	 * If undefined, the color will be black
	 */
	meterColor?: string;

	/**
	 * Optional
	 *
	 * Sets the stroke (white border) of the pocket rule on the bottom of each quest.
	 * 0 will disable the stroke.
	 * If undefined, a standard stroke will be set
	 */
	meterStroke?: number;
}

/**
 * @typedef {object} controlType contains all premade control logic for the game.
 * If you implement your own controls, set this to none.
 *
 * TODO: More control types will be added here
 */
export enum controlType {
	/**
	 * Adds no controls
	 */
	none,

	/**
	 * Adds t-v-graph controls.
	 *
	 * The current speed will be the interpolated value between the current datapoint and the next datapoint.
	 * This means that the speed will not jump from the current value to the next, but slowly rise/lower itself to the next value.
	 *
	 * After one second the current datapoint will be set to the next datapoint.
	 */
	t_v_graph,

	/**
	 * Adds t-x-graph controls.
	 */
	t_x_graph
}

/**
 * @typedef {object} character contains all possible characters.
 * The game automatically loads all necessary sprite sheets (animations) for the selected character.
 *
 * TODO: More characters will be added here
 */
export enum character {
	hiker
}
