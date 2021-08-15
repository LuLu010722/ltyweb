import { TextField, Button, makeStyles, Typography } from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import { useState } from 'react'

import { textList } from '../data/list'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: 30,
    },
    text: {
      marginBottom: theme.spacing(2),
      display: 'block',
    },
  }
})

export const AddFeedbackInput = ({ refresh }) => {
  const classes = useStyles()

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [contact, setContact] = useState('')
  const [errorTitle, setErrorTitle] = useState(false)
  const [errorDetails, setErrorDetails] = useState(false)
  const [errorContact, setErrorContact] = useState(false)

  const setContent = (id, value) => {
    if (id === 0) {
      setTitle(value)
    } else if (id === 1) {
      setDetails(value)
    } else setContact(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrorTitle(title.trim() === '')
    setErrorDetails(details.trim() === '')
    setErrorContact(contact.trim() === '')
    if (title.trim() === '' || details.trim() === '' || contact.trim() === '') {
      return
    }

    const content = { title, details, contact }
    fetch('http://localhost:8000/feedbacks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(content),
    }).then(() => {
      alert('提交成功，谢谢您的反馈！')
      refresh()
    })
  }

  return (
    <div className={classes.root}>
      <Typography gutterBottom>反馈</Typography>
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
              fullWidth
              required
              error={
                index === 0
                  ? errorTitle
                  : index === 1
                  ? errorDetails
                  : errorContact
              }
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
    </div>
  )
}
