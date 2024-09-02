import React from 'react'

function Button({ text, className }) {
    return (
        <button className={`bg-white font-semibold text-[20px] text-black py-[16px] px-[72px] rounded-lg ${className}`}>
            {text}
        </button>
    )
}

export default Button