import "phaser";
import { error, log } from "../logger";
import { GameConfig, controlType, character } from "./GameConfig";

let settings: GameConfig;
let inputData: { y: number }[];
// inputDataCopy is a copy of inputData when the game started
let inputDataCopy: { y: number }[];
let positionHistory: number[] = [];

// moveCamRight & moveCamLeft are true if the move camera buttons are clicked
let moveCamRight: boolean;
let moveCamLeft: boolean;
let moveCamUp: boolean;
let moveCamDown: boolean;

// cameraRide is true as long as the cameraRide is not finished.
let cameraRide: boolean;
let cameraRideIndex: number;
let cameraWait: number;

let gameEndModal: (
	goal: boolean,
	trap: boolean,
	terrainTrap: boolean,
	requiredTime: number,
	bonusPoints: number,
	maxBonusPoints: number,
	metersWalked: number,
	restart: () => void
) => void;
let restartCalled: (requiredTime: number, bonusPoints: number, metersWalked: number) => void;
let graphProgress: (x: number) => void;
let updateGameState: (state: "ready" | "running" | "ended" | "restarting") => void;

// variables for t_v_graph controls
let timeStamp: number | undefined;
let index: number;

export default class Game extends Phaser.Scene {
	/**
	 * @param {gameSettings} settings - settings for phaser
	 * @param Array data - movement data for controls
	 * @param function gameEnded - function that will be called when the game ended
	 */
	constructor(
		gameSettings: GameConfig,
		data: { y: number }[],
		gameEnded: (
			goal: boolean,
			trap: boolean,
			terrainTrap: boolean,
			requiredTime: number,
			bonusPoints: number,
			maxBonusPoints: number,
			metersWalked: number,
			restart: () => void
		) => void,
		notifyRestartCalled: (
			requiredTime: number,
			bonusPoints: number,
			metersWalked: number
		) => void,
		setGraphProgress: (x: number) => void,
		setGameState: (state: "ready" | "running" | "ended" | "restarting") => void
	) {
		super("Game");
		log("%cInitiated new Game", "color: green");
		moveCamRight = false;
		moveCamLeft = false;
		moveCamUp = false;
		moveCamDown = false;
		cameraRide = false;
		cameraRideIndex = 0;
		cameraWait = 0;
		graphProgress = setGraphProgress;
		timeStamp = undefined;
		index = 0;
		updateGameState = setGameState;
		this.gameRunning = false;

		settings = gameSettings;
		inputData = data;
		gameEndModal = gameEnded;
		restartCalled = notifyRestartCalled;

		this.variables = new Map();
	}

	/**
	 * In this map any used objects, variables or anything else used inside the configs can be saved for later use.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public variables: Map<string, any>;

	public player!: Phaser.Physics.Arcade.Sprite;
	public cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

	/**
	 * Physics group for all static objects that should collide with the Player.
	 *
	 * Add ground, walls, platforms etc. to this group by using `this.platforms.create(x, y, key)`.
	 * See `create()` for more information.
	 */
	public platforms!: Phaser.Physics.Arcade.StaticGroup;

	/**
	 * Physics group for all static objects that end (lose) the game if the player collides with them.
	 *
	 * The difference between `staticTraps` and `terrainTraps` is the message that will be shown after
	 * the player collides with the trap.
	 *
	 * Add traps to this group by using `this.staticTraps.create(x, y, key)`.
	 * See `create()` for more information.
	 */
	public staticTraps!: Phaser.Physics.Arcade.StaticGroup;

	/**
	 * Physics group for all dynamic objects that end (lose) the game if the player collides with them.
	 *
	 * Add traps to this group by using `this.dynamicTraps.create(x, y, key)`.
	 * See `create()` for more information.
	 */
	public dynamicTraps!: Phaser.Physics.Arcade.Group;

	/**
	 * Physics group for all static objects that end (lose) the game if the player collides with them.
	 *
	 * The difference between `staticTraps` and `terrainTraps` is the message that will be shown after
	 * the player collides with the trap.
	 *
	 * Add traps to this group by using `this.dynamicTraps.create(x, y, key)`.
	 * See `create()` for more information.
	 */
	public terrainTraps!: Phaser.Physics.Arcade.StaticGroup;

	/**
	 * Physics group for all static objects that end (win) the game if the player collides with them.
	 *
	 * Add goals to this group by using `this.staticGoals.create(x, y, key)`.
	 * See `create()` for more information.
	 */
	public staticGoals!: Phaser.Physics.Arcade.StaticGroup;

