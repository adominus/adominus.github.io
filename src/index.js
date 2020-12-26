import Phaser from 'phaser';
import nibblesImg from './assets/nibbles.jpeg';
import bangImg from './assets/bang.png';
import crackerLhsImg from './assets/cracker-lhs.png';
import crackerRhsImg from './assets/cracker-rhs.png';
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
        this.load.image('nibbles', nibblesImg);
        this.load.image('bang', bangImg);
        this.load.image('cracker-lhs', crackerLhsImg);
        this.load.image('cracker-rhs', crackerRhsImg);
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
	const padding = 80;
	let bg = this.add.image(centreX, centreY, 'nibbles');
	bg.setDisplaySize(gameWidth, gameHeight);

        const crackerLhs = this.add.image(400, 150, 'cracker-lhs');
	const crackerHeight = crackerLhs.height / 2;
	const crackerWidth = crackerLhs.width / 2;
	crackerLhs.x = centreX - crackerWidth + padding;
	crackerLhs.y = centreY + crackerHeight - padding;

        const crackerRhs = this.add.image(centreX + crackerWidth - padding, centreY - crackerHeight + padding, 'cracker-rhs');

	const explode1 = this.tweens.add({
			targets: crackerLhs,
			y: 100,
			x: 100,
			duration: 500,
			ease: "Power2",
			paused: true
		});

	const explode2 = this.tweens.add({
			targets: crackerRhs,
			y: game.config.height - 100,
			x: game.config.width - 100,
			duration: 500,
			ease: "Power2",
			paused: true,
			onComplete: this.crackerPopped,
			onCompleteScope: this
		});

	const pow = this.sound.add('pow');

	this.jokes = [
	    'Who\'s Lillith\'s favourite Harry Potter character??\n\nSeverus Snake',
	    'Knock Knock\nWho\'s there?\nNagini\nOh, Slytherin',
	    'Who\'s Nibbler\'s favourite Slade member?\n\nBunny Holder',
	    'Who\'s Archimedes\'s favourite Wham member?\n\nGeorge Meowchael',
	    'What is the Scottish first minister\'s favourite Madonna song?\n\nLike a Sturgeon',
	    'How do weavers communicate during lockdown?\n\nVia Loom',
	    'How does a school of finish communicate during lockdown?\n\nVia Microsoft Breems',
	    'How does Josh communicate with his family during lockdown? \n\nVia Broome',
	];

	this.state = 1;

	this.input.on('pointerup', function () {
		if (this.state == 1) {
		    if (explode1.isPaused) {
			    this.addBang();
			    explode1.play();
			    explode2.play();
			    pow.play();
		    }
		} else if (this.state == 2) {
			let text = this.add.text(100, centreY - 100, this.jokes[jokes_counter++ % this.jokes.length],
				{ font: '50px Arial', fill: 'white', wordWrap: { width: gameWidth - 200 }, align: 'center' , stroke: 'black', strokeThickness: 8});

			this.state = 3
		} else if (this.state == 3) {
			console.log('restart');
			this.scene.restart();
		}
	}, this);

    }

    update () { }

    addBang() {
	    const gameHeight = game.config.height;
	    const gameWidth = game.config.width;
	    const centreX = gameWidth / 2;
	    const centreY = gameHeight / 2;

	    const bang = this.add.image(
			    centreX, 
			    centreY, 'bang');
    }

    crackerPopped(tween, targets) {
	    this.state = 2;
    }
}

let jokes_counter = 0;

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: MyGame
};

const game = new Phaser.Game(config);
