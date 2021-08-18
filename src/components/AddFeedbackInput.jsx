import { useState } from 'react'

import {
  TextField,
  Button,
  makeStyles,
  Typography,
  Box,
  Select,
  MenuItem,
  List,
  Menu,
  MenuList,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'

import { menuList, statusList, textList } from '../data/list'

const useStyles = makeStyles((theme) => {
  return {
    text: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }
})

export const AddFeedbackInput = ({ refresh }) => {
  const classes = useStyles()

  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [details, setDetails] = useState('')
  const [contact, setContact] = useState('')
  const [errorTitle, setErrorTitle] = useState(false)
  const [errorStatus, setErrorStatus] = useState(false)
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
    setErrorStatus(status.trim() === '')
    setErrorDetails(details.trim() === '')
    setErrorContact(contact.trim() === '')
    if (
      title.trim() === '' ||
      status.trim() === '' ||
      details.trim() === '' ||
      contact.trim() === ''
    ) {
      return
    }

    const content = { title, details, contact, status }
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
            className={classes.text}
            variant="outlined"
            fullWidth
            required
            error={errorTitle}
            key={textList[0].text}
            label={textList[0].text}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <Box width="10%" />
          <TextField
            className={classes.text}
            variant="outlined"
            fullWidth
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
          <Box width="100%" />
        </Box>
        <TextField
          className={classes.text}
          variant="outlined"
          fullWidth
          required
          error={errorDetails}
          key={textList[2].text}
          label={textList[2].text}
          onChange={(e) => {
            setDetails(e.target.value)
          }}
        />
        <TextField
          className={classes.text}
          variant="outlined"
          fullWidth
          required
          error={errorContact}
          key={textList[3].text}
          label={textList[3].text}
          onChange={(e) => {
            setContact(e.target.value)
          }}
        />
        <Button
          className={classes.text}
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
