import React from 'react';
import { useState } from 'react';
import Timer from './Timer';
import './styles.scss';

function App() {
	const [breakLength, setBreakLength] = useState(0.05);
	const [sessionLength, setSessinLength] = useState(0.1);
	const [stopped, setStopped] = useState(true);
	const [changed, setChanged] = useState(false);
	const [sessionActive, setSessionActive] = useState(true);
	const [reset, setReset] = useState(false);

	const handleIncrement = (element) => {
		if (stopped === true) {
			if (element === 'break') {
				if (breakLength < 60) setBreakLength((prev) => prev + 1);
			} else if (element === 'session') {
				if (sessionLength < 60) setSessinLength((prev) => prev + 1);
			}
		}
		setChanged(true);
	};
	const handleDecrement = (element) => {
		if (stopped === true) {
			if (element === 'break') {
				if (breakLength > 1) setBreakLength((prev) => prev - 1);
			} else if (element === 'session') {
				if (sessionLength > 1) setSessinLength((prev) => prev - 1);
			}
		}
		setChanged(true);
	};

	const handleStart = () => {
		setStopped(!stopped);
		setReset(false);
	};

	const pauseSound = () => {
		const audioitem = document.getElementById('beep');
		console.log('pause');
		audioitem.pause();
		audioitem.currentTime = 0;
	};

	const handleReset = () => {
		setStopped(true);
		setChanged(true);
		setSessinLength(25);
		setBreakLength(5);
		setSessionActive(true);
		setReset(true);
		pauseSound();
	};

	const sessionValue = sessionLength * 60000;
	const breakValue = breakLength * 60000;

	const minutes = [sessionValue, breakValue];

	return (
		<section>
			<h1>Pomodoro Clock</h1>
			<div className="pomodoro-control-container flex">
				<div className="break">
					<label htmlFor="break-length" id="break-label">
						Break length
					</label>
					<div className="break-session flex">
						<div
							className="increment btn"
							onClick={() => handleIncrement('break')}
							id="break-increment"
						>
							up
						</div>
						<div id="break-length">{breakLength}</div>
						<div
							className="decrement btn"
							onClick={() => handleDecrement('break')}
							id="break-decrement"
						>
							down
						</div>
					</div>
				</div>
				<div className="session">
					<label htmlFor="session-length" id="session-label">
						Session length
					</label>
					<div className="break-session flex">
						<div
							className="increment btn"
							onClick={() => handleIncrement('session')}
							id="session-increment"
						>
							up
						</div>
						<div id="session-length">{sessionLength}</div>
						<div
							className="decrement btn"
							onClick={() => handleDecrement('session')}
							id="session-decrement"
						>
							down
						</div>
					</div>
				</div>
			</div>
			<h2 id="timer-label">{sessionActive === true ? 'Session' : 'Break'}</h2>
			<Timer
				minutes={minutes}
				change={changed}
				stateChanger={setChanged}
				stopped={stopped}
				sessionActive={setSessionActive}
				reset={reset}
			/>
			<div className="timer-control">
				<div id="start_stop" onClick={handleStart} className="btn">
					start stop
				</div>
				<div id="reset" onClick={handleReset} className="btn">
					reset
				</div>
			</div>
		</section>
	);
}

export default App;
