import React, { useState } from 'react'
import { Card, makeStyles } from '@material-ui/core'
import { Typography, TextField, Button } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import { CardType } from '../models/CardType'
import { TaskBox } from './TaskBox'

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
}))

interface Props {
  card: CardType
  error: string
  updateCard: (name: string, id: number) => void
  updateTask: (name: string, id: number, cardId: number) => void
  createNewTask: (name: string, cardId: number) => void
  deleteTask: (id: number) => void
}

export const CardBox = ({ card, error, updateCard, updateTask, createNewTask, deleteTask }: Props) => {
  const classes = useStyles()
  const [inputCard, setInputCard] = useState<string>('')
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleIsEditing = () => {
    setIsEditing(true)
    setInputCard(card.name)
  }

  const handleInputCard = () => {
    updateCard(inputCard, card.id)
    setInputCard('')
    setIsEditing(false)
  }

  return (
    <>
      <Card className={classes.cards}>
        {isEditing ? (
          <>
            <TextField value={inputCard} onChange={e => setInputCard(e.target.value)} />
            <Button onClick={handleInputCard}>
              <AddCircle style={{ color: '#fff' }} />
            </Button>
          </>
        ) : (
          <Typography variant="h2" onClick={() => handleIsEditing()}>
            {card.name}
          </Typography>
        )}
        <TaskBox
          task={card.tasks}
          error={error}
          cardId={card.id}
          updateTask={updateTask}
          createNewTask={createNewTask}
          deleteTask={deleteTask}
        />
      </Card>
    </>
  )
}
