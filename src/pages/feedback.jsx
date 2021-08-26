import React, { useEffect, useState } from 'react'

import { Grid, makeStyles, Typography } from '@material-ui/core'
import Masonry from 'react-masonry-css'

import { FeedbackCard } from '../components/FeedbackCard'
import { AddFeedbackInput } from '../components/AddFeedbackInput'
import { Divider } from '../components/Divider'
import { hostPath } from '../data/global'

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

  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    1000: 2,
    600: 1,
  }

  const refresh = async () => {
    await fetch(hostPath + "feedbacks/")
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data)
      })
      .catch((reason) => alert(reason))
  }

  const handleSolve = (id, solution) => {
    fetch(hostPath + "feedbacks/" + id, {
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
      await fetch(hostPath + "feedbacks/" + id, {
        method: 'DELETE',
      })
    } else {
      await fetch(hostPath + "feedbacks/" + id, {
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
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {feedbacks.map((feedback) => {
          return (
            <div key={feedback.id}>
              <FeedbackCard
                feedback={feedback}
                handleSolve={handleSolve}
                handleDelete={handleDelete}
              />
            </div>
          )
        })}
      </Masonry>
    </>
  )
}
