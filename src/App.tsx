import type React from 'react'
import { SwipeTodo } from '@/components/SwipeTodo'

const App: React.FC = () => {
  return (
    <div className="App antialiased bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] bg-white">
      <SwipeTodo />
    </div>
  )
}

export default App

