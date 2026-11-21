import React from 'react'

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    containerClassName?: string
}

export function StyledInput({ label, containerClassName = '', ...props }: StyledInputProps) {
    return (
        <div className={`input-group ${containerClassName}`}>
            {label && <label className="input-label">{label}</label>}
            <input className="styled-input" {...props} />
        </div>
    )
}

interface StyledSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    containerClassName?: string
    children: React.ReactNode
}

export function StyledSelect({ label, containerClassName = '', children, ...props }: StyledSelectProps) {
    return (
        <div className={`input-group ${containerClassName}`}>
            {label && <label className="input-label">{label}</label>}
            <select className="styled-select" {...props}>
                {children}
            </select>
        </div>
    )
}
