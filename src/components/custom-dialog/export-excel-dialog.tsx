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
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

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
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 1, // 16px; use 0 for square corners
          },
        },
      }}
      {...other}
    >
      <DialogTitle
        sx={{
          px: 2,
          py: 1.5,
          backgroundColor: '#f4f6f8',
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          borderBottom: '1px solid #ddd',
          alignItems: 'center',
        }}
      >
        {title}
        <DisabledByDefaultIcon
          onClick={onClose}
          color="error"
          sx={{ fontSize: '34px', borderRadius: 8, padding: '0 !important' }}
        />
      </DialogTitle>
      <DialogContent sx={{ typography: 'body2', mt: '5', p: 2 }}>
        {content && <Box mb={2}>{content}</Box>}

        {columns.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="soft" onClick={handleSelectAll} sx={{ fontWeight: 400 }}>
                Select All
              </Button>
              <Button variant="soft" onClick={handleClear} sx={{ fontWeight: 400 }}>
                Clear
              </Button>
            </Box> */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedColumns.length === columns.length}
                  indeterminate={
                    selectedColumns.length > 0 && selectedColumns.length < columns.length
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setSelectedColumns(columns.map((col) => col.field));
                    } else {
                      setSelectedColumns([]);
                    }
                  }}
                />
              }
              label="Select All"
            />
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
      <DialogActions sx={{ mt: 0, py: 1.5, px: 2, borderTop: '1px solid #f0f0f0' }}>
        {action}
      </DialogActions>
    </Dialog>
  );
}
