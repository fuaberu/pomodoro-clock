import React from 'react';
import { useState, useEffect } from 'react';

const Timer = ({ minutes, stopped, change, stateChanger }) => {
	const sessionValue = minutes[0];
	const breakValue = minutes[1];

	const [switchTime, setswitchTime] = useState(false);

	const usingTime = switchTime === true ? breakValue : sessionValue;

	const [mins, setTime] = useState(usingTime);

	useEffect(() => {
		if (change === true) {
			setTime(minutes);
			stateChanger(false);
		}
	}, [stateChanger, change, minutes, mins]);

	const tick = () => {
		if (stopped !== true) {
			if (mins > 1000) {
				setTime(mins - 1000);
			} else if (mins === 1000) {
				setTime(mins - 1000);
				setswitchTime(!switchTime);
			} else if (mins === 0) {
				setTime(usingTime);
			}
		}
		console.log(mins, switchTime, usingTime);
	};

	useEffect(() => {
		const timer = setInterval(() => tick(), 1000);
		return () => {
			clearInterval(timer);
		};
	});

	const date = new Date(mins);

	return (
		<p className="clock" id="time-left">
			{60 * 60000 === mins
				? `60:00`
				: `${date.toTimeString().replace(/.*(\d{2}:)(\d{2}:\d{2}).*/, '$2')}`}
		</p>
	);
};

export default Timer;
