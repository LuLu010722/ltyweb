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
} from '@material-ui/icons'
import Swal from 'sweetalert2'

import { Divider } from './Divider'

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

export const FeedbackCard = ({ feedback, handleSolve, handleDelete }) => {
  const [expand, setExpand] = useState(false)
  const classes = useStyles({ status: feedback.status, expand })

  const handleExpand = () => {
    setExpand(!expand)
  }

  return (
    <Box>
      <Card className={classes.root} elevation={3}>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>#{feedback.id}</Avatar>}
          action={
            <>
              <IconButton
                disabled={feedback.status === 'info'}
                onClick={async () => {
                  const { value: solution } = await Swal.fire({
                    icon: 'info',
                    title: '请描述解决方法',
                    input: 'text',
                    inputLabel: '解决方法',
                    inputAutoTrim: true,
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValidator: (value) => {
                      if (!value) {
                        return '解决方法不能为空！'
                      }
                    },
                  })
                  if (solution) {
                    await Swal.fire({
                      icon: 'success',
                      title: '成功解决，靓仔！',
                    })
                    handleSolve(feedback.id, solution)
                  }
                }}
              >
                <CheckCircleOutlineRounded />
              </IconButton>
              <IconButton
                onClick={() => {
                  Swal.fire({
                    icon: 'warning',
                    title: '确定要删除该卡片吗？',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                  }).then(async (isConfirmed) => {
                    if (isConfirmed.value) {
                      await Swal.fire({
                        icon: 'success',
                        title: '删除成功！',
                      })
                      handleDelete(feedback.id, 1)
                    }
                  })
                }}
              >
                <DeleteOutlined />
              </IconButton>
            </>
          }
        />
        <CardHeader
          title={feedback.title}
          subheader={feedback.status.toUpperCase() + '#' + feedback.id}
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
                      Swal.fire({
                        icon: 'warning',
                        title: '你确定要删除该解决方法吗？',
                        text: '删除后，该卡片将会被变为bug或todo',
                        showCancelButton: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                      }).then(async (isConfirmed) => {
                        if (isConfirmed.value) {
                          await Swal.fire({
                            icon: 'success',
                            title: '删除成功！',
                          })
                          handleDelete(feedback.id, 2, feedback.initialStatus)
                          setExpand(false)
                        }
                      })
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
