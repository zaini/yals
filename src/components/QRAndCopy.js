import React, { useState } from "react";
import { Box, Icon, Input, InputGroup, InputLeftAddon } from "@chakra-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "qrcode.react";

const QRAndCopy = ({ link }) => {
  const [copied, setCopied] = useState(false);

  return (
    <Box>
      <InputGroup mb="10px">
        <InputLeftAddon
          children={
            <CopyToClipboard
              id="copyButton"
              text={link}
              onCopy={() => setCopied(true)}
            >
              {copied ? <Icon name="check" /> : <Icon name="copy" />}
            </CopyToClipboard>
          }
        />
        <Input type="text" name="id" defaultValue={link} isReadOnly={true} />
      </InputGroup>
      <Box margin="0 auto" width="50%">
        <QRCode value={link} />
      </Box>
    </Box>
  );
};

export default QRAndCopy;
