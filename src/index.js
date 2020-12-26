import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import crackerImg from './assets/cracker.jpg';
import powMp3 from './assets/e.mp3';
import powM4a from './assets/e.m4a';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }
	
    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('cracker', crackerImg);
        //this.load.audio('pow', ['https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/audio/SoundEffects/explosion.mp3']);
        //this.load.audio('pow', ['https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/audio/SoundEffects/explode1.wav']);
        this.load.audio('pow', [powMp3, powM4a]);
    }
      
    create ()
    {
	const gameHeight = game.config.height;
	const gameWidth = game.config.width;
	const centreX = gameWidth / 2;
	const centreY = gameHeight / 2;

        const cracker1 = this.add.image(400, 150, 'cracker');
	const crackerHeight = cracker1.height / 2;
	const crackerWidth = cracker1.width / 2;
	cracker1.x = centreX - crackerWidth;
	cracker1.y = centreY - crackerHeight;

        const cracker2 = this.add.image(centreX + crackerWidth, centreY + crackerHeight, 'cracker');

	const explode1 = this.tweens.add({
			targets: cracker1,
			y: 100,
			x: 100,
			duration: 500,
			ease: "Power2",
			paused: true
		});

	const explode2 = this.tweens.add({
			targets: cracker2,
			y: game.config.height - 100,
			x: game.config.width - 100,
			duration: 500,
			ease: "Power2",
			paused: true,
			onComplete: this.crackerPopped,
			onCompleteScope: this
		});

	const pow = this.sound.add('pow');

	this.state = 1;
	let scene = this;

	this.input.on('pointerup', function () {
		if (this.state == 1) {
			if (explode1.isPaused) {
				explode1.play();
				explode2.play();
				pow.play();
			}
		} else if (this.state == 2) {
			this.add.text(100, centreY - 100, 'lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet', 
				{ font: '50px Arial', fill: 'white', wordWrap: { width: gameWidth - 200 }, align: 'center' });

			this.state = 3
		} else if (this.state == 3) {
			console.log('restart');
			this.scene.restart();
		}
	}, this);

    }

    update () { }

	crackerPopped(tween, targets) {
		const gameHeight = game.config.height;
		const gameWidth = game.config.width;
		const centreX = gameWidth / 2;
		const centreY = gameHeight / 2;

        const cracker2 = this.add.image(
			centreX, 
			centreY, 'logo');
	
		this.state = 2;
	}
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: MyGame
};

const game = new Phaser.Game(config);
