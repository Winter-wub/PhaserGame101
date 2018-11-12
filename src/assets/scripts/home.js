class Home extends React.Component {
	render() {
		return (
			<div>
				<div className="card">
					<div className="card-body">
						<div className="row" style={{ marginTop: '1%'}}>
							<div className="col">
								<img src="resources/images/logo.png" alt="logo"/>
							</div>
						</div>
						<div className="row" style={{ marginTop: '9%'}}>
							<div className="col">
								<a href="game" >
									<button type="button" className="btn btn-success">START GAME</button>
								</a>
							</div>
							<div className="col">
								<a href="scoreboard" >
									<button type="button" className="btn btn-info">SCORE BOARD</button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Home />, document.getElementById('root'));
