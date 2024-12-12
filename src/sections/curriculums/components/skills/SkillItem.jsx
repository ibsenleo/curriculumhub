import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid'
import { Button } from '@nextui-org/react'
import React from 'react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'



export const SkillItem = ({ item, onEdit, onDelete }) => {

    const {skillLevels} = useSelector(state => state.staticData)

    
    const getSkillLevel = useCallback((value) => {
        return skillLevels.find(sk => sk.key == value)
    },[skillLevels])

    const level= (getSkillLevel(item.level))
  return (
    <div
            className={`${false ? 'dark:bg-zinc-700 bg-zinc-300' : 'dark:bg-zinc-900 bg-zinc-100'}   rounded-lg shadow-lg my-3 p-3 text-sm animate-shake animate-duration-500 animate-once`}
            key={"skill" + "-" + item.id}>
            <div className='grid grid-cols-2'>
                <div>Skill {item.id}</div>
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
            <div className='text-xl'><span className='font-bold text-zinc-500'>Skill Name: </span>{item.name} </div>
            <div className=' flex items-center'>
                <span className='font-bold text-zinc-500'>Skill Level: </span>  
                <span className="ml-1" style={{ display: 'inline-flex' }}>{level.icon}</span>
                <span className=''>{level.label}</span> 
            </div>
        </div>
  )
}
