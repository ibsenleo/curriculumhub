import React from 'react';
import { AcademicCapIcon, BookOpenIcon, ClipboardDocumentCheckIcon, LightBulbIcon, StarIcon, SparklesIcon } from '@heroicons/react/16/solid';

export const authStatus = {
    LOGGED: 'logged',
    NOT_LOGGED: 'not-logged',
    LOGGING: 'logging'
}

export const skillLevels = [
    { key: 0, label: "Novice", icon: React.createElement(AcademicCapIcon, { className: 'size-5' }) },
    { key: 1, label: "Beginner", icon: React.createElement(BookOpenIcon, { className: 'size-5' }) },
    { key: 2, label: "Competent", icon: React.createElement(ClipboardDocumentCheckIcon, { className: 'size-5' }) },
    { key: 3, label: "Proficient", icon: React.createElement(LightBulbIcon, { className: 'size-5' }) },
    { key: 4, label: "Expert", icon: React.createElement(StarIcon, { className: 'size-5' }) },
    { key: 5, label: "Specialist", icon: React.createElement(SparklesIcon, { className: 'size-5 text-yellow-500' }) }
];