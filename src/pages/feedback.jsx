import { Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { LTYLayout } from '../layouts/LTYLayout'
import { FeedbackCard } from '../components/FeedbackCard'

import { AddFeedbackInput } from '../components/AddFeedbackInput'
import { Divider } from '../components/Divider'

export const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [loaded, setLoaded] = useState(false)

  const refresh = async () => {
    setLoaded(false)
    await fetch('http://localhost:8000/feedbacks')
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data)
      })
      .catch((reason) => alert(reason))
    setLoaded(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('确定删除该反馈吗？')) {
      fetch('http://localhost:8000/feedbacks/' + id, {
        method: 'DELETE',
      }).then(() => {
        refresh()
      })
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <LTYLayout>
      {loaded && <AddFeedbackInput refresh={refresh} />}
      <Divider />
      {!!feedbacks.length && <Typography gutterBottom>游客反馈列表</Typography>}
      <Grid container spacing={3}>
        {feedbacks.map((feedback) => {
          return (
            <Grid item key={feedback.id} xs={12} sm={6} md={3}>
              <FeedbackCard feedback={feedback} handleDelete={handleDelete} />
            </Grid>
          )
        })}
      </Grid>
    </LTYLayout>
  )
}
