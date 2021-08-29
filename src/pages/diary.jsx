import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import { useState } from 'react'
import { useEffect } from 'react'
import { AddDiaryInput } from '../components/AddDiaryInput'
import { hostPath } from '../data/global'

export const DiaryPage = () => {
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
            <AccordionSummary>{diary.diaryContent}</AccordionSummary>
            <AccordionDetails>{diary.diaryContent}</AccordionDetails>
          </Accordion>
        )
      })}
      <AddDiaryInput refresh={refresh} />
    </Box>
  )
}
