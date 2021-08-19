import React, { useState } from 'react'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  makeStyles,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}))

export const DialogSolve = ({
  open,
  feedback,
  title,
  textFieldLabel,
  solution,
  setSolution,
  setOpen,
  handleSolve,
}) => {
  const classes = useStyles()
  const [isEmpty, setIsEmpty] = useState(false)

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
        setIsEmpty(false)
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      {isEmpty && (
        <DialogContent>
          <Alert variant="outlined" severity="warning">
            内容不能为空
          </Alert>
        </DialogContent>
      )}
      <DialogContent>
        <TextField
          variant="outlined"
          autoFocus
          fullWidth
          required
          multiline
          minRows={3}
          maxRows={3}
          label={textFieldLabel}
          onChange={(e) => {
            setSolution(e.target.value)
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => {
            if (solution.trim() === '') {
              setIsEmpty(true)
              return
            }
            setOpen(false)
            setIsEmpty(false)
            handleSolve(feedback.id)
          }}
        >
          确定
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          onClick={() => {
            setOpen(false)
            setSolution('')
            setIsEmpty(false)
          }}
        >
          取消
        </Button>
      </DialogActions>
    </Dialog>
  )
}
