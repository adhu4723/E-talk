import React from 'react'

function Button({label,onClick}) {
  return (
    <button
          type="submit"
          className=" w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition px-4 "
            onClick={onClick}
       >
          {label}
        </button>
  )
}

export default Button
