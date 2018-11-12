const fastify = require('fastify');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = fastify();

app.register(require('point-of-view'), {
	engine: {
		ejs: require('ejs')
	}
});

app.register(require('fastify-static'), {
	// eslint-disable-next-line
	root: path.join(__dirname, 'assets'),
	prefix: '/resources/',
});

app.get('/', (req, reply) => {
	reply.view('src/views/index.ejs', { text: 'text' });
});

app.get('/game', (req, reply) => {
	reply.view('src/views/game.ejs', { text: 'text' });
});

app.get('/scoreboard', (req, reply) => {
	reply.view('src/views/score.ejs', { text: 'text' });
});

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`server listening on ${app.server.address().port}`);
});

app.ready(() => {
	console.log(app.printRoutes());
});
