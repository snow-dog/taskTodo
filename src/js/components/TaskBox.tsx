import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import { TaskBoxView } from './TaskBoxView'

import { Task } from '../models/Task'

const useStyles = makeStyles(theme => ({
  cards: {
    background: theme.palette.primary.light,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    width: '80vw',
    '&:nth-child(even)': {
      background: theme.palette.secondary.light,
    },
  },
  err: {
    color: theme.palette.error.main,
  },
  // btn: {
  //   color: theme.palette.action.active,
  // },
}))

interface Props {
  task: Task[]
  error: string
  cardId: number
  updateTask: (name: string, id: number, cardId: number) => void
  createNewTask: (name: string, cardId: number) => void
  deleteTask: (id: number) => void
}

export const TaskBox = ({ task, cardId, error, updateTask, createNewTask, deleteTask }: Props) => {
  const classes = useStyles()
  const [inputTask, setInputTask] = useState<string>('')

  const handleInputTask = () => {
    createNewTask(inputTask, cardId)
    setInputTask('')
  }

  return (
    <>
      <TextField value={inputTask} onChange={e => setInputTask(e.target.value)} />
      <Button onClick={handleInputTask}>
        <AddCircle style={{ color: '#fff' }} />
      </Button>
      <p className={classes.err}>{error}</p>
      <ul>
        {task.map((todo, i) => {
          return <TaskBoxView key={i} cardId={cardId} todo={todo} updateTask={updateTask} deleteTask={deleteTask} />
        })}
      </ul>
    </>
  )
}
