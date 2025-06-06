import React from 'react';

const CallIcon = (props) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 26.765"
            {...props}
        >
            <path data-name="사각형 6" transform="translate(0 .967)" style={{fill:'none'}} d="M0 0h24v24.922H0z"/>
            <path 
                d="M2.834.527 4.127.114a2.475 2.475 0 0 1 3.022 1.46L8.18 4.008a2.779 2.779 0 0 1-.617 3.082L5.292 9.247a9.613 9.613 0 0 0 1.3 3.812 10.418 10.418 0 0 0 2.725 3.114l2.731-.912a2.441 2.441 0 0 1 2.8.985l1.478 2.172a2.785 2.785 0 0 1-.31 3.5l-.982.985a3.623 3.623 0 0 1-3.662.934q-4.57-1.426-8.4-8.464T.257 3.411A3.914 3.914 0 0 1 2.837.527z" 
                transform="rotate(-11 17.148 -3.59)" 
                style={{fill:'#888'}}
            />
        </svg>
    );
};

export default CallIcon;

