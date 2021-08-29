import { makeStyles } from '@material-ui/core'
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core'
import { ExpandMoreRounded } from '@material-ui/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { AddDiaryInput } from '../components/AddDiaryInput'
import { Divider } from '../components/Divider'
import { hostPath } from '../data/global'

const parseTimeDiff = (diff) => {
  const second = 1000
  const minute = 60 * 1000
  const hour = 3600 * 1000
  const day = 24 * 3600 * 1000
  if (diff < minute) {
    return '刚刚'
  }
  if (diff < hour) {
    const minuteDiff = parseInt(diff / minute)
    return `${minuteDiff}分钟前`
  }
  if (diff < day) {
    const hourDiff = parseInt(diff / hour)
    return `${hourDiff}小时前`
  }
  const dayDiff = parseInt(diff / day)
  return `${dayDiff}天前`
}

const useStyles = makeStyles((theme) => ({
  timeDiff: {
    fontSize: 12,
    color: theme.palette.text.hint,
  },
}))

export const DiaryPage = () => {
  const classes = useStyles()
  const [diarys, setDiarys] = useState([])

  const refresh = async () => {
    fetch(hostPath + 'diarys')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setDiarys(res)
      })
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <Box>
      {diarys.map((diary, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
              <Typography>{diary.diaryContent}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{diary.diaryContent}</Typography>
              <Typography className={classes.timeDiff}>
                {parseTimeDiff(new Date().getTime() - parseInt(diary.date))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
      <AddDiaryInput refresh={refresh} />
    </Box>
  )
}
