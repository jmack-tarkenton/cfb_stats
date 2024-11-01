import React from 'react';


const CircularProgress = ({ logoUrl, percentage, color, size = 175, small = false }) => {

    const adjustedSize = small ? size * 0.5 : size;
    const radius = adjustedSize / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="circular-progress" style={{ width: adjustedSize, height: adjustedSize }}>
            <svg width={adjustedSize} height={adjustedSize} viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}>
                <circle
                    className="background-circle"
                    cx={adjustedSize / 2}
                    cy={adjustedSize / 2}
                    r={radius}
                    strokeWidth={small?"5":"10"}
                    stroke="#e6e6e6"
                    fill="none"
                />
                <circle
                    className="progress-circle"
                    cx={adjustedSize / 2}
                    cy={adjustedSize / 2}
                    r={radius}
                    strokeWidth={small?"5":"10"}
                    stroke={color}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>
            <div className="progress-content">
                <img src={logoUrl} alt="team logo" className="team-logo" style={{ width: small ? 25 : 50, height: small ? 25 : 50 }} />
                <span className="percentage-text" style={{ fontSize: small ? '0.6em' : '1.2em' }}>{`${percentage}%`}</span>
            </div>
        </div>
    );
};

export default CircularProgress;