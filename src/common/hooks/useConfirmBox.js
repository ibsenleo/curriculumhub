import { useState, useCallback } from 'react';

export const useConfirmBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        action: null,
        message: '',
        title: '',
        actionArgs: null,
    });

    const openModal = useCallback((action, message, title, actionArgs = null) => {
        setModalConfig({ action, message, title, actionArgs });
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setModalConfig({ action: null, message: '', title: '', actionArgs: null });
    }, []);

    const executeModalAction = useCallback(() => {
        if (modalConfig.action) {
            modalConfig.action(modalConfig.actionArgs);
        }
        closeModal();
    }, [modalConfig, closeModal]);

    return {
        isOpen,
        modalConfig,
        openModal,
        closeModal,
        executeModalAction,
    };
};