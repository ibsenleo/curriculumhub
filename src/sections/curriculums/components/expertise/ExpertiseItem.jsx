import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid'
import { Button } from '@nextui-org/react'
import React from 'react'

export const ExpertiseItem = ({ item, onEdit, onDelete }) => {
  return (
    <div
            className={`${false ? 'dark:bg-zinc-700 bg-zinc-300' : 'dark:bg-zinc-900 bg-zinc-100'} dark:border-zinc-700 border-zinc-300 border  rounded-lg shadow-lg my-3 p-3 text-sm animate-shake animate-duration-500 animate-once`}
            key={"expertise" + "-" + item.id}>
            <div className='grid grid-cols-2'>
                <div>Expertise {item.id}</div>
                <div className='flex justify-end gap-3'>
                    <Button
                        onClick={() => onEdit(item)}
                        isIconOnly
                        radius='lg'>
                        <PencilIcon className='size-4' />
                    </Button>
                    <Button
                        onClick={() => onDelete(item.id)}
                        isIconOnly
                        radius='lg'>
                        <TrashIcon className='size-4' color='danger' />
                    </Button>
                </div>
            </div>
            <div className='text-xl'><span className='font-bold text-zinc-500'>Expertise Name: </span>{item.expertiseName} </div>
            <div className='text-xl'><span className='font-bold text-zinc-500'>Expertise Years: </span>{item.expertiseYears} </div>
            <div><span className='font-bold text-zinc-500'>Expertise description: </span><div style={{ "whiteSpace": 'pre-wrap' }}>{item.expertiseDescription || 'No description provided'}</div></div>
        </div>
  )
}
