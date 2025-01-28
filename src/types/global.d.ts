// src/types/global.d.ts

declare global {
  interface Todo {
    id: number
    task: string
    description: string
    done: boolean
  }
}

export {}

