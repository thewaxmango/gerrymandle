import Hexgrid from '../components/Hexgrid.js';
import { React, Component } from 'react';

class MainPage extends Component {
    constructor(props) {
		super(props);
	}

    render() {
        return (<>
            <Hexgrid/>
        </>);
    }
}

export default MainPage;