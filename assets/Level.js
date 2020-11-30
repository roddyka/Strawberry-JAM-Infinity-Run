
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
	
	constructor() {
		super("Level");
		
		/** @type {Phaser.GameObjects.Image} */
		this.bgStreet;
		/** @type {Phaser.GameObjects.Image} */
		this.bgStreet_2;
		/** @type {Phaser.GameObjects.Image} */
		this.player;
		/** @type {Phaser.GameObjects.Image} */
		this.car_black_4;
		/** @type {Phaser.GameObjects.Image} */
		this.motorcycle_black;
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		this.velocityGravity;
		this.colors = ['black', 'blue', 'green', 'red', 'yellow'];
		this.numbers = [1,2,3,4,5];
		this.lastCar = 0;
		this.positionThings = 0;
		this.streetVelocity;
		this.carsPositionY;
		this.carTimeSpawn;
		//health
		this.carDamage;
		//points in KM
		this.kmPoints;

		//time damage
		this.timeDamage = 0;
		this.timeDamageVelocity = 100;

		this.explosion;
		this.exploded = false;

		this.themeSound;
		this.explosionSound;

		this.leftMoveButton;
		this.rightMoveButton;

		//
		this.backgroundImageY;
		this.started;
		this.startAgainButton;
		/* END-USER-CTR-CODE */
	}
	
	create() {
		this.editCreate();
	}
	
	/* START-USER-CODE */

	editCreate(){

		this.musicTheme("on");

		this.startGameScene();
		this.startAgainButton = new MyButton(this, 403, 483, "buttonStart copy");
		this.add.existing(this.startAgainButton);
		this.startAgainButton.setDepth(8);
		this.startAgainButton.setVisible(false);
		
		// cars
		this.cars = this.add.container(0, 0);
		this.explosionContainer = this.add.container(0, 0);

		
		// bgStreet
		const bgStreet = this.add.image(422, -45, "background-1");
		bgStreet.setOrigin(0.5, 0.004559168596958152);
		
		// bgStreet_2
		const bgStreet_2 = this.add.image(422, -692, "background-1");
		bgStreet_2.setOrigin(0.5, 0.004559168596958152);
		
		// car
		const player = this.physics.add.image(421, 437, "motorcycle_black");
		
		// // left
		// this.leftButton = this.add.image(360, 560, "grey_button12");
		// this.leftButton.setInteractive();
		this.leftButton = new MyButton(this, 360, 560, "grey_button12");
		this.add.existing(this.leftButton);
		this.leftButton.setDepth(5);
		
		// // right
		// this.rightButton = this.add.image(487, 560, "grey_button12");
		// this.rightButton.setInteractive();
		this.rightButton = new MyButton(this, 487, 560, "grey_button12");
		this.add.existing(this.rightButton);
		this.rightButton.setDepth(5);


		
		// forward
		const forward = this.add.image(486, 559, "forward");
		forward.setDepth(6);
		
		// forward_1
		const forward_1 = this.add.image(359, 559, "forward");
		forward_1.flipX = true;
		forward_1.setDepth(6);

		// car_black_4
		//const car_black_4 = this.physics.add.image(0, 0, "car_black_4");
		
		
		// // meteorBrown_big1
		// this.add.image(485, 224, "meteorBrown_big1");
		
		// // meteorGrey_big2
		// this.add.image(601, 64, "meteorGrey_big2");
		
		
		this.bgStreet = bgStreet;
		this.bgStreet_2 = bgStreet_2;
		this.player = player;
		//this.car_black_4 = car_black_4;

		this.player.setCollideWorldBounds(true);
		this.cursors = this.input.keyboard.createCursorKeys();

		//this.cars.add(this.car_black_4);
		
		// position car
		this.position = 0;	
		
		this.cars.setDepth(3);			
		
		//background velocity
		
		this.carsPositionY = -300;
		this.streetVelocity = 5;
		this.velocityGravity = 500;
		this.carTimeSpawn = 5000;

		this.kmPoints = 0;
		this.carDamage = 100;
		this.carTouched = false;

		this.carText = this.add.text(10, 10, 'Car: 100%', { font: '32px Courier', fill: '#000000' });
		this.carText.setDepth(4);

		this.kmText = this.add.text(10, 40, 'KM: 0', { font: '32px Courier', fill: '#000000' });
		this.kmText.setDepth(4);
		
		this.gameOverText = this.add.text(800 * 0.5, 600 * 0.5, 'GAME OVER', { font: '50px Courier', fill: '#FF0000' });
		this.gameOverText.setDepth(4);
		this.gameOverText.setVisible(false);
		
		//pressed buttons
		this.leftButton.onReleased = ()=>{
			console.log("BUTTON WAS RELEASED");
			this.doGoLeft();
		};
		this.rightButton.onReleased= ()=>{
			console.log("BUTTON WAS pressed");
			this.doGoRight();
		};

		this.startButton.onReleased = ()=>{
			console.log("BUTTON WAS RELEASED");
			this.started = true;
			
			this.bgStreetStart.setVisible(false);
			this.startButton.setVisible(false);
		};

		this.startAgainButton.onReleased = ()=>{
			console.log("BUTTON WAS RELEASED");
			this.started = true;
			
			this.bgStreetGameOver.setVisible(false);
			this.startAgainButton.setVisible(false);
			this.scene.restart();
		};
		// //touch buttons movement
		// this.leftButton.on('pointerdown', function(pointer){
		// 	this.leftMoveButton = true;
		// });
		// this.leftButton.on('pointerup', function(pointer){
		// 	this.leftMoveButton = false;
		// });

		// this.rightButton.on('pointerdown', function(pointer){
		// 	this.rightMoveButton = true;
		// });
		// this.rightButton.on('pointerup', function(pointer){
		// 	this.rightMoveButton = false;
		// });

		//this.timedEvent = this.time.addEvent({ delay: 500, callback: this.createShield(), callbackScope: this, loop: true });
		
	}

	update(){
		if(this.started){
			if(this.player.body.touching.none){
				this.player.setTint(0xffffff)
			}else{
				this.player.setTint(0xFF0000);
				this.damage();
			}


			this.bgStreet.y += this.streetVelocity; 
			this.bgStreet_2.y += this.streetVelocity;
			if(this.bgStreet.y >= 600){
				this.bgStreet.y = this.backgroundImageY;
			}

			if(this.bgStreet_2.y >= 600){
				this.bgStreet_2.y = this.backgroundImageY;
			}

			this.move();
			
			this.createCar();

			this.kmPoints += 1;
			this.kmText.setText('KM: ' + this.kmPoints);

			this.changeLevels();
		}
		
		
	}

	createCar(){
		//positions of items and cars possible.
		this.positionThings = Math.random() * (667 - 180) + 180;

		// if(this.positionThings <= 253){
		// 	this.position = 229;
		// }else if(this.positionThings <= 380){
		// 	this.position = 350;
		// }else if(this.positionThings <= 516){
		// 	this.position = 492;
		// }else if(this.positionThings <= 667){
		// 	this.position = 614;
		// } 

		if(this.lastCar < (this.time.now - this.carTimeSpawn)){	

			//get card name
			let carName = this.currentCarName();
			this.cars.add(this.physics.add.image(this.positionThings, this.carsPositionY , carName));
			
			//console.log(this.cars.list.length)
			let i = 0;
			while (i < this.cars.list.length) {
				//console.log(this.cars.list[i])
				this.physics.add.overlap(this.player, this.cars.list[i]);
				this.objectGravity(this.cars.list[i], this.velocityGravity)
				//colision
				//this.physics.add.collider(this.player, this.cars.list[i]);
				i++;
			}

			// for(var i = this.cars.list.length; this.cars.list.length < i; i++){
			// 	console.log(this.cars.list[i])
			// 	this.physics.add.overlap(this.player, this.cars.list[i]);
			// 	this.objectGravity(this.cars.list[i], velocity)

			// 	console.log(this.cars.lists)
			// }

			this.lastCar = this.time.now;
		}
	}

	move(){
		console.log(this.leftMoveButton);
		if (this.cursors.left.isDown)
		{
			//this.player.x -= 4;
			this.doGoLeft();
		}
		else if (this.cursors.right.isDown)
		{
			//this.player.x += 4;
			this.doGoRight();
		}	

	}

	doGoLeft()
	{
		this.player.setVelocityX(-200);
	}

	doGoRight()
	{
		this.player.setVelocityX(200);
	}


	objectGravity(thing, velocity){
		//console.log(thing)
		//add velocity 
		thing.body.gravity.y = velocity;
	}

	currentColors()
	{
		//fiz para estar random entre as figuras das cartas
		var randomNumber = Math.floor(Math.random()*this.colors.length);

		return this.colors[randomNumber]
	}

	currentValue()
	{
		//fiz o random para estar random os numeros das cartas
		var randomNumber = Math.floor(Math.random()*this.numbers.length);
		
		if (randomNumber < 0)
		{
			return this.numbers[0]
		}

		return this.numbers[randomNumber]
	}

	currentCarName()
	{
		return this.getCarName(this.currentColors(), this.currentValue())
	}

	getCarName = (color, value) => {
		return `car_${color}_${value}`
	}

	damage(){
		this.carTouched = true;
		this.exploded = true;		
		
		if(this.timeDamage < (this.time.now - this.timeDamageVelocity)){
			
			if(this.carTouched = true){
				this.carDamage =  this.carDamage - 20;
				this.getExpllosion();
				this.carTouched = false;
			}
			//
			this.carText.setText('Car: ' + this.carDamage +'%');
		}

		if(this.carDamage <= 0){
			this.musicTheme("off");
			this.gameOverScene();
		}
		
		this.timeDamage = this.time.now;
	}

	changeLevels(){

		if(this.kmPoints <= 1000){
			this.backgroundImageY = -692;
			this.streetVelocity = 10;
			this.velocityGravity = 100;
			this.carTimeSpawn = 3000;
			console.log(this.backgroundImageY);
		}else if(this.kmPoints <= 2000){
			this.backgroundImageY = -680;
			this.streetVelocity = 20;
			this.velocityGravity = 500;
			this.carTimeSpawn = 1000;
			console.log(this.backgroundImageY);
		}
		else if(this.kmPoints <= 3000){
			// this.backgroundImageY = -692;
			// this.streetVelocity = 30;
			this.velocityGravity = 800;
			this.carTimeSpawn = 500;
			console.log(this.backgroundImageY);
		}else if(this.kmPoints <= 4000){
			// this.backgroundImageY = -550;
			// this.streetVelocity = 40;
			this.velocityGravity = 1000;
			this.carTimeSpawn = 300;
			console.log(this.backgroundImageY);
		}else if(this.kmPoints <= 5000){
			// this.backgroundImageY = -450;
			// this.streetVelocity = 50;
			this.velocityGravity = 1200;
			this.carTimeSpawn = 100;
			console.log(this.backgroundImageY);
		}
		
		
	}

	getExpllosion(){
		this.explosionSound = this.sound.add('y2mate.com - 8- bit explosion sound effect [SFX]');
		this.explosionSound.play();
	}

	musicTheme(status){
		//sounds
		this.themeSound = this.sound.add('y2mate.com - Eight Bit Race Cars Remastered -- 8-bit -- Royalty Free Music');
		
		if(status === "on"){
			this.themeSound.play();
		}else{
			this.themeSound.stop();
		}
	}

	createShield(){
		// // shield1
		this.positionThings = Math.random() * (667 - 180) + 180;
		this.shield = this.physics.add.image(this.positionThings, 200, "shield1");
		
	}

	startGameScene(){
		this.bgStreetStart = this.add.image(401, 312, "template");
		this.bgStreetStart.scaleX = 1.1345102235440603;
		this.bgStreetStart.scaleY = 1.1345102235440603;
		this.bgStreetStart.setDepth(7);
		
		this.startButton = new MyButton(this, 403, 463, "buttonStart copy");
		this.add.existing(this.startButton);
		this.startButton.setDepth(8);		
	}

	gameOverScene(){
		
		this.bgStreetGameOver = this.add.image(401, 312, "template (1)");
		this.bgStreetGameOver.scaleX = 1.1345102235440603;
		this.bgStreetGameOver.scaleY = 1.1345102235440603;
		this.bgStreetGameOver.setDepth(7);
		
		this.startAgainButton.setVisible(true);
	}
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
