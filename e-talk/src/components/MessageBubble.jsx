import React from 'react'

function MessageBubble({ text, align ,time}) {
  const isRight = align === 'right'
  return (
    <div className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-md px-4 py-2 shadow rounded-lg ${isRight ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        {text}
        <p className='text-xs font-extralight text-right'>{time}</p>
      </div>
    </div>
  )
}

export default MessageBubble
