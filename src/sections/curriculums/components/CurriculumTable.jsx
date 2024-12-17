import React from 'react'
// import { columns, users, empty } from "./sample-data";
import { Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react';
import { EyeDropperIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import { useSelector } from 'react-redux';
import { removeResumeThunk, selectAllResumees } from '../../../store/resumee';
import { useCallback } from 'react';
import { selectAllAuthors } from '../../../store/author/authorSlice';
import { useMemo } from 'react';
import { selectResumeesWithAuthors } from '../../../store/common/selectors/selectResumeesWithAuthors';
import { useConfirmBox } from '../../../common/hooks/useConfirmBox';
import { ConfirmBox } from '../../../common/components/ConfirmBox';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const columns = [
    {name: "AUTHOR", uid: "author"},
    {name: "DATE", uid: "modificationDate"},
    {name: "STATUS", uid: "active"},
    {name: "VERSION", uid: "version"},
    {name: "ACTIONS", uid: "actions"},
];


export const CurriculumTable = () => {


    const resumeesWithAuthors = useSelector(selectResumeesWithAuthors);
    const { isLoading, error } = useSelector(state => state.resumees)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {
        isOpen: isModalOpen,
        modalConfig,
        openModal,
        closeModal,
        executeModalAction,
    } = useConfirmBox();

    const handleDelete = (id) => {
        openModal(
            () => onDeleteResumee(id), 
            'Are you sure you want to delete the resumee?', 
            'Delete resumee'
        );
    }


    const onDeleteResumee = (id) => {
        console.log("deleting " + id)
        dispatch(removeResumeThunk(id));
    }

    const onShowResumee = (id) => {
        navigate('curriculum/' + id)
    }

    const onEditResumee = (id) => {
        navigate('curriculum/' + id + '/edit')
    }

    const renderCell = useCallback((resumee, columnKey) => {

        const cellValue = resumee[columnKey];
        switch (columnKey) {
            case "author":
                
                const imageUrl = cellValue.avatar?.url ? `http://localhost:1337${cellValue.avatar?.url}` : null
                const userName = cellValue.firstName ? cellValue.firstName + " " + cellValue.lastName : cellValue.email
                return (
                    <User
                        avatarProps={{ radius: "xl", src: imageUrl}}
                        description={cellValue.email}
                        name={userName}
                    >
                        {cellValue.id}
                    </User>
                );
            case "modificationDate":
                return (
                    <div className="flex flex-col">
                        <p className="font-bold text-tiny capitalize">{cellValue}</p>
                        {/* <p className="text-bold text-sm capitalize text-default-400">{resumee.team}</p> */}
                    </div>
                );
            case "active":
                return (
                    <Chip className="capitalize" color={cellValue ? "success" : "danger"} size="sm" variant="flat">
                        {cellValue ? "Active" : "Inactive"}
                    </Chip>
                );
            case "version":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-3">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon className="size-6 hover:opacity-50" onClick={() => onShowResumee(resumee.id)} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit resumee">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <PencilIcon className="size-6" onClick={() => onEditResumee(resumee.id)}/>
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete resumee">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <TrashIcon className="size-6" onClick={() => handleDelete(resumee.id)}/>
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [resumeesWithAuthors]);

    return (
        <>
        <ConfirmBox 
             isOpen={isModalOpen}
             onAccept={executeModalAction}
             onCancel={closeModal}
             message={modalConfig.message}
             title={modalConfig.title}
            />
            
            
        <Table aria-label="Example table with custom cells" className='rounded-2xl shadow-lg my-2'>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody 
            items={resumeesWithAuthors} 
            emptyContent={"No curriculums to display."}
            isLoading={isLoading}
            loadingContent={<Spinner color="white" />}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
        </>
    );
}
