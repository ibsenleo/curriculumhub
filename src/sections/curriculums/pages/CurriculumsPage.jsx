import { Button } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { TopBarLayout } from '../../../common/layouts/TopBarLayout'
import { fetchResumeesThunk, selectResumeeTotal } from '../../../store/resumee'
import { selectOfficesTotal } from '../../../store/staticData/staticDataSlice'
import { fetchAndSetOffices } from '../../../store/staticData/staticDataThunks'
import { CurriculumTable } from '../components/CurriculumTable'

export const CurriculumsPage = () => {
  const navigate = useNavigate();
  const resumeesLoaded = useSelector(selectResumeeTotal) > 0;
  const officesLoaded = useSelector(selectOfficesTotal) > 0;
  
  const dispatch = useDispatch();
  const onNewCurriculum = () => {
    navigate('/new')
  }

  useEffect(() => {

    if(!resumeesLoaded) dispatch(fetchResumeesThunk())
    if(!officesLoaded) dispatch(fetchAndSetOffices())

  }, [])
  

  const onTest = () => {
    dispatch(fetchResumeesThunk())
    dispatch(fetchAndSetOffices())
  }
  return (
    <TopBarLayout>
        <div className=' dark:bg-zinc-900 bg-zinc-100 p-5 rounded-lg shadow-lg gap-3 flex'>
          <Button
          onClick={onNewCurriculum}>Add new</Button>
          <Button onClick={onTest}>Refresh</Button>
        </div>

        <CurriculumTable/>
    </TopBarLayout>
  )
}
