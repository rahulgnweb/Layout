import type { DialogProps } from '@mui/material/Dialog';

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  onClose: () => void;
  title: React.ReactNode;
  action: React.ReactNode;
  content?: React.ReactNode;

  columns?: { field: string; headerName: string }[];
  selectedColumns?: string[];
  setSelectedColumns?: (cols: string[]) => void;
};

export type ConfirmDialogWithoutHeadingProps = Omit<DialogProps, 'title' | 'content'> & {
  onClose: () => void;
  action: React.ReactNode;
  content?: React.ReactNode;
};
