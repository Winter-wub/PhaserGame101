const dbconfig = {
	apiKey: 'AIzaSyAJQYVTKrPeOp0d2v6Ka03qremTflEZpmE',
	authDomain: 'notsure-e283f.firebaseapp.com',
	databaseURL: 'https://notsure-e283f.firebaseio.com',
	projectId: 'notsure-e283f',
	storageBucket: 'notsure-e283f.appspot.com',
	messagingSenderId: '168543849006'
};
	// eslint-disable-next-line
firebase.initializeApp(dbconfig);
// eslint-disable-next-line
let db = firebase.firestore();
// Disable deprecated features
db.settings({
	timestampsInSnapshots: true
});

db.collection('score').orderBy('score', 'desc').limit(5).get().then((querySnapshot => {
	let scores = [];
	querySnapshot.forEach((doc) => {
		console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
		scores.push({ name: doc.data().name, score: doc.data().score });
	});
	const table = document.getElementById('scoreboard').getElementsByTagName('tbody')[0];
	for(let i = scores.length-1 ;i>=0;i--) {
		let row = table.insertRow(0);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		cell1.innerHTML = scores[i].name;
		cell2.innerHTML = scores[i].score;
	}
}));

const config = {
	// eslint-disable-next-line
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		}
	},
	scene:{
		init: init,
		preload: preload,
		create: create,
		update: update,
	},
	title: 'notsure',
	version: '0.1a',
	parent: 'game',
};
// eslint-disable-next-line
let game = new Phaser.Game(config);
let player;
let cursors;
let obja;
let objb;
let objc;
let objd;
let obje;
let objf;
let objg;

let bomb;
let score = 0;
let scoreText;
let startBtn;
let stopBtn;
let platforms;
let playerName;
let life = 3;
let lifeText;
let canvas;
let fullscreen;
let timer;

function init (){
	canvas = this.sys.game.canvas;
	fullscreen = this.sys.game.device.fullscreen;
	if (!fullscreen.available) {
		return;
	}
	startBtn = document.getElementById('start');
	stopBtn = document.getElementById('stop');
	startBtn.addEventListener('click', () => {
		if (document.fullscreenElement) { return; }
		canvas[fullscreen.request]();
	});
	stopBtn.addEventListener('click',() => {
		document[fullscreen.cancel]();
	});
	this.events.on('shutdown', shutdown, this);
}

function preload() {
	this.load.image('sky', '/resources/images/drop milk background.png');
	this.load.image('obj1', '/resources/images/obj1.png');
	this.load.image('obj2', '/resources/images/obj2.png');
	this.load.image('obj3', '/resources/images/obj3.png');
	this.load.image('obj4', '/resources/images/obj4.png');
	this.load.image('obj5', '/resources/images/obj5.png');
	this.load.image('obj6', '/resources/images/obj6.png');
	this.load.image('obj7', '/resources/images/obj7.png');
	this.load.image('bomb', '/resources/images/bomb.png');
	this.load.image('player','/resources/images/player.png');
	this.load.image('ground','/resources/images/platform.png');
	this.load.image('logo', '/resources/images/logo.png');
}

