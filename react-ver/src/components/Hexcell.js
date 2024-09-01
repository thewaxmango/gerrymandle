import React from 'react';

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

    return (<></>);
} 