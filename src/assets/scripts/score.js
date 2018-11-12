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

db.collection('score').orderBy('score', 'desc').limit(20).get().then((querySnapshot => {
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

