import React from 'react';
import { useState } from 'react';
import Timer from './Timer';
import './styles.scss';

function App() {
	const [breakLength, setBreakLength] = useState(5);
	const [sessionLength, setSessinLength] = useState(25);
	const [stopped, setStopped] = useState(true);
	const [changed, setChanged] = useState(false)

	const handleIncrement = (element) => {
		if (stopped === true) {
			if (element === breakLength) {
				if (breakLength < 60) setBreakLength((prev) => prev + 1);
			} else {
				if (sessionLength < 60) setSessinLength((prev) => prev + 1);
			}
		}
		setChanged(true);
	};
	const handleDecrement = (element) => {
		if (stopped === true) {
			if (element === breakLength) {
				if (breakLength > 1) setBreakLength((prev) => prev - 1);
			} else {
				if (sessionLength > 1) setSessinLength((prev) => prev - 1);
			}
		}
		setChanged(true);
	};

	const handleStart = () => {
		setStopped(!stopped);
	};

	const handleReset = () => {
		setStopped(true);
		setChanged(false);
		setSessinLength(25)
		setBreakLength(5)
	};

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
							onClick={() => handleIncrement(breakLength)}
							id="break-increment"
						>
							up
						</div>
						<div id="break-length">{breakLength}</div>
						<div
							className="decrement btn"
							onClick={() => handleDecrement(breakLength)}
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
							onClick={() => handleIncrement(sessionLength)}
							id="session-increment"
						>
							up
						</div>
						<div id="session-length">{sessionLength}</div>
						<div
							className="decrement btn"
							onClick={() => handleDecrement(sessionLength)}
							id="session-decrement"
						>
							down
						</div>
					</div>
				</div>
			</div>
			<h2 id="timer-label">Session</h2>
			<Timer minutes={sessionLength * 60000} change={changed} stateChanger={setChanged} stopped={stopped} />
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
