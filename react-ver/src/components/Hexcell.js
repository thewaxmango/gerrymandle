import React from 'react';
import { Hexagon } from 'react-hexgrid';

function verifyConfig(config) {
    return true;
}

export default function Hexcell(props) {
	let config = props.config;
	let onClick = props.onClick;
	let data = props.data;
    if (verifyConfig(config) === false) {
		return (<>Failed to create Hexcell.</>);
	}

    return (<>
        
    </>);
} 