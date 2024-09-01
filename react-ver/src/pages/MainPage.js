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
            },
            barState: {
                purple: 0,
                yellow: 0,
                total: this.config.hexes.length / this.config.maxGroupSize
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
        let bS = this.state.barState;
        bS.purple = 0;
        bS.yellow = 0;
        for (const [key, value] of Object.entries(d.groups)) {
            if (key === d.activeGroup) {
                continue
            } else if (value.partyCt > 7) {
                bS.purple++; 
            } else {
                bS.yellow++; 
            }
        }
        this.setState({d, bS})
    }

    render() {
        return (<>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></link>
            <h1>
                Mahjong Handle &nbsp;&nbsp;
                <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn"><i class="fa-solid fa-trophy"></i></button>
            </h1>

            <p className = "smalltext">
                Left click to select/deselect in current group. 
                Shift click to deselect any entire group. <br></br>
            </p>
            <StatusBar 
                state = {this.state.barState}
            />
            <Hexgrid
                updatePar = {this.updateGridData.bind(this)}
                state = {this.state.gridState}
                cfg = {this.config}
            />
        </>);
    }
}

export default MainPage;