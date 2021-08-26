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
import Swal from 'sweetalert2'

import { statusList, textList } from '../data/global'
import { hostPath } from '../data/global'

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
      Swal.fire({
        icon: 'error',
        title: '内容都要填写哟quq',
      })
      return
    }

    const content = {
      title,
      status,
      details,
      solution: '',
      initialStatus: status,
    }
    fetch(hostPath + 'feedbacks/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(content),
    })
      .then(async () => {
        await Swal.fire({
          icon: 'success',
          title: '提交成功！谢谢你呀quq',
        })
        refresh()
        setTitle('')
        setStatus('')
        setDetails('')
      })
      .catch((reason) => {
        console.log(reason)
      })
  }

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.keyCode === 13) {
      handleSubmit(e)
    }
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
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <TextField
            className={classes.textFieldInBox}
            variant="outlined"
            required
            select
            error={errorStatus}
            key={textList[1].text}
            label={textList[1].text}
            value={status}
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
          value={details}
          onChange={(e) => {
            setDetails(e.target.value)
          }}
          onKeyDown={handleKeyDown}
          placeholder="ctrl+enter可以快捷提交哟"
          multiline
          minRows={3}
        />
        <Button
          endIcon={<KeyboardArrowRight />}
          focusRipple={false}
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
