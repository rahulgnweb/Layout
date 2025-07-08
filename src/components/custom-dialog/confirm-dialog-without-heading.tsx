import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import type { ConfirmDialogWithoutHeadingProps } from './types';

// ----------------------------------------------------------------------

export function ConfirmDialogWithoutHeading({
  open,
  action,
  content,
  onClose,
  ...other
}: ConfirmDialogWithoutHeadingProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      {...other}
      sx={{ justifyContent: 'center' }}
    >
    

      {content && (
        <DialogContent sx={{ typography: 'body2', pt: 3, textAlign: 'center' }}>
          {' '}
          {content}{' '}
        </DialogContent>
      )}

      <DialogActions sx={{ justifyContent: 'center' }}>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