	/**
	 * Physics group for all dynamic objects that end (win) the game if the player collides with them.
	 *
	 * Add goals to this group by using `this.dynamicGoals.create(x, y, key)`.
	 * See `create()` for more information.
	 */
	public dynamicGoals!: Phaser.Physics.Arcade.Group;

	/**
	 * Physics group for all objects that can be collected by the player to add points to the score.
	 * The logic for collection the object, making it invisible and adding points to `this.score`
	 * are already implemented for every object you add.
	 *
	 * Add points to this group by using `this.points.create(x, y, key)`.
	 * See `create()` for more information.
	 */
	public points!: Phaser.Physics.Arcade.Group;
	public score!: number;

	/**
	 * A flag that is set to true if the game is currently running.
	 *
	 * This can be used in onUpdate to check whether the game is still running or not.
	 */
	public gameRunning = false;

	/**
	 * collectedGoal is true if the player collided with a object in staticGoals or dynamicGoals.
	 */
	public collectedGoal = false;

	/**
	 * Applies a random bounce to all members of a physics group.
	 *
	 * @param group physics group the bounce should be applied to
	 */
	public static setRandomBounce(group: Phaser.Physics.Arcade.Group): void {
		group.children.iterate((c) => {
			const child = (c as unknown) as Phaser.Physics.Arcade.Body;
			child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.5));
		});
	}

	config = {
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		scale: {
			mode: Phaser.Scale.RESIZE
		},
		physics: {
			default: "arcade",
			arcade: {
				gravity: { y: 300 },
				debug: true
			}
		},
		parent: "gameDestination",
		scene: {
			preload: this.preload,
			create: this.create,
			update: this.update
		}
	};

	preload(): void {
		// Load character spritesheet-s
		loadCharacter.call(this);

		if (settings.onPreload) {
			settings.onPreload.call(this);
		}
	}

	create(): void {
		this.variables = new Map();
		if (settings.preCreate) {
			settings.preCreate.call(this);
		}

		// check if a cameraRide is requested
		if (settings.cameraRide) {
			cameraRide = true;

			// Add the origin to the end of the cameraRide
			settings.cameraRide.push({
				x: 0,
				y: 0,
				wait: 0
			});
		}

		// restart the scene after a fade out
		this.cameras.main.on(
			"camerafadeoutcomplete",
			() => {
				this.scene.restart();
			},
			this
		);

		this.physics.world.bounds.setSize(settings.gameWorld.width, settings.gameWorld.height);
		this.cameras.main.setBounds(0, 0, settings.gameWorld.width, settings.gameWorld.height);

		// Load the start, restart and camera buttons
		loadExternalButtons.call(this);

		this.cursors = this.input.keyboard.createCursorKeys();

		// Add platforms / ground
		this.platforms = this.physics.add.staticGroup();

		// Add player
		if (settings.characterSpawnXY) {
			this.player = this.physics.add.sprite(
				settings.characterSpawnXY.x,
				settings.characterSpawnXY.y,
				"characterWalkRight",
				0
			);
		} else {
			this.player = this.physics.add.sprite(100, 400, "characterWalkRight", 0);
		}
		this.player.setBounce(0.15);
		// this.player.setScale(2.7);
		this.player.setCollideWorldBounds(true);
		this.physics.add.collider(this.player, this.platforms);

		// this.cameras.main.startFollow(this.player, true);

		// Load character animations
		loadCharacterAnimations.call(this);

		// Add points
		this.points = this.physics.add.group();
		this.physics.add.collider(this.points, this.platforms);

		// collect points
		this.score = 0;
		this.physics.add.overlap(
			this.player,
			this.points,
			(player: Phaser.GameObjects.GameObject, point: Phaser.GameObjects.GameObject) => {
				const p = point as Phaser.Physics.Arcade.Image;
				p.disableBody(true, true);
				this.score++;
			},
			undefined,
			this
		);

		// Add static traps
		this.staticTraps = this.physics.add.staticGroup();
		this.physics.add.overlap(this.player, this.staticTraps, collideWithTrap, undefined, this);

		// Add dynamic traps
		this.dynamicTraps = this.physics.add.group();
		this.physics.add.overlap(this.player, this.dynamicTraps, collideWithTrap, undefined, this);
		this.physics.add.collider(this.dynamicTraps, this.platforms);

		// Add terrain traps
		this.terrainTraps = this.physics.add.staticGroup();
		this.physics.add.overlap(
			this.player,
			this.terrainTraps,
			collideWithTerrainTrap,
			undefined,
			this
		);

		// Add static goals
		this.staticGoals = this.physics.add.staticGroup();
		this.physics.add.overlap(this.player, this.staticGoals, collectGoal, undefined, this);

		// Add dynamic goals
		this.dynamicGoals = this.physics.add.group();
		this.physics.add.overlap(this.player, this.dynamicGoals, collectGoal, undefined, this);
		this.physics.add.collider(this.dynamicGoals, this.platforms);

		if (settings.afterCreate) {
			settings.afterCreate.call(this);
		}

		addMeterRule.call(this);
	}

	update(): void {
		if (cameraRide) {
			cameraRideFunc.call(this);
			return;
		}

		if (this.gameRunning) {
			loadControls.call(this);
		} else {
			// Game is not yet started, stay idle
			this.player.setVelocityX(0);
			this.player.anims.play("idle", true);

			// camera if game is not running
			if (moveCamRight || this.cursors.right?.isDown) {
				this.cameras.main.scrollX += 5;
			} else if (moveCamLeft || this.cursors.left?.isDown) {
				this.cameras.main.scrollX -= 5;
			}

			if (moveCamUp || this.cursors.up?.isDown) {
				this.cameras.main.scrollY -= 5;
			} else if (moveCamDown || this.cursors.down?.isDown) {
				this.cameras.main.scrollY += 5;
			}
		}

		if (settings.onUpdate) {
			settings.onUpdate.call(this);
		}
	}

	game = new Phaser.Game(this.config);
}

