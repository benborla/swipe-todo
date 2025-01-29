import { animated, useSpring } from 'react-spring'
import { useDrag } from '@use-gesture/react'

interface TodoCardProps {
  todo: Todo
  onSwipe: (id: number, direction: 'left' | 'right') => void
  zIndex: number
  index: number
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo, onSwipe, zIndex, index }) => {
  const SWIPE_THRESHOLD = 100

  const [{ x, y, rotate, scale, background, opacity }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    background: 'white',
    opacity: 1,
  }))

  const bind = useDrag(({ down, movement: [mx, my]}) => {
    const trigger = Math.abs(mx) > SWIPE_THRESHOLD
    const dir = mx > 0 ? 1 : -1

    api.start({
      x: down ? mx : 0,
      y: down ? my : 0,
      rotate: down ? mx / 15 : 0,
      scale: down ? 1.1 : 1,
      background: down
        ? mx > SWIPE_THRESHOLD
          ? 'rgba(144, 238, 144, 1)'
          : mx < -SWIPE_THRESHOLD
            ? 'rgba(255, 182, 193, 1)'
            : 'white'
        : 'white',
      opacity: down || !trigger ? 1 : 1,
      immediate: (name) => name === 'x' || name === 'y' || name === 'rotate' || name === 'scale',
      config: { duration: 200 },
    })

    if (!down && trigger) {
      onSwipe(todo.id, dir === 1 ? 'right' : 'left')
    }
  })

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        rotate,
        scale,
        background,
        opacity,
        zIndex,
        touchAction: 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: `${index * 4}px`,
        top: `${index * 4}px`,
      }}
      className="rounded-lg shadow-md flex flex-col items-center justify-between p-4 cursor-grab bg-white select-none"
    >
      <h3 className="text-xl font-bold">{todo.task}</h3>
      <p className="text-gray-600">{todo.description}</p>
      <div className="w-full flex items-center justify-between text-sm">
        <span className="text-red-500">← Not Done</span>
        <span className="text-green-500">Done →</span>
      </div>
    </animated.div>
  )
}
