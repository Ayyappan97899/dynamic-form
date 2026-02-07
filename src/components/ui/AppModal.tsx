import type { FC, ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface AppModalProps {
  open: boolean;
  title?: string;
  children?: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

const AppModal: FC<AppModalProps> = ({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  maxWidth = "sm",
  fullWidth = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="app-modal-title"
      fullWidth={fullWidth}
      maxWidth={isMobile ? "sm" : maxWidth}
      PaperProps={{
        sx: { m: { xs: 1, sm: 0 } },
      }}
    >
      {title && (
        <DialogTitle
          id="app-modal-title"
          sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          {title}
        </DialogTitle>
      )}
      <DialogContent dividers sx={{ py: { xs: 1.5, sm: 2 } }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ p: { xs: 1, sm: 2 }, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" fullWidth={isMobile}>
          {cancelText}
        </Button>
        <Button
          onClick={() => {
            if (onConfirm) onConfirm();
          }}
          variant="contained"
          color="primary"
          fullWidth={isMobile}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppModal;
