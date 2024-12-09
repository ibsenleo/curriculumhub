import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid'
import { Button, Chip } from '@nextui-org/react'
import React from 'react'

export const CertificationItem = ({ item, onEdit, onDelete }) => {
    return (
        <div
            className={`${false ? 'dark:bg-zinc-700 bg-zinc-300' : 'dark:bg-zinc-900 bg-zinc-100'} dark:border-zinc-700 border-zinc-300 border  rounded-lg shadow-lg my-3 p-3 text-sm animate-shake animate-duration-500 animate-once`}
            key={item.id}>
            <div className='grid grid-cols-2'>
                <div>Experience {item.id}</div>
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
            <div className='text-xl'><span className='font-bold text-zinc-500'>Certification: </span>{item.certificationName} </div>
            <div className='text-xl'><span className='font-bold text-zinc-500'>Issuer: </span>{item.authority} </div>
            <div className='my-1'><span className='font-bold text-zinc-500'>Issue date: </span><Chip size='sm'>{item.issueDate} </Chip></div>
            <div className='my-1'><span className='font-bold text-zinc-500'>Expiration date: </span><Chip size='sm'>{item.expirationDate || 'current'} </Chip></div>
        </div>
    )
}
