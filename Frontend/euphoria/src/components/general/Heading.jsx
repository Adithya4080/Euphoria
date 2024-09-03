import React from 'react'

function Heading({ text, className }) {
    return (
        <div>
            <h3 className={`bg-white font-semibold text-[28px] text-[#3C4242] leading-[34px] font-causten  rounded-lg ${className}`}>
                {text}
            </h3>
        </div>
    );
}

export default Heading