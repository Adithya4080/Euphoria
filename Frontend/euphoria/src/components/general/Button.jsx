import React from 'react'

function Button({ text, className }) {
    return (
        <button className={`bg-white font-semibold text-[20px] text-black  rounded-lg ${className}`}>
            {text}
        </button>
    )
}

export default Button