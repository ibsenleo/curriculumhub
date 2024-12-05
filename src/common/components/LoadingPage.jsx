import { Spinner } from '@nextui-org/react'
import React from 'react'

export const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-zinc-800 bg-zinc-100">
        <div className="flex gap-4">
            <Spinner size="lg" />
        </div> 
    </div>
  )
}
