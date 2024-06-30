import './App.css';
import { React, Component } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage.js';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container 
				fluid 
				className="App" 
			>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<MainPage/>} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</BrowserRouter>
			</Container>
		);
	}
}

export default App;
