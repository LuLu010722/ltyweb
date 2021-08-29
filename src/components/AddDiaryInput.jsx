import { Button, makeStyles } from '@material-ui/core'
import { Box, TextField, Typography } from '@material-ui/core'
import { KeyboardArrowRightRounded } from '@material-ui/icons'
import { useState } from 'react'
import { hostPath } from '../data/global'
import { Divider } from './Divider'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}))

export const AddDiaryInput = ({ refresh }) => {
  const classes = useStyles()
  const [diaryContent, setDiaryContent] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(hostPath + 'diarys', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ diaryContent }),
    }).then(() => {
      refresh()
    })
  }

  return (
    <Box>
      <Divider />
      <Typography variant="h6">说说今天干了啥呗quq</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          variant="outlined"
          fullWidth
          label="内容"
          onChange={(e) => {
            setDiaryContent(e.target.value)
          }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<KeyboardArrowRightRounded />}
        >
          提交
        </Button>
      </form>
    </Box>
  )
}
