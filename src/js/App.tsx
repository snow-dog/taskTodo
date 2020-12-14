import React, { useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { AppBar, TextField, Button } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'
import { Task } from './models/Task'
import { CardType } from './models/CardType'
// import { TaskBox } from './components/TaskBox'
import { CardBox } from './components/CardBox'

// import { Card } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
    '& h1': {
      fontSize: '24px',
    },
  },
  cardName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  err: {
    color: theme.palette.error.main,
  },
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

export const App = () => {
  const classes = useStyles()
  // const [inputTask, setInputTask] = useState<string>('')
  const [task, setTask] = useState<Task[]>([])
  const [error, setError] = useState<string>('')
  const [cardErr, setCardErr] = useState<string>('')
  // const [editingTask, setEditingTask] = useState<string>('')

  const [cards, setCards] = useState<CardType[]>([{ id: 0, name: 'IDEA-1', tasks: [{ id: 0, name: 'idea1-task' }] }])
  const [inputCard, setInputCard] = useState<string>('')
  // const [cardError, setCardError] = useState<string>('')

  // タスクの作成DONE
  const createNewTask = (name: string, cardId: number) => {
    const trimedVal = name.trim()
    if (!trimedVal) return
    if (cardId < 0) return
    if (cards[cardId].tasks.filter(todo => todo.name === name).length > 0) {
      // if (task.filter(todo => todo.name === name).length > 0) {
      setError('already existed. PLZ change name')
      return
    }
    setError('')
    // setTask([...task, { id: task.length + 1, name: trimedVal }])
    const newCard: CardType[] = cards.map(card => {
      return card.id === cardId
        ? { id: cardId, name: card.name, tasks: [...card.tasks, { id: card.tasks.length, name: trimedVal }] }
        : card
    })
    setCards(newCard)
  }
  // タスクを更新するDONE
  const updateTask = (name: string, id: number, cardId: number) => {
    const trimedVal = name.trim()
    if (!trimedVal) return
    if ((!id && id != 0) || (!cardId && cardId != 0)) return

    if (cards[cardId].tasks.filter(todo => todo.name === name && todo.id !== id).length > 0) {
      // if (task.filter(todo => todo.name === name && todo.id !== id).length > 0) {
      setError('already existed. PLZ change name')
      return
    }
    if (cards[cardId].tasks.filter(todo => todo.id === id).length === 0) {
      setError('タスクIDが一致しません')
      return
    }
    const newTasks = cards[cardId].tasks.map(todo => {
      return todo.id === id ? { id: id, name: name } : todo
    })
    const newCard: CardType[] = cards.map(card => {
      return card.id === cardId ? { id: cardId, name: card.name, tasks: newTasks } : card
    })
    setError('')
    setCards(newCard)
    // setTask(newCard)
  }
  // タスクを削除する
  const deleteTask = (id: number) => {
    if (!id) return
    const newTask = task.filter(todo => todo.id !== id)
    setTask(newTask)
  }

  // カードの作成
  const createCard = () => {
    const trimedVal = inputCard.trim()
    if (!trimedVal) return
    if (cards.filter(card => card.name === trimedVal).length > 0) {
      setCardErr('already existed. PLZ change name')
      return
    }
    setCardErr('')
    setCards([...cards, { id: cards.length, name: trimedVal, tasks: [] }])
    setInputCard('')
  }
  // カードの更新DONE
  const updateCard = (name: string, cardId: number) => {
    const trimedVal = name.trim()
    if (!trimedVal) return
    if (!cardId && cardId != 0) return
    if (cards.filter(card => card.name === name).length > 0) {
      setError('already existed. PLZ change name')
      return
    }
    if (cards.filter(card => card.id === cardId).length === 0) {
      setError('タスクIDが一致しません')
      return
    }
    const newCards = cards.map(card => {
      return card.id === cardId ? { id: cardId, name: trimedVal, tasks: card.tasks } : card
    })
    setError('')
    setCards(newCards)
  }

  const handleClear = () => {
    setTask([])
    setError('')
  }

  return (
    <>
      <AppBar color="primary" position="static">
        <div className={classes.headerBar}>
          <Typography variant="h1">My Todo List</Typography>
          <div onClick={() => handleClear()}>CLEAR</div>
        </div>
      </AppBar>
      <div className={classes.cardName}>
        <TextField value={inputCard} onChange={e => setInputCard(e.target.value)} />
        <Button onClick={() => createCard()}>
          <AddCircle color="action" />
        </Button>
        {cardErr ? cardErr : ''}
      </div>
      {cards.map(card => {
        return (
          <CardBox
            key={card.id}
            card={card}
            error={error}
            updateCard={updateCard}
            updateTask={updateTask}
            createNewTask={createNewTask}
            deleteTask={deleteTask}
          />
        )
      })}
      {/* <TaskBox
        task={task}
        error={error}
        updateTask={updateTask}
        createNewTask={createNewTask}
        deleteTask={deleteTask}
      /> */}
    </>
  )
}
