import React, { useState } from 'react'

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  makeStyles,
  Collapse,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core'
import {
  CheckCircleOutlineRounded,
  DeleteOutlined,
  ExpandMoreRounded,
} from '@material-ui/icons'

import { Divider } from './Divider'
import { DialogSolve } from './DialogSolve'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: ({ status }) =>
        status === 'bug'
          ? theme.palette.error.light
          : status === 'todo'
          ? theme.palette.warning.light
          : theme.palette.info.light,
    },
    avatar: {
      backgroundColor: ({ status }) =>
        status === 'bug'
          ? theme.palette.error.dark
          : status === 'todo'
          ? theme.palette.warning.dark
          : theme.palette.info.dark,
    },
    solutionAvatar: {
      backgroundColor: theme.palette.success.main,
    },
    expandIconButton: ({ expand }) => ({
      transform: `rotate(${expand ? 180 : 0}deg)`,
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard,
      }),
    }),
  }
})

export const FeedbackCard = ({
  feedback,
  handleDelete,
  handleSolve,
  solution,
  setSolution,
}) => {
  const [expand, setExpand] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const classes = useStyles({ status: feedback.status, expand })

  const handleExpand = () => {
    setExpand(!expand)
  }

  return (
    <Box>
      <Card className={classes.root} elevation={3}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>#{feedback.id}</Avatar>}
          title={feedback.title}
          subheader={feedback.status.toUpperCase() + '#' + feedback.id}
          action={
            <>
              <IconButton
                disabled={feedback.status === 'info'}
                onClick={() => setDialogOpen(true)}
              >
                <CheckCircleOutlineRounded />
              </IconButton>
              <DialogSolve
                title="请描述解决方法"
                textFieldLabel="方法"
                feedback={feedback}
                open={dialogOpen}
                solution={solution}
                setOpen={setDialogOpen}
                setSolution={setSolution}
                handleSolve={handleSolve}
              />
              <IconButton
                disabled={feedback.status === 'info'}
                onClick={() => handleDelete(feedback.id, 1)}
              >
                <DeleteOutlined />
              </IconButton>
            </>
          }
        />
        <CardContent>
          <Typography>{feedback.details}</Typography>
        </CardContent>
        {feedback.solution && (
          <>
            <Divider />
            <CardHeader
              title="解决方法"
              avatar={<Avatar className={classes.solutionAvatar}>S</Avatar>}
              action={
                <>
                  <IconButton onClick={handleExpand}>
                    <ExpandMoreRounded className={classes.expandIconButton} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      handleDelete(feedback.id, 2)
                      setExpand(false)
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </>
              }
            />
            <Collapse in={expand} timeout="auto">
              <CardContent>
                <Typography>{feedback.solution}</Typography>
              </CardContent>
            </Collapse>
          </>
        )}
      </Card>
    </Box>
  )
}
