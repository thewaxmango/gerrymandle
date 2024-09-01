import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Hexgrid extends Component {
	constructor(props) {
		super(props);
	}

	render() {	
		return (<>
			<ProgressBar className="pbar">
                <ProgressBar striped className='pbar-purple' now={Math.round(100*this.props.state.purple/this.props.state.total)} />
                <ProgressBar striped className='pbar-yellow' now={Math.round(100*this.props.state.yellow/this.props.state.total)} />
            </ProgressBar>
		</>);
	}
}

export default Hexgrid;