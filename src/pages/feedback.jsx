import { Button, makeStyles, TextField, Typography } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { LTYLayout } from '../layouts/LTYLayout'
import { FeedbackCard } from '../components/FeedbackCard'

const textList = [
  {
    text: '标题',
  },
  {
    text: '描述',
  },
  {
    text: '联系方式',
  },
]
const useTextFieldStyles = makeStyles((theme) => {
  return {
    text: {
      marginBottom: theme.spacing(2),
      display: 'block',
    },
  }
})

export const FeedbackPage = () => {
  const classes = useTextFieldStyles()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [contact, setContact] = useState('')
  const [feedbacks, setFeedbacks] = useState([])

  const setContent = (id, value) => {
    if (id === 0) {
      setTitle(value)
    } else if (id === 1) {
      setDetails(value)
    } else setContact(value)
  }

  const handleDelete = (id) => {
    if (window.confirm('确定删除该反馈吗？')) {
      fetch('http://localhost:8000/feedbacks/' + id, {
        method: 'DELETE',
      }).then(() => {
        setFeedbacks(
          feedbacks.filter((feedback) => {
            return feedback.id !== id
          })
        )
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const content = { title, details, contact }
    await fetch('http://localhost:8000/feedbacks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(content),
    }).then(() => {
      alert('提交成功，谢谢您的反馈！')
      setFeedbacks([...feedbacks, content])
    })
  }

  useEffect(() => {
    fetch('http://localhost:8000/feedbacks')
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data)
      })
  }, [])

  return (
    <LTYLayout>
      {feedbacks.map((feedback) => {
        return <FeedbackCard feedback={feedback} handleDelete={handleDelete} />
      })}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {textList.map((text, index) => {
          return (
            <TextField
              onChange={(e) => {
                const value = e.target.value
                setContent(index, value)
              }}
              className={classes.text}
              variant="outlined"
              autoFocus={index === 0}
              fullWidth
              required
              label={text.text}
            />
          )
        })}
        <Button
          endIcon={<KeyboardArrowRight />}
          type="submit"
          variant="contained"
          color="primary"
        >
          提交
        </Button>
      </form>
    </LTYLayout>
  )
}
