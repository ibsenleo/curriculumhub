import React from 'react'
import { columns, users, empty } from "./sample-data";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react';
import { EyeDropperIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import { useSelector } from 'react-redux';
import { selectAllResumees } from '../../../store/resumee';
import { useCallback } from 'react';
import { selectAllAuthors } from '../../../store/author/authorSlice';
import { useMemo } from 'react';
import { selectResumeesWithAuthors } from '../../../store/common/selectors/selectResumeesWithAuthors';


export const CurriculumTable = () => {


    const resumeesWithAuthors = useSelector(selectResumeesWithAuthors);

    const renderCell = useCallback((resumee, columnKey) => {

        const cellValue = resumee[columnKey];
        switch (columnKey) {
            case "author":
                const imageUrl = cellValue.avatar?.url ? `http://localhost:1337${cellValue.avatar.url}` : null
                const userName = cellValue.first_name ? cellValue.first_name + " " + cellValue.last_name : cellValue.email
                return (
                    <User
                        avatarProps={{ radius: "xl", src: imageUrl}}
                        description={cellValue.email}
                        name={userName}
                    >
                        {cellValue.id}
                    </User>
                );
            case "modification_date":
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
                    <div className="relative flex items-center justify-items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon className="size-4" />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit resumee">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <PencilIcon className="size-4" />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete resumee">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <TrashIcon className="size-4" />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells" className='border-zinc-700 border rounded-2xl shadow-lg my-2'>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={resumeesWithAuthors} emptyContent={"No rows to display."}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
