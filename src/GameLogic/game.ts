import "phaser";
import { GameConfig, controlType, character } from "./GameConfig";

let settings: GameConfig;
let inputData: Array<{ y: number }>;

export default class Game extends Phaser.Scene {
	/**
	 * @param {gameSettings} settings - settings for phaser
	 */
	constructor(gameSettings: GameConfig, data: Array<{ y: number }>) {
		super("Game");
		settings = gameSettings;
		inputData = data;
	}

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
	private scoreText!: Phaser.GameObjects.Text;

	/**
	 * A flag that is set to true if the game is currently running.
	 *
	 * This can be used in onUpdate to check whether the game is still running or not.
	 */
	public gameRunning = false;

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
		console.log("Called preload()");

		// Load character spritesheet-s
		loadCharacter.call(this);

		if (settings.onPreload) {
			settings.onPreload.call(this);
		}
	}

	create(): void {
		if (settings.preCreate) {
			settings.preCreate.call(this);
		}

		// restart the scene after a fade out
		this.cameras.main.on(
			"camerafadeoutcomplete",
			() => {
				this.scene.restart();
			},
			this
		);

		// Add the restart scene button, if it exists
		const restartBtn = document.getElementById("restartGameBtn");
		if (restartBtn) {
			restartBtn.addEventListener("click", (e: Event) => {
				restartGame.call(this);
			});
		} else {
			console.log("WARNING: restartGameBtn not found!");
		}

		// Add the start game button
		const startBtn = document.getElementById("startGameBtn");
		if (startBtn) {
			startBtn.addEventListener("click", (e: Event) => {
				timeStamp = new Date().getTime();
				this.gameRunning = true;
			});
		} else {
			console.log("WARNING: startGameBtn not found!");
		}

		this.physics.world.bounds.setSize(settings.gameWorld.width, settings.gameWorld.height);
		this.cameras.main.setBounds(0, 0, settings.gameWorld.width, settings.gameWorld.height);

		this.cursors = this.input.keyboard.createCursorKeys();

		// Add platforms / ground
		this.platforms = this.physics.add.staticGroup();

		// Add player
		if (settings.characterSpawnXY) {
			this.player = this.physics.add.sprite(
				settings.characterSpawnXY.x,
				settings.characterSpawnXY.y,
				"characterWalk",
				0
			);
		} else {
			this.player = this.physics.add.sprite(100, 450, "characterWalk", 0);
		}
		this.player.setBounce(0.15);
		this.player.setScale(2.7);
		this.player.setCollideWorldBounds(true);
		this.physics.add.collider(this.player, this.platforms);

		this.cameras.main.startFollow(this.player, true);
		// this.cameras.main.setZoom(2);

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
				console.log("collectPoint()");
				const p = point as Phaser.Physics.Arcade.Image;
				p.disableBody(true, true);
				this.score += 10;
				this.scoreText.setText("Score: " + this.score);
			},
			undefined,
			this
		);

		// Add static traps
		this.staticTraps = this.physics.add.staticGroup();
		this.physics.add.overlap(
			this.player,
			this.staticTraps,
			(player: Phaser.GameObjects.GameObject, trap: Phaser.GameObjects.GameObject) => {
				loseGame.call(this, player, trap);
			},
			undefined,
			this
		);

		// Add dynamic traps
		this.dynamicTraps = this.physics.add.group();
		this.physics.add.overlap(
			this.player,
			this.dynamicTraps,
			(player: Phaser.GameObjects.GameObject, trap: Phaser.GameObjects.GameObject) => {
				loseGame.call(this, player, trap);
			},
			undefined,
			this
		);
		this.physics.add.collider(this.dynamicTraps, this.platforms);

		// Add static goals
		this.staticGoals = this.physics.add.staticGroup();
		this.physics.add.overlap(this.player, this.staticGoals, winGame, undefined, this);

		// Add dynamic goals
		this.dynamicGoals = this.physics.add.group();
		this.physics.add.overlap(
			this.player,
			this.dynamicGoals,
			(player: Phaser.GameObjects.GameObject, trap: Phaser.GameObjects.GameObject) => {
				loseGame.call(this, player, trap);
			},
			undefined,
			this
		);
		this.physics.add.collider(this.dynamicGoals, this.platforms);

		// score
		this.scoreText = this.add.text(16, 16, "Score: 0", {
			fontSize: "32px",
			fill: "#000"
		});

		if (settings.afterCreate) {
			settings.afterCreate.call(this);
		}
	}

	update(): void {
		if (this.gameRunning) {
			loadControls.call(this);
		} else {
			// Game is not yet started, stay idle
			this.player.setVelocityX(0);
			this.player.anims.play("idle", true);
		}

		if (settings.onUpdate) {
			settings.onUpdate.call(this);
		}
	}

	game = new Phaser.Game(this.config);
}

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

	this.load.spritesheet("characterIdle", "assets/character/Idle.png", {
		frameWidth: 32,
		frameHeight: 32
	}); // 6 frames

	this.load.spritesheet("characterWalk", "assets/character/Walk.png", {
		frameWidth: 32,
		frameHeight: 32
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
		frames: this.anims.generateFrameNumbers("characterWalk", {
			start: 0,
			end: 7
		}),
		frameRate: 10,
		repeat: -1
	});
};

