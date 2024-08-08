import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import Loader from './Loader';
const Chat = ({
    submit,
    setInput,
    input,
    result,
    loading,
    displayResult,
    recentPrompts,
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
console.log(loading);
  return (
    <div className="fixed right-4 bottom-4 z-10">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={toggleChat}
      ><span className='flex items-center gap-1'>
        Chat with us
        <MessageCircle />
      </span>
      </button>
      {isOpen && (
        <div className="bg-white border border-gray-300 shadow-md rounded-lg p-4 absolute right-0 bottom-16 w-80 h-[400px] overflow-y-hidden">
        {!displayResult ? (
            <p className="text-gray-800 text-left mr-2 border border-gray-200 p-2">Welcome to WellNest ! How can we assist you today?</p>
        ):(
            <>
            <div className="flex flex-col gap-2 mb-4">
            <p className='text-gray-800 text-right ml-2 my-2 font-semibold'>{recentPrompts}</p>
            <div className="flex items-start gap-2">
              <img src="/logo.png" alt="icon" className='w-8 h-8'/>
              {result ? (
              <p className="text-md font-normal loading-6 text-gray-800" dangerouslySetInnerHTML={{ __html: result }}></p>

              ):(
                <Loader/>
              )}
            </div>
          </div>
         
          </>
        )}

        <form action={submit} className="absolute bottom-0 left-4 right-4">
            <div className="flex items-center bg-white">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="border-none p-2 w-full rounded-md outline-none"
                placeholder="Ask yor Question here"
              />
                <Send
              type="submit" onClick={submit} 
              className='text-blue-500 cursor-pointer' size={20}
            />
            </div>
          </form>

        </div>
      )}
    </div>
  );
};

export default Chat;
