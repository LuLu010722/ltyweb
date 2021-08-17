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
} from '@material-ui/core'
import {
  CheckCircleOutlineRounded,
  DeleteOutlined,
  ExpandMoreRounded,
} from "@material-ui/icons";

import { Divider } from "./Divider";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: ({ status }) =>
        status === 'bug' ? theme.palette.error.light : theme.palette.info.light,
    },
    avatar: {
      backgroundColor: ({ status }) =>
        status === 'bug' ? theme.palette.error.dark : theme.palette.info.dark,
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

export const FeedbackCard = ({ feedback, handleDelete, handleSolve }) => {
  const [expand, setExpand] = useState(false)
  const status = feedback.status
  const classes = useStyles({ status, expand })

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <Box>
      <Card className={classes.root} elevation={3}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>#{feedback.id}</Avatar>}
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
                    <ExpandMoreRounded className={classes.expandIconButton} />
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
    </Box>
  )
}
