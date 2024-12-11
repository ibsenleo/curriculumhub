import React from 'react'
import { TopBar, TopBarLayout } from '../../../common'
import { CurriculumProvider } from '../context/CurriculumContext'

export const TopBarLayoutProvider = ({children, className}) => {
  return (
    <CurriculumProvider>
        <TopBarLayout className={className}>
            {children}
        </TopBarLayout>
    </CurriculumProvider>
  )
}
