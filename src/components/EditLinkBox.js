import React from "react";
import { IconButton } from "@chakra-ui/react";
import {
  Button,
  Input,
  Select,
  InputLeftAddon,
  InputGroup,
  FormControl,
} from "@chakra-ui/react";
import Popup from "reactjs-popup";

const domain = process.env.REACT_APP_DOMAIN;

const contentStyle = {
  background: "white",
  padding: "20px 50px 15px",
  border: "3px solid #1A202C",
  borderRadius: "5px",
};

export default function EditLinkBox({
  link: e,
  handleSubmit,
  onSubmit,
  register,
}) {
  return (
    <Popup
      trigger={<IconButton m={2} icon="edit" />}
      modal
      nested
      {...{
        contentStyle,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isReadOnly={true} mt={4}>
          <InputLeftAddon children="ID" />
          <Input ref={register} type="text" name="id" defaultValue={e.id} />
        </FormControl>

        <FormControl isReadOnly={true} mt={4}>
          <InputLeftAddon children="Destination" />
          <Input
            ref={register}
            type="text"
            name="link"
            defaultValue={e.Base_URL}
          />
        </FormControl>

        <FormControl isReadOnly={true} mt={4}>
          <InputLeftAddon children="Short Link" />
          <Input
            ref={register}
            type="text"
            name="shortlink"
            defaultValue={domain + "/" + e.Short_URL}
          />
        </FormControl>

        <InputGroup mt={4}>
          <InputLeftAddon children="Link Expiration" />
          <Select
            name="expiry_time"
            ref={register}
            defaultValue={-1}
          >
            <option value={-1}>Never</option>
            <option value={10 * 60 * 1000}>10 minutes</option>
            <option value={60 * 60 * 1000}>1 hour</option>
            <option value={24 * 60 * 60 * 1000}>1 day</option>
            <option value={7 * 24 * 60 * 60 * 1000}>1 week</option>
            <option value={30 * 24 * 60 * 60 * 1000}>1 month</option>
            <option value={365 * 24 * 60 * 60 * 1000}>1 year</option>
          </Select>
        </InputGroup>

        <Button mt={4} mb={4} type="submit">
          Confirm Edit
        </Button>
      </form>
    </Popup>
  );
}
