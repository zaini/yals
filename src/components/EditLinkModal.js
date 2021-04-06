import React from "react";
import { IconButton } from "@chakra-ui/react";
import {
  Button,
  Input,
  Select,
  InputLeftAddon,
  InputGroup,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";

const domain = process.env.REACT_APP_DOMAIN;

const EditLinkModal = ({ link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, errors, setError, reset } = useForm();

  const [editLink, { loading: edit_loading }] = useMutation(EDIT_LINK, {
    onCompleted(res) {
      if (res.editLink.errors) {
        res.editLink.errors.forEach(({ field, message }) => {
          setError(field, { type: "manual", message });
        });
      } else {
        console.log("Successfully edited link");
        onClose();
      }
    },
    onError(_) {
      console.log(_);
    },
  });

  const onEdit = (data) => {
    editLink({ variables: { ...data, new_expiry: data.expiry_time } });
  };

  return (
    <>
      <IconButton m={2} icon={<EditIcon />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onEdit)}>
            <ModalHeader>Edit Link</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isReadOnly={true} mt={4}>
                <InputLeftAddon children="ID" />
                <Input
                  ref={register}
                  type="text"
                  name="id"
                  defaultValue={link.id}
                />
              </FormControl>

              <FormControl isReadOnly={true} mt={4}>
                <InputLeftAddon children="Destination" />
                <Input
                  ref={register}
                  type="text"
                  name="link"
                  defaultValue={link.Base_URL}
                />
              </FormControl>

              <FormControl isReadOnly={true} mt={4}>
                <InputLeftAddon children="Short Link" />
                <Input
                  ref={register}
                  type="text"
                  name="shortlink"
                  defaultValue={domain + "/" + link.Short_URL}
                />
              </FormControl>

              <InputGroup mt={4}>
                <InputLeftAddon children="Link Expiration" />
                <Select name="expiry_time" ref={register} defaultValue={-1}>
                  <option value={-1}>Never</option>
                  <option value={10 * 60 * 1000}>10 minutes</option>
                  <option value={60 * 60 * 1000}>1 hour</option>
                  <option value={24 * 60 * 60 * 1000}>1 day</option>
                  <option value={7 * 24 * 60 * 60 * 1000}>1 week</option>
                  <option value={30 * 24 * 60 * 60 * 1000}>1 month</option>
                  <option value={365 * 24 * 60 * 60 * 1000}>1 year</option>
                </Select>
              </InputGroup>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" mr={3}>
                Confirm Edit
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditLinkModal;

const EDIT_LINK = gql`
  mutation EditLink($id: String!, $new_expiry: String!) {
    editLink(ID: $id, New_Expiry: $new_expiry) {
      id
      Expires_At
    }
  }
`;
