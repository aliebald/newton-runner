import "phaser";
import { GameConfig, controlType, character } from "./GameConfig";

let settings: GameConfig;
let start: () => boolean;

export default class Game extends Phaser.Scene {
	/**
	 * @param {gameSettings} settings - settings for phaser
	 */
	constructor(gameSettings: GameConfig, data: Array<number>, started: () => boolean) {
		super("Game");
		settings = gameSettings;
		start = started;
	}

	// private settings: gameSettings;

	public player!: Phaser.Physics.Arcade.Sprite;
	public cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	public stars!: Phaser.Physics.Arcade.Group;
	public platforms!: Phaser.Physics.Arcade.StaticGroup;
	public score!: number;
	private scoreText!: Phaser.GameObjects.Text;

	config = {
		type: Phaser.AUTO,
		width: 800,
		height: 600,
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

		this.physics.world.bounds.setSize(settings.gameWorld.width, settings.gameWorld.height);
		this.cameras.main.setBounds(0, 0, settings.gameWorld.width, settings.gameWorld.height);

		this.cursors = this.input.keyboard.createCursorKeys();

		// Add platforms / ground
		this.platforms = this.physics.add.staticGroup();

		// Add player
		this.player = this.physics.add.sprite(100, 450, "characterWalk", 0);
		this.player.setBounce(0.15);
		this.player.setScale(2.7);
		this.player.setCollideWorldBounds(true);
		this.physics.add.collider(this.player, this.platforms);

		this.cameras.main.startFollow(this.player, true);
		// this.cameras.main.setZoom(2);

		// Load character animations
		loadCharacterAnimations.call(this);

		// Add stars
		this.stars = this.physics.add.group();
		this.physics.add.collider(this.stars, this.platforms);

		// collect stars
		this.score = 0;
		this.physics.add.overlap(
			this.player,
			this.stars,
			(player: Phaser.GameObjects.GameObject, star: Phaser.GameObjects.GameObject) => {
				console.log("collectStar()");
				const s = star as Phaser.Physics.Arcade.Image;
				s.disableBody(true, true);
				this.score += 10;
				this.scoreText.setText("Score: " + this.score);
			},
			undefined,
			this
		);

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
		console.log(start());
		if (start()) {
			loadControls.call(this);

			if (settings.onUpdate) {
				settings.onUpdate.call(this);
			}
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

	if (settings.controls === controlType.arrowKeys) {
		// Arrow keys control. Intended for debugging and development only
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

	// Does not load any controls if settings.controls is "none"
};
