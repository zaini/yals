import React, { useState } from "react";
import { Flex, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "qrcode.react";

const QRAndCopy = ({ link }) => {
  const [copied, setCopied] = useState(false);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <InputGroup mb="10px" width="100%">
        <InputLeftAddon
          children={
            <CopyToClipboard
              id="copyButton"
              text={link}
              onCopy={() => setCopied(true)}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </CopyToClipboard>
          }
        />
        <Input type="text" name="id" value={link} isReadOnly={true} />
      </InputGroup>
      <QRCode value={link} />
    </Flex>
  );
};

export default QRAndCopy;
