import React from 'react'
import { TopBarLayout } from '../../../common/layouts/TopBarLayout'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { CurriculumTable } from '../components/CurriculumTable'
import { useDispatch } from 'react-redux'
import { fetchResumeesThunk } from '../../../store/resumee'

export const CurriculumsPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onNewCurriculum = () => {
    navigate('/new')
  }

  const onTest = () => {
    dispatch(fetchResumeesThunk())
  }
  return (
    <TopBarLayout>
        <div className='border-zinc-700 border bg-zinc-900 p-5 rounded-lg shadow-lg'>
          <Button
          onClick={onNewCurriculum}>Add new</Button>
          <Button onClick={onTest}>Test</Button>
        </div>

        <CurriculumTable/>
    </TopBarLayout>
  )
}
