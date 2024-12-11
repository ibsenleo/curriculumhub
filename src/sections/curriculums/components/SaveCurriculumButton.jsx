import React from 'react'
import { useCurriculum } from '../context/CurriculumContext'
import { Button } from '@nextui-org/react'
import { camelToSnakeDeepWithoutId } from '../../../helpers/globals'



export const SaveCurriculumButton = ({formdata}) => {
    const { curriculumData } = useCurriculum()
    
    const onSaveCurriculum = ()=>{
        const payload = {...curriculumData, ...formdata}
        console.log(camelToSnakeDeepWithoutId(payload));

        console.log(JSON.stringify(camelToSnakeDeepWithoutId(payload)));
        
    }
    return (
        <div className='flex justify-end'>
            <Button className='' color='primary' onClick={onSaveCurriculum}>Save Curriculum</Button>
        </div>
    )
}
