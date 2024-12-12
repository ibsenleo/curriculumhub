import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid'
import { Button, Chip } from '@nextui-org/react'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'



export const EducationItem = ({ item, onEdit, onDelete }) => {

    return (
        <div 
        className={`${false ? 'dark:bg-zinc-700 bg-zinc-300' : 'dark:bg-zinc-900 bg-zinc-100'} dark:border-zinc-700 rounded-lg shadow-lg my-3 p-3 text-sm animate-shake animate-duration-500 animate-once`} 
        key={"experience" + "-" + item.id}>
            <div className='grid grid-cols-2'>
                <div className='text-xs dark:text-zinc-700 text-zinc-300'>Education {item.id}</div>
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
            <div className='text-xl'><span className='font-bold text-zinc-500'></span>{item.degree} - {item.institution} </div>
            <div className='my-1'><span className='font-bold text-zinc-500'></span><Chip size='sm'>{item.startYear} </Chip> - <Chip size='sm'>{item.endYear || 'current'} </Chip></div>
            <div><span className='font-bold text-zinc-500'>Description: </span><div style={{ "whiteSpace": 'pre-wrap' }}>{item.description || 'current'}</div></div>
        </div>
    )
}