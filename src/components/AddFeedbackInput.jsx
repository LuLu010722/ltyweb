import { useState } from 'react'

import {
  TextField,
  Button,
  makeStyles,
  Typography,
  Box,
  MenuItem,
} from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'

import { statusList, textList } from '../data/list'

const useStyles = makeStyles((theme) => {
  return {
    textField: {
      display: 'flex',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: `calc(400px + ${theme.spacing(2)}px)`,
    },
    textFieldInBox: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(1),
      width: 200,
    },
  }
})

export const AddFeedbackInput = ({ refresh }) => {
  const classes = useStyles()

  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [details, setDetails] = useState('')
  const [errorTitle, setErrorTitle] = useState(false)
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorDetails, setErrorDetails] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrorTitle(title.trim() === '')
    setErrorStatus(status.trim() === '')
    setErrorDetails(details.trim() === '')
    if (title.trim() === '' || status.trim() === '' || details.trim() === '') {
      return
    }

    const content = { title, status, details }
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
    <Box>
      <Typography variant="h6" gutterBottom>
        报个小bug
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box display="flex">
          <TextField
            className={classes.textFieldInBox}
            variant="outlined"
            required
            error={errorTitle}
            key={textList[0].text}
            label={textList[0].text}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <TextField
            className={classes.textFieldInBox}
            variant="outlined"
            required
            select
            value={status}
            error={errorStatus}
            key={textList[1].text}
            label={textList[1].text}
            onChange={(e) => {
              setStatus(e.target.value)
            }}
          >
            {statusList.map((value) => {
              return (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              )
            })}
          </TextField>
        </Box>
        <TextField
          className={classes.textField}
          variant="outlined"
          required
          error={errorDetails}
          key={textList[2].text}
          label={textList[2].text}
          onChange={(e) => {
            setDetails(e.target.value)
          }}
          multiline
          minRows={3}
        />
        <Button
          endIcon={<KeyboardArrowRight />}
          type="submit"
          variant="contained"
          color="primary"
        >
          提交
        </Button>
      </form>
    </Box>
  )
}
