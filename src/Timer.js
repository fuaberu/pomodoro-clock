import React from 'react';
import { useState, useEffect } from 'react';

const Timer = ({ minutes, stopped, change, stateChanger }) => {
	const [mins, setTime] = useState(minutes);

	console.log(minutes, mins);

	useEffect(() => {
		if (minutes !== mins && stopped === true && change === true) {
			setTime(minutes);
			stateChanger(false);
		}
	}, [stateChanger, change, stopped, minutes, mins]);

	const tick = () => {
		if (stopped !== true) {
			setTime(mins - 1000);
		}
	};

	useEffect(() => {
		const timer = setInterval(() => tick(), 1000);
		return () => {
			clearInterval(timer);
		};
	});

	const date = new Date(mins);

	return (
		<p className="clock" id="time-left">{`${date
			.toTimeString()
			.replace(/.*(\d{2}:)(\d{2}:\d{2}).*/, '$2')}`}</p>
	);
};

export default Timer;
