import { useDeleteEmployee, useGetEmployees } from "@/hooks/apis/employee";
import { Box, Button, Divider, Flex, Input, Title } from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { IconFilter, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { EmployeeTableList } from "./employeeListTable";
import { EmployeeModal } from "./employeeModal";

interface IModal {
  opened: boolean;
  state: string | null;
  data: any;
}

export default function Employee() {
  const [modal, setModal] = useState<IModal>({
    opened: false,
    state: null,
    data: {},
  });
  const [filter, setFilter] = useState({
    activePage: 1,
    search: "",
  });
  const [search, setSearch] = useDebouncedState("", 500);
  const { data, isLoading, isFetching } = useGetEmployees(filter);
  const { mutate } = useDeleteEmployee();
  const setActivePage = (page: number) => {
    setFilter({
      ...filter,
      activePage: page,
    });
  };
  useEffect(() => {
    setFilter({
      ...filter,
      activePage: 1,
      search,
    });
  }, [search]);

  const deleteEmployee = (id: string) => {
    mutate(id);
  };
  const addEmployee = () => {
    setModal({
      opened: true,
      state: "add",
      data: {},
    });
  };
  const viewEmployeeById = (id: string) => {
    setModal({
      opened: true,
      state: "view",
      data: {
        id,
      },
    });
  };

  const editEmployeeById = (id: string) => {
    setModal({
      opened: true,
      state: "edit",
      data: {
        id,
      },
    });
  };

  const closeModal = () => {
    setModal({
      opened: false,
      state: null,
      data: {},
    });
  };

  return (
    <>
      <Title order={3}>Employee</Title>
      <Flex mt="10px" justify="space-between">
        <Box w="30%">
          <Input
            placeholder="search"
            onChange={(e) => {
              setSearch(e.target.value);
              // setActivePage(1);
            }}
          />
        </Box>
        <Flex gap="5px">
          <Button
            leftIcon={<IconPlus size={"1rem"} />}
            color="gray"
            variant="light"
            onClick={addEmployee}
          >
            Add
          </Button>
          <Button
            leftIcon={<IconFilter size={"1rem"} />}
            color="gray"
            variant="light"
          >
            Filter
          </Button>
        </Flex>
      </Flex>
      <Divider my="sm" />
      <EmployeeTableList
        employees={data?.data?.employees}
        total={data?.data?.total}
        isLoading={isLoading || isFetching}
        activePage={filter.activePage}
        setActivePage={setActivePage}
        deleteEmployee={deleteEmployee}
        viewEmployeeById={viewEmployeeById}
        editEmployeeById={editEmployeeById}
      />
      <EmployeeModal modal={modal} opened={modal.opened} close={closeModal} />
    </>
  );
}
