import React from 'react';
import { useState, useEffect } from 'react';

const Timer = ({
	minutes,
	stopped,
	change,
	stateChanger,
	sessionActive,
	reset,
}) => {
	const sessionValue = minutes[0];
	const breakValue = minutes[1];

	const [switchTime, setSwitchTime] = useState(false);

	const usingTime = switchTime === true ? breakValue : sessionValue;

	const [mins, setTime] = useState(usingTime);

	useEffect(() => {
		if (reset === true) {
			setSwitchTime(false);
		}
	}, [reset]);

	useEffect(() => {
		if (change === true && stopped === true && switchTime === true) {
			setTime(breakValue);
			stateChanger(false);
		} else if (change === true && stopped === true && switchTime === false) {
			setTime(sessionValue);
			stateChanger(false);
		}
	}, [stateChanger, change, switchTime, breakValue, sessionValue, stopped]);

	const tick = () => {
		if (stopped !== true) {
			if (mins > 1000) {
				setTime(mins - 1000);
			} else if (mins === 1000) {
				setTime(mins - 1000);
				setSwitchTime(!switchTime);
				sessionActive(switchTime);
			} else if (mins === 0) {
				setTime(usingTime);
				playSound();
			}
		}
	};

	useEffect(() => {
		const timer = setInterval(() => tick(), 1000);
		return () => {
			clearInterval(timer);
		};
	});

	const date = new Date(mins);

	const playSound = () => {
		const audioitem = document.getElementById('beep');
		console.log(audioitem);
		audioitem.currentTime = 0;
		audioitem.play();
	};

	return (
		<>
			<p className="clock" id="time-left">
				{60 * 60000 === mins
					? `60:00`
					: `${date.toTimeString().replace(/.*(\d{2}:)(\d{2}:\d{2}).*/, '$2')}`}
			</p>
			<audio
				id="beep"
				src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
			></audio>
		</>
	);
};

export default Timer;
