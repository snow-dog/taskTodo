import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Task } from '../models/Task'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

interface Props {
  todo: Task
  cardId: number
  updateTask: (name: string, id: number, cardId: number) => void
  deleteTask: (id: number) => void
}

export const TaskBoxView = ({ todo, cardId, updateTask, deleteTask }: Props) => {
  const classes = useStyles()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editingTask, setEditingTask] = useState<string>('')

  const handleEditing = (todoName: string) => {
    setIsEditing(true)
    setEditingTask(todoName)
  }

  const handleDone = () => {
    updateTask(editingTask, todo.id, cardId)
    setIsEditing(false)
    setEditingTask('')
  }

  return (
    <>
      {isEditing ? (
        <div>
          <TextField value={editingTask} onChange={e => setEditingTask(e.target.value)} />
          <CheckCircleIcon onClick={() => handleDone()} />
        </div>
      ) : (
        <li>
          <div className={classes.wrap}>
            <p onClick={() => handleEditing(todo.name)}>{todo.name}</p>
            <div onClick={() => deleteTask(todo.id)}>
              <DeleteIcon color="error" />
            </div>
          </div>
        </li>
      )}
    </>
  )
}
