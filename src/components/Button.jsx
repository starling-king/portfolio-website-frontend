import React from 'react'

function Button({
    children,
    type = 'button',
    bgcolor = 'bg-blue-600',
    textColor = 'text-black',
    className='',
    ...props
}) {
  return (
   <button className={`${className} ${bgcolor} ${textColor}`}{...props}>{children}</button>
  )
}

export default Button
