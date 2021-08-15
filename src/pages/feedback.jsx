import { Button, makeStyles, TextField, Typography } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { LTYLayout } from '../layouts/LTYLayout'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:8000/feedbacks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ title, details, contact }),
    }).then(() => {
      window.alert('提交成功，谢谢您的反馈！')
      setTitle('')
      setDetails('')
      setContact('')
    })
  }

  useEffect(() => {}, [title, details, contact])

  return (
    <LTYLayout>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {textList.map((text, index) => {
          return (
            <TextField
              onChange={(e) => {
                const value = e.target.value
                if (index === 0) {
                  setTitle(value)
                } else if (index === 1) {
                  setDetails(value)
                } else {
                  setContact(value)
                }
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
          color="secondary"
        >
          提交
        </Button>
      </form>
    </LTYLayout>
  )
}