function create() {
	canvas[fullscreen.request]();
	this.add.image(400, 300, 'sky');
	this.add.image(729, 54, 'logo');
	var text = this.add.text(12, 2, '', { font: '15px Courier', fill: '#ffffff' });
	text.setText([
		'Version: ' + game.config.gameVersion
	]);
	lifeText = this.add.text(16, 50, 'life: 3', { fontSize: '32px', fill: '#000' });
	scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	player = this.physics.add.image(500, 500, 'player');
	player.setCollideWorldBounds(true);
	cursors = this.input.keyboard.createCursorKeys();
	platforms = this.physics.add.staticGroup();

	platforms.create(400, 568, 'ground').setScale(2).refreshBody();

	timer = setInterval(() => {
		obja = this.physics.add.group({
			key: 'obj1',
			repeat: 0,
			setXY: { x: 0, y: 0, stepX: 70 }
		});
		obja.children.iterate( child => {
			child.x = Math.floor((Math.random() * 700) + 1);
		});

		objb = this.physics.add.group({
			key: 'obj2',
			repeat: 0,
			setXY: { x: 0, y: 0, stepX: 70 }
		});
		
		objb.children.iterate( child => {
			child.x = Math.floor((Math.random() * 700) + 1);
		});

		objc = this.physics.add.group({
			key: 'obj3',
			repeat: 0,
			setXY: { x: 0, y: 0, stepX: 70 }
		});
		objc.children.iterate( child => {
			child.x = Math.floor((Math.random() * 700) + 1);
		});

		objd = this.physics.add.group({
			key: 'obj4',
			repeat: 0,
			setXY: { x: 0, y: 0, stepX: 70 }
		});
		objd.children.iterate( child => {
			child.x = Math.floor((Math.random() * 700) + 1);
		});

		obje = this.physics.add.group({
			key: 'obj5',
			repeat: 0,
			setXY: { x: 0, y: 0, stepX: 70 }
		});
		obje.children.iterate( child => {
			child.x = Math.floor((Math.random() * 700) + 1);
		});

		objf = this.physics.add.group({
			key: 'obj6',
			repeat: 0,
			setXY: { x: 0, y: 0, stepX: 70 }
		});
		objf.children.iterate( child => {
			child.x = Math.floor((Math.random() * 700) + 1);
		});

		objg = this.physics.add.group({
			key: 'obj7',
			repeat: 0,
			setXY: { x: 0, y: 0, stepX: 70 }
		});
		objg.children.iterate( child => {
			child.x = Math.floor((Math.random() * 700) + 1);
		});

		bomb = this.physics.add.group({
			key: 'bomb',
			repeat: 2,
			setXY: { x: 0, y: 0, stepX: 70 }
		});

		bomb.children.iterate( child => {
			child.x = Math.floor((Math.random() * 700) + 1);
		});

		this.physics.add.overlap(player, obja, addScore, null, this);
		this.physics.add.collider(platforms, obja, respawn, null, this);

		this.physics.add.overlap(player, objb, addScore, null, this);
		this.physics.add.collider(platforms, objb, respawn, null, this);

		this.physics.add.overlap(player, objc, addScore, null, this);
		this.physics.add.collider(platforms, objc, respawn, null, this);

		this.physics.add.overlap(player, objd, addScore, null, this);
		this.physics.add.collider(platforms, objd, respawn, null, this);

		this.physics.add.overlap(player, obje, addScore, null, this);
		this.physics.add.collider(platforms, obje, respawn, null, this);

		this.physics.add.overlap(player, objf, addScore, null, this);
		this.physics.add.collider(platforms, objf, respawn, null, this);

		this.physics.add.overlap(player, objg, addScore, null, this);
		this.physics.add.collider(platforms, objg, respawn, null, this);

		this.physics.add.overlap(player, bomb, die, null, this);
		this.physics.add.collider(platforms, bomb, respawn, null, this);
	},1500);
	this.physics.add.collider(player, platforms);
	// gyro.frequency = 10;
	// gyro.startTracking(o => {
	// 	player.setVelocityX(o.x/20);
	// 	player.setVelocityX(o.y/20);
	// })
}

function update() {
	if (cursors.left.isDown) {
		player.setVelocityX(-300);
	} else if (cursors.right.isDown) {
		player.setVelocityX(300);
	} else {
		player.setVelocityX(0);
	}
}

function shutdown (){
	let canvas = this.sys.game.canvas;
	canvas.parentNode.removeChild(startBtn);
	canvas.parentNode.removeChild(stopBtn);
}

function addScore(player, obj) {
	obj.destroy();
	score++;
	scoreText.setText('score: '+score);
}

function respawn(platform, obj) {
	obj.destroy();
}

function die(player, bomb){
	bomb.destroy();
	life--;
	lifeText.setText('life: '+life);
	if( life <= 0 ) {
		clearInterval(timer);
		life = 99999999999	;
		console.log(`score: ${score}`);
		player.setTint(0xff0000);
		playerName = prompt('โปรดกรอกชื่อ');
		alert(`Score: ${score}         Name: ${playerName}`);
		db.collection('score').add({
			name: playerName,
			score: score,
		}).then(()=> {
			alert('บันทึกคะแนนสำเร็จ');
			window.location.href = "/";
		}).catch(error => {
			alert(error);
			window.location.href = "/";
		});
	}
	
}