/**
 * Loads the in setting.controls defined controls.
 */
const loadControls = function loadControls(this: Game) {
	// TODO add more controls

	switch (settings.controls) {
		case controlType.t_v_graph: {
			t_v_controls.call(this, false);
			break;
		}

		case controlType.t_v_graph_interpolated: {
			t_v_controls.call(this, true);
			break;
		}

		// Arrow keys control. Intended for debugging and development only
		case controlType.arrowKeys: {
			if (this.cursors.left?.isDown) {
				this.player.setVelocityX(-220);
				this.player.anims.play("right", true);
			} else if (this.cursors.right?.isDown) {
				this.player.setVelocityX(220);
				this.player.anims.play("right", true);
			} else {
				this.player.setVelocityX(0);
				this.player.anims.play("idle", true);
			}

			if (this.cursors.up?.isDown && this.player.body.touching.down) {
				this.player.setVelocityY(-330);
			}
		}
	}

	// Does not load any controls if settings.controls is "none"
};

// variables for t_v_graph controls
let timeStamp: number;
let index = 0;

/**
 * T-V-Graph Controls
 *
 * If interpolate is true, the current speed will depend on the current and next datapoint (linear interpolation).
 * If interpolate is false, the current speed will be the value of the current datapoint.
 * After one second the current datapoint will be set to the next datapoint.
 */
const t_v_controls = function t_v_controls(this: Game, interpolate: boolean): void {
	if (!this.gameRunning) {
		return;
	}

	if (timeStamp == undefined) {
		timeStamp = new Date().getTime();
	}

	// Increase index every second
	const time = new Date().getTime();
	const timeDiff = time - timeStamp;
	if (timeDiff > 1000) {
		index++;
		timeStamp = time;

		// end the game if all datapoints are processed
		if (index >= inputData.length) {
			this.player.setVelocityX(0);
			this.player.anims.play("idle", true);

			winGame.call(this); // TODO: Win or lose?
			this.gameRunning = false;

			return;
		}
	}

	let speed;
	if (index + 1 >= inputData.length || !interpolate) {
		speed = inputData[index].y;
	} else {
		const progress = timeDiff / 1000;
		speed = inputData[index].y + progress * (inputData[index + 1].y - inputData[index].y);
		// speed = (1 - progress) * inputData[index].y + inputData[index + 1].y * progress;
	}

	console.log("inputData[" + index + "] = " + inputData[index].y);

	// Set velocity of player
	this.player.setVelocityX(speed);

	// play correct animation
	if (inputData[index].y > 0) {
		this.player.anims.play("right", true);
	} else {
		this.player.anims.play("idle", true);
	}
};

const restartGame = function restartGame(this: Game): void {
	this.gameRunning = false;
	index = 0;
	this.cameras.main.fade(2000, 255, 255, 255);
};

/**
 * finishes the game by showing the results
 *
 * TODO: implement
 */
const winGame = function winGame(this: Game): void {
	if (this.gameRunning) {
		this.gameRunning = false;
		this.player.setVelocityX(0);
		this.player.anims.play("idle", true);
		console.log("Won");
		alert("Congratulations, you won with " + this.score + " Points!");
	}
};

/**
 * This function gets called when the game is lost.
 *
 * TODO
 */
const loseGame = function loseGame(
	this: Game,
	player: Phaser.GameObjects.GameObject,
	trap: Phaser.GameObjects.GameObject
) {
	if (this.gameRunning) {
		this.gameRunning = false;
		this.player.setVelocityX(0);
		this.player.anims.play("idle", true);
		console.log("LOST");
		if (confirm("you lost the game with " + this.score + " points. Restart?")) {
			restartGame.call(this);
		}
	}
};
