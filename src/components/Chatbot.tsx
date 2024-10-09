import React, { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState('')

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      // Here you would typically send the message to a backend API
      // and get a response. For now, we'll just echo the message.
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `You said: ${input}`, isUser: false }])
      }, 500)
      setInput('')
    }
  }

  return (
    <div className="fixed bottom-24 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Chat Support</h3>
            <button onClick={toggleChat} className="text-white hover:text-red-500">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg p-2 max-w-[70%] ${message.isUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-r-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  )
}

export default Chatbot