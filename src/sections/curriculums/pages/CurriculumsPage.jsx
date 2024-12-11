import React from 'react'
import { TopBarLayout } from '../../../common/layouts/TopBarLayout'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { CurriculumTable } from '../components/CurriculumTable'
import { useDispatch } from 'react-redux'
import { fetchResumeesThunk, selectAllResumees, selectResumeeTotal } from '../../../store/resumee'
import { fetchAndSetOffices } from '../../../store/staticData/staticDataThunks'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectOfficesTotal } from '../../../store/staticData/staticDataSlice'

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
        <div className='border-zinc-700 border bg-zinc-900 p-5 rounded-lg shadow-lg gap-3 flex'>
          <Button
          onClick={onNewCurriculum}>Add new</Button>
          <Button onClick={onTest}>Refresh</Button>
        </div>

        <CurriculumTable/>
    </TopBarLayout>
  )
}
