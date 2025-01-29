import { useState, useEffect } from 'react'
import { animated, useTransition } from 'react-spring'
import { TodoCard } from '@/components/TodoCard'
import { dummyTodos } from '@/data/dummy'

export const SwipeTodo = () => {
  const [todos, setTodos] = useState<Todo[]>(dummyTodos)
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const [showCompleted, setShowCompleted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const activeTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    if (currentIndex >= activeTodos.length && activeTodos.length > 0) {
      setCurrentIndex(0)
    }
  }, [activeTodos.length, currentIndex])

  const transitions = useTransition(currentIndex, {
    // from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    // enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    // leave: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const handleSwipe = (id: number, direction: 'left' | 'right') => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => (todo.id === id ? { ...todo, done: direction === 'right' } : todo))

      const doneTodo = updatedTodos.find((todo) => todo.id === id)
      if (doneTodo && doneTodo.done) {
        setCompletedTodos((prev) => [...prev, doneTodo])
      }

      return updatedTodos
    })

    if (activeTodos.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeTodos.length)
    }
  }
  const handleReset = () => {
    setTodos(dummyTodos)
    setCompletedTodos([])
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Swipe Todo</h1>
      {!showCompleted && (
        <>
          <div className="relative w-72 h-96">
            {transitions((style, i) => (
              <animated.div style={style} className="absolute w-full h-full">
                {activeTodos.map((todo, index) => (
                  <TodoCard key={todo.id} todo={todo} onSwipe={handleSwipe} zIndex={3 - index} index={index} />
                ))}
              </animated.div>
            ))}
            {activeTodos.length === 0 && (
              <div className="w-full h-full bg-white rounded-lg shadow-md flex items-center justify-center">
                <p className="text-xl text-center text-gray-500">No more todos!</p>
              </div>
            )}
          </div>
          <div className="mt-4 text-lg font-semibold text-blue-600">
            Remaining: {activeTodos.length} / {todos.length}
          </div>
        </>
      )}
      <div className="flex items-center justify-center gap-x-5">
        <button
          className="cursor-pointer mt-8 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? 'Back to Todos' : 'Completed'}
        </button>
        <button
          className="cursor-pointer mt-8 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => handleReset()}
        >
          Reset
        </button>
      </div>
      {showCompleted && (
        <div className="mt-8 w-64">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Completed Tasks</h2>
          <ul className="bg-white rounded-lg shadow-md p-4">
            {completedTodos.map((todo) => (
              <li key={todo.id} className="line-through mb-2 text-gray-600">
                {todo.task}
              </li>
            ))}
          </ul>
          {completedTodos.length === 0 && <p className="text-center text-gray-500">No completed tasks yet.</p>}
        </div>
      )}
    </div>
  )
}
