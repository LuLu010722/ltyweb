import React from 'react'
import { useState } from 'react'

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  makeStyles,
  Collapse,
  duration,
} from '@material-ui/core'
import {
  CheckCircleOutlineRounded,
  DeleteOutlined,
  ExpandMoreRounded,
} from '@material-ui/icons'

import { Divider } from './Divider'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: (feedback) => {
        return feedback.status === 'bug'
          ? theme.palette.error.light
          : theme.palette.info.light
      },
    },
    avatar: {
      backgroundColor: (feedback) => {
        return feedback.status === 'bug'
          ? theme.palette.error.dark
          : theme.palette.info.dark
      },
    },
    deleteSolutionButton: {
      marginLeft: 'auto',
    },
    solutionAvatar: {
      backgroundColor: theme.palette.success.main,
    },
    expandIconButton: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard,
      }),
    },
    expandIconButtonOpen: {
      transform: 'rotate(180deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.standard,
      }),
    },
  }
})

export const FeedbackCard = ({ feedback, handleDelete, handleSolve }) => {
  const [expand, setExpand] = useState(false)
  const ex = expand
  const classes = useStyles(feedback)

  const handleExpand = () => {
    setExpand(!expand)
  }

  return (
    <div>
      <Card className={classes.root} elevation={3}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>{feedback.title[0]}</Avatar>
          }
          title={feedback.title}
          action={
            <>
              <IconButton onClick={() => handleSolve(feedback.id)}>
                <CheckCircleOutlineRounded />
              </IconButton>
              <IconButton onClick={() => handleDelete(feedback.id, 1)}>
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
                    <ExpandMoreRounded
                      className={
                        expand
                          ? classes.expandIconButtonOpen
                          : classes.expandIconButton
                      }
                    />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(feedback.id, 2)}>
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
    </div>
  )
}
