import React, { useState } from "react";
import { Box, Icon } from "@chakra-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "qrcode.react";

const QRAndCopy = ({ link }) => {
  const [copied, setCopied] = useState(false);

  return (
    <Box id="result">
      {link}
      <CopyToClipboard
        id="copyButton"
        text={link}
        onCopy={() => setCopied(true)}
      >
        <button>{copied ? <Icon name="check" /> : <Icon name="copy" />}</button>
      </CopyToClipboard>
      ,
      <QRCode value={link} />,
    </Box>
  );
};

export default QRAndCopy;
