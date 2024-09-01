import Hexgrid from '../components/Hexgrid.js';
import StatusBar from '../components/StatusBar.js';
import { React, Component } from 'react';
import { Hex } from 'react-hexgrid';
import { defaultMap } from '../utils'

class MainPage extends Component {
    constructor(props) {
		super(props);

        this.config = props.config;
		if (typeof this.config === 'undefined') {					// if config is not set, return example hexgrid
			this.config = {
				valid: true,
				maxGroupSize: 15,
				hexes: defaultMap,
			};
		}

        let data = {};
		this.config.hexes.map(cellConfig => {
			data[this.hexToStr(cellConfig.hex)] = {
				party: cellConfig.party,
				group: null,
				mainClasses: 'cell-main', 
				centerClasses: cellConfig.party == '0' ? 'cell-center-0 ' : 'cell-center-1 ', 
				borderClasses: 'cell-border cb-',
			};
		});

        this.state = {
            gridState: {
                activeGroup: "",
                groups: {},
                data: data,
            }
        };
        //console.log(this.state)
	}

    verifyConfig() {
		return true;
	}
	
	isConnected() {
		return true;
	}

	addHexDir(hex, dir) {
		return new Hex(hex.q + dir.q, hex.r + dir.r, hex.s + dir.s);
	}

	hexToStr(hex) {
		return `${hex.q} ${hex.r} ${hex.s}`;
	}

	qrsToStr(q, r, s) {
		return `${q} ${r} ${s}`;
	}

    async updateGridData(d) {
        this.state.gridState = d;
    }

    render() {
        return (<>
            <StatusBar />
            <Hexgrid
                updatePar = {this.updateGridData.bind(this)}
                state = {this.state.gridState}
                cfg = {this.config}
            />
        </>);
    }
}

export default MainPage;