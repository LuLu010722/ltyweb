import React, { useEffect, useState } from 'react'

import { Grid, makeStyles, Typography } from '@material-ui/core'

import { FeedbackCard } from '../components/FeedbackCard'
import { AddFeedbackInput } from '../components/AddFeedbackInput'
import { Divider } from '../components/Divider'

const useStyles = makeStyles((theme) => {
  return {
    typography: {
      marginBottom: theme.spacing(2),
    },
  }
})

export const FeedbackPage = () => {
  const classes = useStyles()
  const [feedbacks, setFeedbacks] = useState([])

  const refresh = async () => {
    await fetch('http://localhost:8000/feedbacks')
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data)
      })
      .catch((reason) => alert(reason))
  }

  const handleSolve = (id) => {
    if (window.confirm('确定将该bug标记为解决吗？')) {
      const solution = window.prompt('请描述解决方法：')
      if (!!!solution.trim()) {
        window.alert('解决方法不能为空')
        return
      }
      fetch('http://localhost:8000/feedbacks/' + id, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ status: 'info', solution }),
      }).then(() => {
        refresh()
      })
    }
  }

  const handleDelete = (id, type) => {
    if (type === 1) {
      if (window.confirm('确定删除该反馈吗？')) {
        fetch('http://localhost:8000/feedbacks/' + id, {
          method: 'DELETE',
        }).then(() => {
          refresh()
        })
      }
    } else if (type === 2) {
      if (window.confirm('确定删除改解决方法吗？')) {
        fetch('http://localhost:8000/feedbacks/' + id, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ status: 'bug', solution: '' }),
        }).then(() => {
          refresh()
        })
      }
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <>
      <AddFeedbackInput refresh={refresh} />
      <Divider />
      {!!feedbacks.length && (
        <Typography variant="h6" className={classes.typography}>
          bug列表
        </Typography>
      )}
      <Grid container spacing={3}>
        {feedbacks.map((feedback) => {
          return (
            <Grid item key={feedback.id} xs={12} sm={6} md={3}>
              <FeedbackCard
                feedback={feedback}
                handleSolve={handleSolve}
                handleDelete={handleDelete}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
