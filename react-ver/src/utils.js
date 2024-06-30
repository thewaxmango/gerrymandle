import { Hex, } from 'react-hexgrid';

export const DIRS = {
	0: {q: 1, r: 0, s: -1},
	1: {q: 0, r: 1, s: -1},
	2: {q: -1, r: 1, s: 0},
	3: {q: -1, r: 0, s: 1},
	4: {q: 0, r: -1, s: 1},
	5: {q: 1, r: -1, s: 0},
}

export function hasClass(classString, className) {
    return !!classString.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

export function addClass(classString, className) {
    if (!hasClass(classString, className))
        classString += " " + className;
	return classString;
}

export function removeClass(classString, className) {
	var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	classString = classString.replace(reg, ' ');
	return classString;
}

export function toggleClass(classString, className) {
	if (!hasClass(classString, className))
		return addClass(classString, className)
	return removeClass(classString, className)
}

export const defaultMap = [
	{hex: new Hex(-1, 6, -5), party: 0,},
	{hex: new Hex(0, 5, -5), party: 0,},
	{hex: new Hex(1, 4, -5), party: 0,},
	{hex: new Hex(4, 1, -5), party: 1,},
	{hex: new Hex(5, 0, -5), party: 1,},
	{hex: new Hex(6, -1, -5), party: 0,},

	{hex: new Hex(-4, 8, -4), party: 0,},
	{hex: new Hex(-3, 7, -4), party: 1,},
	{hex: new Hex(-2, 6, -4), party: 1,},
	{hex: new Hex(-1, 5, -4), party: 0,},
	{hex: new Hex(0, 4, -4), party: 0,},
	{hex: new Hex(1, 3, -4), party: 1,},
	{hex: new Hex(2, 2, -4), party: 1,},
	{hex: new Hex(3, 1, -4), party: 1,},
	{hex: new Hex(4, 0, -4), party: 1,},
	{hex: new Hex(5, -1, -4), party: 1,},
	{hex: new Hex(6, -2, -4), party: 0,},
	{hex: new Hex(7, -3, -4), party: 0,},

	{hex: new Hex(-5, 8, -3), party: 0,},
	{hex: new Hex(-4, 7, -3), party: 0,},
	{hex: new Hex(-3, 6, -3), party: 1,},
	{hex: new Hex(-2, 5, -3), party: 1,},
	{hex: new Hex(-1, 4, -3), party: 1,},
	{hex: new Hex(0, 3, -3), party: 1,},
	{hex: new Hex(1, 2, -3), party: 1,},
	{hex: new Hex(2, 1, -3), party: 0,},
	{hex: new Hex(3, 0, -3), party: 0,},
	{hex: new Hex(4, -1, -3), party: 1,},
	{hex: new Hex(5, -2, -3), party: 1,},
	{hex: new Hex(6, -3, -3), party: 0,},
	{hex: new Hex(7, -4, -3), party: 0,},
	{hex: new Hex(8, -5, -3), party: 0,},

	{hex: new Hex(-5, 7, -2), party: 1,},
	{hex: new Hex(-4, 6, -2), party: 0,},
	{hex: new Hex(-3, 5, -2), party: 1,},
	{hex: new Hex(-2, 4, -2), party: 1,},
	{hex: new Hex(-1, 3, -2), party: 1,},
	{hex: new Hex(0, 2, -2), party: 0,},
	{hex: new Hex(1, 1, -2), party: 0,},
	{hex: new Hex(2, 0, -2), party: 0,},
	{hex: new Hex(3, -1, -2), party: 0,},
	{hex: new Hex(4, -2, -2), party: 1,},
	{hex: new Hex(5, -3, -2), party: 1,},
	{hex: new Hex(6, -4, -2), party: 1,},
	{hex: new Hex(7, -5, -2), party: 0,},
	{hex: new Hex(8, -6, -2), party: 0,},

	{hex: new Hex(-6, 7, -1), party: 1,},
	{hex: new Hex(-5, 6, -1), party: 1,},
	{hex: new Hex(-4, 5, -1), party: 0,},
	{hex: new Hex(-3, 4, -1), party: 1,},
	{hex: new Hex(-2, 3, -1), party: 1,},
	{hex: new Hex(-1, 2, -1), party: 1,},
	{hex: new Hex(0, 1, -1), party: 1,},
	{hex: new Hex(1, 0, -1), party: 1,},
	{hex: new Hex(2, -1, -1), party: 0,},
	{hex: new Hex(3, -2, -1), party: 0,},
	{hex: new Hex(4, -3, -1), party: 0,},
	{hex: new Hex(5, -4, -1), party: 1,},
	{hex: new Hex(6, -5, -1), party: 0,},
	{hex: new Hex(7, -6, -1), party: 0,},

	{hex: new Hex(-7, 7, 0), party: 1,},
	{hex: new Hex(-6, 6, 0), party: 1,},
	{hex: new Hex(-5, 5, 0), party: 0,},
	{hex: new Hex(-4, 4, 0), party: 0,},
	{hex: new Hex(-3, 3, 0), party: 0,},
	{hex: new Hex(-2, 2, 0), party: 1,},
	{hex: new Hex(-1, 1, 0), party: 1,},
	{hex: new Hex(0, 0, 0), party: 1,},
	{hex: new Hex(1, -1, 0), party: 1,},
	{hex: new Hex(2, -2, 0), party: 1,},
	{hex: new Hex(3, -3, 0), party: 0,},
	{hex: new Hex(4, -4, 0), party: 1,},
	{hex: new Hex(5, -5, 0), party: 0,},
	{hex: new Hex(6, -6, 0), party: 0,},
	{hex: new Hex(7, -7, 0), party: 0,},

	{hex: new Hex(-7, 6, 1), party: 1,},
	{hex: new Hex(-6, 5, 1), party: 0,},
	{hex: new Hex(-5, 4, 1), party: 0,},
	{hex: new Hex(-4, 3, 1), party: 0,},
	{hex: new Hex(-3, 2, 1), party: 0,},
	{hex: new Hex(-2, 1, 1), party: 1,},
	{hex: new Hex(-1, 0, 1), party: 1,},
	{hex: new Hex(0, -1, 1), party: 0,},
	{hex: new Hex(1, -2, 1), party: 1,},
	{hex: new Hex(2, -3, 1), party: 1,},
	{hex: new Hex(3, -4, 1), party: 0,},
	{hex: new Hex(4, -5, 1), party: 0,},
	{hex: new Hex(5, -6, 1), party: 1,},
	{hex: new Hex(6, -7, 1), party: 1,},

	{hex: new Hex(-7, 5, 2), party: 1,},
	{hex: new Hex(-6, 4, 2), party: 1,},
	{hex: new Hex(-5, 3, 2), party: 0,},
	{hex: new Hex(-4, 2, 2), party: 0,},
	{hex: new Hex(-3, 1, 2), party: 1,},
	{hex: new Hex(-2, 0, 2), party: 1,},
	{hex: new Hex(-1, -1, 2), party: 0,},
	{hex: new Hex(0, -2, 2), party: 0,},
	{hex: new Hex(1, -3, 2), party: 1,},
	{hex: new Hex(2, -4, 2), party: 1,},
	{hex: new Hex(3, -5, 2), party: 1,},
	{hex: new Hex(4, -6, 2), party: 0,},
	{hex: new Hex(5, -7, 2), party: 1,},
	{hex: new Hex(6, -8, 2), party: 1,},

	{hex: new Hex(-8, 5, 3), party: 0,},
	{hex: new Hex(-7, 4, 3), party: 1,},
	{hex: new Hex(-6, 3, 3), party: 1,},
	{hex: new Hex(-5, 2, 3), party: 0,},
	{hex: new Hex(-4, 1, 3), party: 0,},
	{hex: new Hex(-3, 0, 3), party: 1,},
	{hex: new Hex(-2, -1, 3), party: 1,},
	{hex: new Hex(-1, -2, 3), party: 0,},
	{hex: new Hex(0, -3, 3), party: 1,},
	{hex: new Hex(1, -4, 3), party: 0,},
	{hex: new Hex(2, -5, 3), party: 1,},
	{hex: new Hex(3, -6, 3), party: 1,},
	{hex: new Hex(4, -7, 3), party: 1,},
	{hex: new Hex(5, -8, 3), party: 1,},

	{hex: new Hex(-8, 4, 4), party: 0,},
	{hex: new Hex(-7, 3, 4), party: 1,},
	{hex: new Hex(-6, 2, 4), party: 1,},
	{hex: new Hex(-5, 1, 4), party: 1,},
	{hex: new Hex(-4, 0, 4), party: 0,},
	{hex: new Hex(-3, -1, 4), party: 1,},
	{hex: new Hex(-2, -2, 4), party: 1,},
	{hex: new Hex(-1, -3, 4), party: 0,},
	{hex: new Hex(0, -4, 4), party: 0,},
	{hex: new Hex(1, -5, 4), party: 0,},
	{hex: new Hex(2, -6, 4), party: 1,},
	{hex: new Hex(3, -7, 4), party: 1,},
	
	{hex: new Hex(-6, 1, 5), party: 1,},
	{hex: new Hex(-5, 0, 5), party: 1,},
	{hex: new Hex(-4, -1, 5), party: 1,},
	{hex: new Hex(-1, -4, 5), party: 0,},
	{hex: new Hex(0, -5, 5), party: 0,},
	{hex: new Hex(1, -6, 5), party: 1,},
];