"use client";
import React from "react";
import { Modal, Box, Typography, Button, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface ContactModalProps {
  open: boolean;
  handleClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, handleClose }) => {
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/anitopla.co/", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/İlker", "_blank"); 
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 2,
          width: 400,
          maxWidth: "90%",
          mx: "auto",
          my: "20vh",
          boxShadow: 24,
          outline: "none",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Sağ üst köşe çarpı butonu */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" fontWeight="bold" mb={2}>
          İletişime Geçmek İstiyor Musunuz?
        </Typography>
        <Typography variant="body1" mb={4} color="text.secondary">
          Bize hangi platform üzerinden ulaşmak istersiniz?
        </Typography>

        <Stack direction="column" spacing={2}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<InstagramIcon />}
            onClick={handleInstagramClick}
            sx={{
              backgroundColor: "#E1306C",
              "&:hover": { backgroundColor: "#c62857" },
            }}
          >
            Instagram Üzerinden İletişime Geç
          </Button>

          <Button
            variant="contained"
            fullWidth
            startIcon={<WhatsAppIcon />}
            onClick={handleWhatsAppClick}
            sx={{
              backgroundColor: "#25D366",
              "&:hover": { backgroundColor: "#1DA851" },
            }}
          >
            WhatsApp Üzerinden İletişime Geç
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ContactModal;