/**
 * Executes the camera ride for a Game. Needs to be called from within the update function
 */
const cameraRideFunc = function cameraRideFunc(this: Game) {
	if (!settings.cameraRide) {
		return;
	}

	if (cameraRideIndex >= settings.cameraRide.length) {
		// Ends the camera ride
		cameraRide = false;
		log("%cFinished cameraRide", "color: green");
		return;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const canvasWidth = document.getElementById("gameDestination")?.firstChild.width;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const canvasHeight = document.getElementById("gameDestination")?.firstChild.height;

	const xUnreachable: boolean =
		settings.cameraRide[cameraRideIndex].x + canvasWidth > settings.gameWorld.width &&
		this.cameras.main.scrollX + canvasWidth + 5 > settings.gameWorld.width;

	const yUnreachable: boolean =
		settings.cameraRide[cameraRideIndex].y + canvasHeight > settings.gameWorld.height &&
		this.cameras.main.scrollY + canvasHeight + 5 > settings.gameWorld.height;

	const xReached: boolean =
		Math.abs(settings.cameraRide[cameraRideIndex].x - this.cameras.main.scrollX) <= 5;

	const yReached: boolean =
		Math.abs(settings.cameraRide[cameraRideIndex].y - this.cameras.main.scrollY) <= 5;

	// check if we reached the next x coordinate
	if ((xReached && yReached) || cameraWait > 0) {
		if (cameraWait === 0) {
			// set waiting time
			cameraWait = new Date().getTime() + settings.cameraRide[cameraRideIndex].wait;
			return;
		}

		if (new Date().getTime() > cameraWait) {
			// waiting time over
			cameraWait = 0;
			cameraRideIndex++;
		}
		return;
	}

	let error = false;
	// check if the current x value can be reached
	if (xUnreachable && (yReached || yUnreachable)) {
		// value unreachable because it is outside the game bounds
		log(
			"%cWARNING:\nThe x coordinate " +
				settings.cameraRide[cameraRideIndex].x +
				" is outside of the game bounds.\nMax x value with the current window size is: " +
				(settings.gameWorld.width - canvasWidth) +
				". This value depends on the size of the game canvas!",
			"color: orange"
		);
		error = true;
	}

	// check if the current y value can be reached
	if (yUnreachable && (xReached || xUnreachable)) {
		// value unreachable because it is outside the game bounds
		log(
			"%cWARNING:\nThe y coordinate " +
				settings.cameraRide[cameraRideIndex].y +
				" is outside of the game bounds.\nMax y value size is: " +
				(settings.gameWorld.height - canvasHeight),
			"color: orange"
		);
		error = true;
	}

	if (error) {
		// set waiting time
		cameraWait = new Date().getTime() + settings.cameraRide[cameraRideIndex].wait;
		return;
	}

	// move along the x axis
	if (!xReached) {
		if (this.cameras.main.scrollX < settings.cameraRide[cameraRideIndex].x) {
			this.cameras.main.scrollX += 3;
		} else if (this.cameras.main.scrollX > settings.cameraRide[cameraRideIndex].x) {
			this.cameras.main.scrollX -= 3;
		}
	}

	// move along the y axis
	if (!yReached) {
		if (this.cameras.main.scrollY < settings.cameraRide[cameraRideIndex].y) {
			this.cameras.main.scrollY += 3;
		} else if (this.cameras.main.scrollY > settings.cameraRide[cameraRideIndex].y) {
			this.cameras.main.scrollY -= 3;
		}
	}
};

/**
 * loads all necessary sprite seeds for the selected character (in settings).
 *
 * Must be called in preload.
 *
 * For each character, this function provides the following spritesheet-s:
 * - "characterIdle"
 * - "characterWalk"
 * - TODO: more spritesheet-s
 */
const loadCharacter = function loadCharacter(this: Game) {
	// TODO select correct character using the character enum in settings (as soon as we have more than one character)

	this.load.spritesheet("characterIdle", "assets/character/IdleAdjusted.png", {
		frameWidth: 64,
		frameHeight: 100
	}); // 6 frames

	this.load.spritesheet("characterWalkRight", "assets/character/WalkRightAdjusted.png", {
		frameWidth: 64,
		frameHeight: 96
	}); // 8 frames

	this.load.spritesheet("characterWalkLeft", "assets/character/WalkLeftAdjusted.png", {
		frameWidth: 64,
		frameHeight: 96
	}); // 8 frames
};

/**
 * Creates all necessary character animations.
 *
 * Must be called in create.
 *
 * For each character, this function provides the following animations:
 * - "idle"
 * - "right"
 * - "left"
 * - TODO: more animations
 */
const loadCharacterAnimations = function loadCharacterAnimations(this: Game) {
	// TODO select correct character using the character enum in settings (as soon as we have more than one character)

	this.anims.create({
		key: "idle",
		frames: this.anims.generateFrameNumbers("characterIdle", {
			start: 0,
			end: 5
		}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: "right",
		frames: this.anims.generateFrameNumbers("characterWalkRight", {
			start: 0,
			end: 7
		}),
		frameRate: 8,
		repeat: -1
	});

	this.anims.create({
		key: "left",
		frames: this.anims.generateFrameNumbers("characterWalkLeft", {
			start: 0,
			end: 7
		}),
		frameRate: 8,
		repeat: -1
	});
};

/**
 * Loads the in setting.controls defined controls.
 */
const loadControls = function loadControls(this: Game) {
	if (!this.gameRunning) {
		return;
	}

	// TODO add more controls
	switch (settings.controls) {
		case controlType.t_v_graph: {
			diagram_controls.call(this, true);
			break;
		}
		case controlType.t_x_graph: {
			diagram_controls.call(this, false);
			break;
		}
	}

	// Does not load any controls if settings.controls is "none"
};

/**
 * Graph Controls
 *
 * @param t_v - if true, t-v-controls (time-velocity) are loaded, otherwise t-x (time-place) controls are loaded
 */
const diagram_controls = function t_v_controls(this: Game, t_v: boolean): void {
	if (timeStamp == undefined) {
		timeStamp = new Date().getTime();
	}

	// Increase index every second
	const time = new Date().getTime();
	let timeDiff = time - timeStamp;
	if (timeDiff > 1000) {
		positionHistory.push(this.player.x);
		index++;

		// end the game if all datapoints are processed
		if (index >= inputDataCopy.length - 1 || checkForEarlyEnd.call(this, t_v)) {
			if (!t_v) {
				// Set final position
				this.player.x = inputDataCopy[index].y * 50;
			}
			this.player.setVelocityX(0);
			this.player.anims.play("idle", true);

			// End the game by calling the function passed in from GameComponent
			graphProgress(index + 0.01);
			endGame.call(this);

			return;
		}

		timeStamp = time;
		timeDiff = 0;
	}

	const progress = timeDiff / 1000;
	let input =
		inputDataCopy[index].y + progress * (inputDataCopy[index + 1].y - inputDataCopy[index].y);

	// set progress in graph
	graphProgress(index + progress);

	// Scale up to meters: 1m = 50px.
	input *= 50;
	if (t_v) {
		this.player.setVelocityX(input);

		if (input === 0) {
			this.player.anims.play("idle", true);
		} else if (input > 0) {
			this.player.anims.play("right", true);
		} else {
			this.player.anims.play("left", true);
		}
	} else {
		// Check if input position is at the left corner, avoids character clipping out of the game
		input = input > 32 ? input : 32;
		// Check if input position is at the right corner, avoids character clipping out of the game
		input = input <= settings.gameWorld.width - 32 ? input : settings.gameWorld.width - 32;

		if (this.player.x === input) {
			this.player.anims.play("idle", true);
		} else if (this.player.x < input) {
			this.player.anims.play("right", true);
		} else {
			this.player.anims.play("left", true);
		}

		this.player.x = input;
	}
};

/**
 * Test if the game can early.
 * The game ends early if a goal is collected or enough bonuspoints are collected and no further movement is planned
 *
 * @param t_v  - if true, t-v-controls (time-velocity) are assumed, otherwise t-x (time-place) controls
 */
function checkForEarlyEnd(this: Game, t_v: boolean): boolean {
	if (!this.collectedGoal && !(settings.pointsToWin && this.score >= settings.pointsToWin)) {
		return false;
	}

	if (t_v) {
		let sumToRight = 0;
		for (let i = index; i < inputDataCopy.length; i++) {
			sumToRight += inputDataCopy[i].y;
		}
		return sumToRight === 0;
	} else {
		for (let i = index; i < inputDataCopy.length; i++) {
			if (inputDataCopy[index].y !== inputDataCopy[i].y) {
				return false;
			}
		}
		return true;
	}
}

/**
 * Restarts the game
 */
const restartGame = function restartGame(this: Game): void {
	this.gameRunning = false;
	restartCalled(index, this.score, getMetersWalked.call(this));
	updateGameState("restarting");
	const fadeOutTime = 1500;

	setTimeout(function () {
		updateGameState("ready");
		if (settings.cameraRide) {
			cameraRide = true;
			cameraRideIndex = 0;
			cameraWait = 0;
		}
	}, fadeOutTime);

	graphProgress(0);
	index = 0;
	this.cameras.main.fade(fadeOutTime, 255, 255, 255);
};

/**
 * Ends The game and evaluates the result
 */
const endGame = function endGame(this: Game): void {
	if (this.gameRunning) {
		updateGameState("ended");
		this.gameRunning = false;
		this.player.setVelocityX(0);
		this.player.anims.play("idle", true);

		gameEndModal(
			this.collectedGoal,
			false,
			false,
			index,
			this.score,
			getMaxBonusPoints.call(this),
			getMetersWalked.call(this),
			restartGame.bind(this)
		);
	}
};

/**
 * This function gets called when the player collides with a trap.
 */
const collideWithTrap = function collideWithTrap(this: Game) {
	if (this.gameRunning) {
		updateGameState("ended");
		this.gameRunning = false;
		this.player.setVelocityX(0);
		this.player.anims.play("idle", true);

		gameEndModal(
			this.collectedGoal,
			true,
			false,
			index,
			this.score,
			getMaxBonusPoints.call(this),
			getMetersWalked.call(this),
			restartGame.bind(this)
		);
	}
};

const collideWithTerrainTrap = function collideWithTerrainTrap(this: Game) {
	if (this.gameRunning) {
		updateGameState("ended");
		this.gameRunning = false;
		this.player.setVelocityX(0);
		this.player.anims.play("idle", true);

		gameEndModal(
			this.collectedGoal,
			false,
			true,
			index,
			this.score,
			getMaxBonusPoints.call(this),
			getMetersWalked.call(this),
			restartGame.bind(this)
		);
	}
};

/**
 * Calculates the total distance the player walked in meters
 */
const getMetersWalked = function getMetersWalked(this: Game): number {
	let distance = 0;
	if (settings.controls == controlType.t_x_graph) {
		// Accurate calculation for t_x graph
		if (index < inputDataCopy.length - 1) {
			// In this case we have an early ending but we still want to count the last few meters
			distance = Math.abs(this.player.x / 50 - inputDataCopy[index].y);
		}
		for (let i = 1; i <= index; i++) {
			distance += Math.abs(inputDataCopy[i].y - inputDataCopy[i - 1].y);
		}
		return distance;
	}

	if (index < inputDataCopy.length - 1) {
		// In this case we have an early ending but we still want to count the last few meters
		distance = Math.abs(this.player.x - positionHistory[index]);
	}

	// A less accurate approximation for t-v controls.
	// There is a slight error in this calculation, because the positions are slightly off
	for (let i = 1; i <= index; i++) {
		distance += Math.abs(positionHistory[i] - positionHistory[i - 1]);
	}
	return distance / 50;
};

/**
 * Gets the amount of bonus points in the level
 */
const getMaxBonusPoints = function getMaxBonusPoints(this: Game): number {
	return this.points.getLength();
};

/**
 * Starts the game
 */
const startGame = function startGame(this: Game) {
	// check if game is already running
	if (this.gameRunning) {
		return;
	}

	// Stop cameraRide
	cameraRide = false;

	// Clone the array and the objects within
	inputDataCopy = [];
	for (let i = 0; i < inputData.length; i++) {
		inputDataCopy.push({ y: inputData[i].y });
	}
	positionHistory = [this.player.x];

	// Start game
	updateGameState("running");
	this.gameRunning = true;
	this.cameras.main.startFollow(this.player, true);
	timeStamp = new Date().getTime();

	if (settings.onStart) {
		settings.onStart.call(this);
	}
};

/**
 * Gets called when the player collides with a goal
 *
 * @param player the player
 * @param goal the goal the player collides with
 */
const collectGoal = function collectGoal(
	this: Game,
	player: Phaser.GameObjects.GameObject,
	goal: Phaser.GameObjects.GameObject
): void {
	this.collectedGoal = true;
	const g = goal as Phaser.Physics.Arcade.Image;
	g.setAlpha(0.5);
};

/**
 * Adds a meter rule to the bottom of the game
 */
const addMeterRule = function addMeterRule(this: Game) {
	let size;
	settings.meterColor = settings.meterColor ? settings.meterColor : "black";
	settings.meterStroke = settings.meterStroke ? settings.meterStroke : 7;

	for (let i = 0; i < settings.gameWorld.width / 50; i++) {
		if (i % 5 == 0) {
			size = 20;
			this.add
				.text(10 + 50 * i, settings.gameWorld.height - 25, i + "m", {
					fontSize: "15px",
					strokeThickness: settings.meterStroke,
					color: settings.meterColor
				})
				.setOrigin(0.3, 0);
		} else {
			size = 12;
		}

		this.add.text(10 + 50 * i, settings.gameWorld.height - 47, "|", {
			fontSize: size + "px",
			color: settings.meterColor
		});
	}
};

/**
 * Loads the logic for all external buttons
 */
const loadExternalButtons = function loadExternalButtons(this: Game) {
	// Add the restart scene button, if it exists
	const restartBtn = document.getElementById("restartGameBtn");
	if (restartBtn) {
		restartBtn.addEventListener("click", () => {
			restartGame.call(this);
		});
	} else {
		error("restartGameBtn not found!");
	}

	// Add the start game button
	const startBtn = document.getElementById("startGameBtn");
	if (startBtn) {
		startBtn.addEventListener("click", () => {
			startGame.call(this);
		});
	} else {
		error("startGameBtn not found!");
	}

	// Add camera buttons
	addEvents(["mousedown", "touchstart"], "cameraRightBtn", () => {
		cameraRide = false;
		moveCamRight = true;
	});

	addEvents(["mouseup", "touchend"], "cameraRightBtn", () => {
		moveCamRight = false;
	});

	addEvents(["mousedown", "touchstart"], "cameraLeftBtn", () => {
		cameraRide = false;
		moveCamLeft = true;
	});

	addEvents(["mouseup", "touchend"], "cameraLeftBtn", () => {
		moveCamLeft = false;
	});

	addEvents(["mousedown", "touchstart"], "cameraUpBtn", () => {
		cameraRide = false;
		moveCamUp = true;
	});

	addEvents(["mouseup", "touchend"], "cameraUpBtn", () => {
		moveCamUp = false;
	});

	addEvents(["mousedown", "touchstart"], "cameraDownBtn", () => {
		cameraRide = false;
		moveCamDown = true;
	});

	addEvents(["mouseup", "touchend"], "cameraDownBtn", () => {
		moveCamDown = false;
	});

	// Adds the given function for all given events to the element with the given id
	function addEvents(events: string[], buttonId: string, action: () => void): void {
		const btn = document.getElementById(buttonId);
		if (btn) {
			events.forEach((event) => {
				btn.addEventListener(event, action);
			});
		} else {
			error(buttonId + " not found!");
		}
	}
};
