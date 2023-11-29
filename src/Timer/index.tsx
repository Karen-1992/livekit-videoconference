import React from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import moment from "moment";

import "./styles.css";

const Timer: React.FC = () => {
    const audioAlert = new Audio("/audio/alert.mp3");

    const onTickTimer = (timerVal: CountdownTimeDelta) => {
        const timerInSeconds = timerVal?.minutes * 60 + timerVal?.seconds;
        if (timerInSeconds === 10) {
            console.log("should play");
            audioAlert?.play();
        }
    };

    return (
        <>
            <div className="timer-wrapper">
                <div className="timer">
                    <div className="timer__value">
                        <Countdown
                            key={Date.now()}
                            date={moment().add(15, "s").valueOf()}
                            onTick={(countdownTime) => onTickTimer(countdownTime)}
                        />
                    </div>
                    {/* <button onClick={startAudio}>start</button> */}
                </div>
            </div>
        </>
    );
};

export default Timer;
