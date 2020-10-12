import React, { useState } from "react";
import { Box, Icon, Input, InputLeftAddon } from "@chakra-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "qrcode.react";

const QRAndCopy = ({ link }) => {
  const [copied, setCopied] = useState(false);

  return (
    <Box>
      <InputLeftAddon
        children={
          <CopyToClipboard
            id="copyButton"
            text={link}
            onCopy={() => setCopied(true)}
          >
            <button>
              {copied ? <Icon name="check" /> : <Icon name="copy" />}
            </button>
          </CopyToClipboard>
        }
      />
      <Input type="text" name="id" defaultValue={link} isReadOnly={true} />
      <Box margin="0 auto" width="50%">
        <QRCode value={link} />
      </Box>
    </Box>
  );
};

export default QRAndCopy;
