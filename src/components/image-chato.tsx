import { DownloadIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import React from "react";

interface ImagePreviewProps {
  url: string; // URL direta da imagem
}

export default function ImagePreview({ url }: ImagePreviewProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      {/* Imagem com borda */}
      <img
        src={url}
        alt="preview"
        style={{
          width: 180,
          height: 180,
          borderRadius: 4,
          objectFit: "cover",
        }}
      />

      <Flex width="100%">
        {/* Botão de download via <a> */}
        <a
          href={url}
          target="_blank"
          download="image.png"
          style={{ textDecoration: "none", width: "100%" }}
        >
          <Button
            style={{
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              width: '40px',
              height: '20px',
            }}
            color="indigo"
            variant="soft"
          >
            <DownloadIcon />
          </Button>
        </a>
      </Flex>
    </div>
  );
}
