import { useState, useEffect } from 'react'
import { animated, useTransition } from 'react-spring'
import { TodoCard } from '@/components/TodoCard'
import { dummyTodos } from '@/data/dummy'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription} from '@/components/ui/alert'
import { TriangleAlertIcon } from 'lucide-react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

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
    <div className="min-h-screen p-10 flex flex-col items-center justify-center">
      {!showCompleted && (
        <>
          <div className="flex flex-col items-center justify-center gap-y-5">
            <div className="relative w-72 h-96">
              {transitions((style) => (
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
            <div className="mt-2">
              <Badge variant="outline">
            Remaining: {activeTodos.length} / {todos.length}
              </Badge>
            </div>
          </div>
        </>
      )}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <Button
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? 'Back to Todos' : 'Completed'}
        </Button>

        <Drawer>
          <DrawerTrigger>
            <Button variant="outline">...</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="items-start">
              <DrawerHeader>
                <DrawerTitle>Settings</DrawerTitle>
                <DrawerDescription>Customize your tasks</DrawerDescription>

              </DrawerHeader>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <div className="flex items-start justify-end space-x-2">
                  {!showCompleted && <Button
                    variant="destructive"
                    onClick={() => handleReset()}
                  >
                  Reset Tasks
                  </Button>}
                  <Button>Close</Button>
                </div>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      {showCompleted && (
        <div className="mt-8 w-64">
          {completedTodos.length > 0 && (
            <ul className="bg-white rounded-lg shadow-md p-4">
              {completedTodos.map((todo) => (
                <li key={todo.id} className="line-through mb-2 text-gray-600">
                  {todo.task}
                </li>
              ))}
            </ul>
          )}
          {completedTodos.length === 0 &&
            <Alert>
              <div className="flex items-center justify-around">
                <TriangleAlertIcon className="h-4 w-4" />
                <AlertDescription>
                  No completed tasks yet.
                </AlertDescription>
              </div>
            </Alert>
          }
        </div>
      )}
    </div>
  )
}
