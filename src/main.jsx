import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CurriculumHubApp } from './CurriculumHubApp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurriculumHubApp />
  </StrictMode>,
)
