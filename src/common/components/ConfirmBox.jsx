import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'

export const ConfirmBox = ({isOpen, onAccept, onCancel, message, title="Alert"}) => {
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleAccept = () => {
      if (onAccept) {
        onAccept(); // Ejecuta la acción proporcionada
      }
      onCancel(); // Cierra el modal
    };
  return (
    <Modal isOpen={isOpen} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>
                  {message}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onCancel}>
                  No
                </Button>
                <Button color="primary" onPress={handleAccept}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}
