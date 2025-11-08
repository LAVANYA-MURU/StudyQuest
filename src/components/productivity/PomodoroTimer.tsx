
import React, { useState, useEffect, useRef } from 'react';

type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

const PomodoroTimer: React.FC = () => {
    const [mode, setMode] = useState<Mode>('pomodoro');
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef<number | null>(null);

    const modeTimes = {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60,
    };

    useEffect(() => {
        if (isActive && time > 0) {
            timerRef.current = window.setInterval(() => {
                setTime(t => t - 1);
            }, 1000);
        } else if (time === 0) {
            // Handle timer completion (e.g., play sound, show notification)
            setIsActive(false);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, time]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = (newMode: Mode) => {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsActive(false);
        setMode(newMode);
        setTime(modeTimes[newMode]);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="text-center p-4 bg-base-300 rounded-lg">
            <div className="flex justify-center space-x-2 mb-4">
                <button onClick={() => resetTimer('pomodoro')} className={`px-3 py-1 text-sm rounded ${mode === 'pomodoro' ? 'bg-primary text-white' : 'bg-base-200'}`}>Pomodoro</button>
                <button onClick={() => resetTimer('shortBreak')} className={`px-3 py-1 text-sm rounded ${mode === 'shortBreak' ? 'bg-primary text-white' : 'bg-base-200'}`}>Short Break</button>
                <button onClick={() => resetTimer('longBreak')} className={`px-3 py-1 text-sm rounded ${mode === 'longBreak' ? 'bg-primary text-white' : 'bg-base-200'}`}>Long Break</button>
            </div>
            <div className="text-6xl font-bold my-6 text-white">{formatTime(time)}</div>
            <button onClick={toggleTimer} className="w-32 px-6 py-3 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-indigo-700 transition-colors">
                {isActive ? 'Pause' : 'Start'}
            </button>
        </div>
    );
};

export default PomodoroTimer;
