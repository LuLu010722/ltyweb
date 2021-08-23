import React, { useEffect, useState } from 'react'

import { Grid, makeStyles, Typography } from '@material-ui/core'

import { FeedbackCard } from '../components/FeedbackCard'
import { AddFeedbackInput } from '../components/AddFeedbackInput'
import { Divider } from '../components/Divider'

const host = 'http://localhost:4000/feedbacks/'

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
    await fetch(host)
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data)
      })
      .catch((reason) => alert(reason))
  }

  const handleSolve = (id, solution) => {
    fetch(host + id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ status: 'info', solution }),
    }).then(() => {
      refresh()
    })
  }

  /**
   * @param type indicate what content you want to delete.
   *             1 for the whole card,
   *             2 for the solution
   */
  const handleDelete = async (id, type, initialStatus) => {
    if (type === 1) {
      await fetch(host + id, {
        method: 'DELETE',
      })
    } else {
      await fetch(host + id, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ status: initialStatus, solution: '' }),
      })
    }
    refresh()
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
            <Grid item key={feedback.id} xs={12} sm={6} md={4} lg={3} xl={2}>
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
