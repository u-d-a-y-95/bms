import { CustomModal, ICustomModalProps } from "@/components/util/customModal";
import { FC, ReactNode, createContext, useContext, useState } from "react";

const Context = createContext({
  open: (data: any) => {},
});

interface IModalsProvider {
  children: ReactNode;
}

export const ModalsProvider: FC<IModalsProvider> = ({
  children,
}: IModalsProvider) => {
  const [modal, setModal] = useState({
    opened: false,
    data: {},
  });
  const open = (data: ICustomModalProps) => {
    setModal({
      opened: true,
      data,
    });
  };
  const closeModal = () => {
    setModal({
      opened: false,
      data: {},
    });
  };
  return (
    <Context.Provider
      value={{
        open,
      }}
    >
      <CustomModal modal={modal} closeModal={closeModal} />
      {children}
    </Context.Provider>
  );
};

export const useCustomModal = () => useContext(Context);
