import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';

import type { ConfirmDialogProps } from './types';

export function ExportExcelDialog({
  open,
  title,
  content,
  action,
  onClose,
  columns = [],
  selectedColumns = [],
  setSelectedColumns = () => {},
  ...other
}: ConfirmDialogProps) {
  const handleToggle = (field: string) => {
    if (selectedColumns.includes(field)) {
      setSelectedColumns(selectedColumns.filter((f) => f !== field));
    } else {
      setSelectedColumns([...selectedColumns, field]);
    }
  };

  const handleSelectAll = () => {
    setSelectedColumns(columns.map((col) => col.field));
  };

  const handleClear = () => {
    setSelectedColumns([]);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      <DialogContent sx={{ typography: 'body2' }}>
        {content && <Box mb={2}>{content}</Box>}

        {columns.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="soft" onClick={handleSelectAll} sx={{ fontWeight: 400 }}>
                Select All
              </Button>
              <Button variant="soft" onClick={handleClear} sx={{ fontWeight: 400 }}>
                Clear
              </Button>
            </Box>
            {columns.map((col) => (
              <FormControlLabel
                key={col.field}
                control={
                  <Checkbox
                    checked={selectedColumns.includes(col.field)}
                    onChange={() => handleToggle(col.field)}
                  />
                }
                label={col.headerName}
              />
            ))}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {action}
        <Button variant="outlined" color="inherit" onClick={onClose} sx={{ fontWeight: 400 }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
