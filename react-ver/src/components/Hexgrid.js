import React, { Component } from 'react';
import { HexGrid, Layout, HexUtils, Hex, Hexagon, } from 'react-hexgrid';
import { v4 as uuidv4 } from 'uuid';
import { DIRS, addClass, hasClass, removeClass, toggleClass, defaultMap } from '../utils'

class Hexgrid extends Component {
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
			activeGroup: "",
			groups: {},
			data: data,
		}
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

	async hasActiveNeighbor(hex, activeGroup, groups) {
		for (let i = 0; i < 6; i++) {
			const neighbor = this.hexToStr(this.addHexDir(hex, DIRS[i]));
			if (groups[activeGroup].hexStrs.has(neighbor))
				return true;
		}
		return false;
	}
	
	async doGroup(hex) {
		const hexStr = this.hexToStr(hex);
		let {activeGroup, groups, data, holdAdding} = this.state;

		if (activeGroup === "") {								// if no active group
			if (data[hexStr].group === null)  {						// if selected element not in one
				activeGroup = uuidv4();									// create group
				groups[activeGroup] = {
					partyCt: 0,
					hexStrs: new Set(),
				};			
			} else {												// otherwise
				activeGroup = data[hexStr].group;						// choose selected element's group
			}
		}

		if (data[hexStr].group === null &&						// if selected element not in a group
			(groups[activeGroup].hexStrs.size === 0 || 				// and if group is either empty
				await this.hasActiveNeighbor(hex, activeGroup, groups))) {					// or element has active neighbor
			groups[activeGroup].hexStrs.add(hexStr);					// add to group
			groups[activeGroup].partyCt += data[hexStr].party;
			data[hexStr].group = activeGroup;
		} else if (data[hexStr].group === activeGroup) {		// if selected element in active group
			groups[activeGroup].hexStrs.delete(hexStr);				// remove from group
			groups[activeGroup].partyCt -= data[hexStr].party;
			data[hexStr].group = null;
		}

		if (activeGroup !== "") {								// if active group
			if (groups[activeGroup].hexStrs.size === 0) {			// if active is empty
				delete groups[activeGroup];								// remove group
				activeGroup = "";
			} else if (groups[activeGroup].hexStrs.size 
				=== this.config.maxGroupSize) {						// if active is full
				activeGroup = "";										// deselect group
			}
		}

		this.setState({activeGroup, groups, data});
	}

	async refreshBorders() {
		let {activeGroup, groups, data, holdAdding} = this.state;
		
		this.config.hexes.map(cellData => {
			const hex = cellData.hex;
			const hexStr = this.hexToStr(hex);
			let borders = "";

			if (data[hexStr].group !== null) {
				for (let i = 0; i < 6; i++) {
					const adjHexStr = this.hexToStr(this.addHexDir(hex, DIRS[i]));
					if (!(adjHexStr in data) || (data[hexStr].group !== data[adjHexStr].group)) {
						borders += i;
					}
				}
			}

			let borderStr = borders.length > 0 ? `cb-${borders}` : ''
			data[hexStr].borderClasses = 'cell-border ' + borderStr;

			data[hexStr].mainClasses = removeClass(data[hexStr].mainClasses, "full-0");
			data[hexStr].mainClasses = removeClass(data[hexStr].mainClasses, "full-1");

			if (data[hexStr].group === this.state.activeGroup) {
				data[hexStr].borderClasses = addClass(data[hexStr].borderClasses, "active-group");
			} else if (data[hexStr].group !== null) {
				if (groups[data[hexStr].group].partyCt < (this.config.maxGroupSize / 2))
					data[hexStr].mainClasses = addClass(data[hexStr].mainClasses, "full-0");
				else
					data[hexStr].mainClasses = addClass(data[hexStr].mainClasses, "full-1");
			}
		});

		this.setState({data});
	}
	
	async onClick(event, source) {
		event.preventDefault();
		const curHex = source.state.hex;
		const curHexStr = this.hexToStr(curHex);
		
		await this.doGroup(curHex);
		await this.refreshBorders();
	}

	async onMouseEnter(event, source) {
		let {activeGroup, groups, data, holdAdding} = this.state;
		const hexStr = this.hexToStr(source.state.hex);

		if (this.props.mouseDown) {
			if (holdAdding && data[hexStr].group === null) {					// if selected element not in a group
				groups[activeGroup].hexStrs.add(hexStr);							// add to group
				groups[activeGroup].partyCt += data[hexStr].party;
				data[hexStr].group = activeGroup;
			} else if (!holdAdding && data[hexStr].group === activeGroup) {		// if selected element in active group
				groups[activeGroup].hexStrs.delete(hexStr);							// remove from group
				groups[activeGroup].partyCt -= data[hexStr].party;
				data[hexStr].group = null;
			}
		}

		this.setState({groups, data});
	}

	async onMouseOut(event, source) {
		let {activeGroup, groups, data, holdAdding} = this.state;
		if (!this.props.mouseDown) {
			holdAdding = null;
		}
		this.setState({holdAdding});
	}

	render() {	
		if (this.verifyConfig() === false) {
			return (<>Failed to create Hexgrid.</>);
		}
	
		return (<>
			<div className='hexgrid'>
				<HexGrid width={1200} height={800} viewBox='-50 -50 100 100'>
					<Layout size={{x: 3, y: 3}} flat={true} spacing={1.03} origin={{ x: 0, y: 0 }}>

						{/* PRIMARY HEXAGON */}
						{this.config.hexes.map(cellConfig => 
							<Hexagon 
								key={uuidv4()}
								q={cellConfig.hex.q} 
								r={cellConfig.hex.r} 
								s={cellConfig.hex.s} 
								onClick={(e, h) => this.onClick(e, h)}
								onMouseEnter={(e, h) => this.onMouseEnter(e, h)}
								onMouseOut={(e, h) => this.onMouseOut(e, h)}
								className={this.state.data[this.hexToStr(cellConfig.hex)].mainClasses}
							/>
						)}

						{/* CENTER INDICATOR */}
						{this.config.hexes.map(cellConfig => 
							<Hexagon 
								key={uuidv4()}
								q={cellConfig.hex.q} 
								r={cellConfig.hex.r} 
								s={cellConfig.hex.s} 
								className={this.state.data[this.hexToStr(cellConfig.hex)].centerClasses}
							/>
						)}

						{/* BORDER */}
						{this.config.hexes.map(cellConfig => 
							<Hexagon 
								key={uuidv4()}
								q={cellConfig.hex.q} 
								r={cellConfig.hex.r} 
								s={cellConfig.hex.s} 
								className={this.state.data[this.hexToStr(cellConfig.hex)].borderClasses}
							/>
						)}
					</Layout>
				</HexGrid>
			</div>
		</>);
	}
}

export default Hexgrid;