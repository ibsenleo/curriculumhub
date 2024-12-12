import React from 'react'
import { useCurriculum } from '../context/CurriculumContext'
import { Button } from '@nextui-org/react'
import { camelToSnakeDeepWithoutId } from '../../../helpers/globals'
import { useDispatch } from 'react-redux'
import { createResumeeThunk } from '../../../store/resumee'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'



export const SaveCurriculumButton = ({formdata, onSubmitForm = () => {}}) => {
    const { curriculumData, clearAll } = useCurriculum()
    const dispatch = useDispatch();

    const {isLoading, error} = useSelector((state) => state.resumees);
    
    const onSaveCurriculum = async ()=>{
        const payload = {...curriculumData, ...formdata}
        const formattedPayload = camelToSnakeDeepWithoutId(payload);
        console.log(formattedPayload)
        

        try {
            const resultAction = await dispatch(createResumeeThunk(formattedPayload));
            if (createResumeeThunk.fulfilled.match(resultAction)) {
                toast.success("Curriculum saved successfully!");
                onSubmitForm(); // Lógica para continuar
                clearAll()
            } else {
                toast.error(`Failed to save curriculum: ${resultAction.error.message}`);
            }            
        } catch (error) {
            toast.error(`An unexpected error occurred: ${error.message}`);
        }
        
    }
    if(error) {
        toast.error(error)
    }
    return (
        <div className='flex justify-end'>
            <Button className='' color='primary' isLoading={isLoading} onClick={onSaveCurriculum}>Save Curriculum</Button>
        </div>
    )
}
