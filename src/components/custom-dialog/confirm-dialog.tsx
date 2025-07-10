import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import type { ConfirmDialogProps } from './types';

// ----------------------------------------------------------------------

export function ConfirmDialog({
  open,
  title,
  action,
  content,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle
        sx={{
          py: 2,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        {title} <DisabledByDefaultIcon onClick={onClose} />
      </DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
