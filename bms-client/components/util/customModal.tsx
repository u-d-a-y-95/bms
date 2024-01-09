import { Button, ButtonProps, Flex, Modal } from "@mantine/core";
import { FC, ReactNode } from "react";

interface ICutomModalData {
  title?: string;
  labels?: {
    ok?: string;
    cancel?: string;
  };
  cancelProps?: ButtonProps;
  okProps?: ButtonProps;
  children?: string | ReactNode;
  onOk?: Function;
  onCancel?: Function;
}

export interface ICustomModalProps {
  modal: {
    opened: boolean;
    data: ICutomModalData;
  };
  closeModal: Function;
}

export const CustomModal: FC<ICustomModalProps> = ({
  modal,
  closeModal,
}: ICustomModalProps) => {
  const {
    title = "",
    labels = {},
    cancelProps,
    okProps,
    children,
    onOk,
    onCancel,
  } = modal.data;

  const cancelHandler = () => {
    closeModal();
    onCancel && onCancel;
  };
  const okHandler = () => {
    closeModal();
    onOk && onOk();
  };

  return (
    <Modal
      opened={modal.opened}
      onClose={() => closeModal()}
      title={title}
      centered
    >
      {children}
      <Flex justify="right" gap="sm" mt="md">
        <Button {...cancelProps} onClick={cancelHandler}>
          {labels.cancel}
        </Button>
        <Button {...okProps} onClick={okHandler}>
          {labels.ok}
        </Button>
      </Flex>
    </Modal>
  );
};
