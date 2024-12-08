import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'

export const ConfirmBox = ({isOpen, onAccept, onCancel, message, title="Alert"}) => {
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const onOpenChange = ()=>{
        console.log(isOpen)
    }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                <Button color="primary" onPress={onAccept}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}
