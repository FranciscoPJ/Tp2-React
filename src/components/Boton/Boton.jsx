import React from 'react';

export default function Boton({ texto, onClick, clase = '' }) {
    return (
        <button
            className={`px-3 py-1 rounded text-white transition cursor-pointer ${clase}`}
            onClick={onClick}
        >
            {texto}
        </button>
    );
}
