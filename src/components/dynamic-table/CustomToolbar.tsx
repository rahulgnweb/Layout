import type { GridRowSelectionModel } from '@mui/x-data-grid';

import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import type { GridColDef } from '@mui/x-data-grid';

import {
  Box,
  Menu,
  Button,
  useTheme,
  MenuItem,
  IconButton,
  Typography,
  ButtonGroup,
} from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { Iconify } from '../iconify';

import type { StaffData } from './types';
import { ExportExcelDialog } from '../custom-dialog';

interface CustomToolbarProps {
  onOpenFilter: (open: boolean) => void;
  onAddNew: () => void;
  onExport: () => void;
  filterValues: Record<string, any>;
  setFilterValues: (filters: Record<string, any>) => void;
  selectionModel: GridRowSelectionModel;
  setSelectionModel: React.Dispatch<React.SetStateAction<GridRowSelectionModel>>;
  rows: StaffData[];
  columns: GridColDef[];
}

const CustomToolbar = ({
  onOpenFilter,
  onAddNew,
  onExport,
  filterValues,
  setFilterValues,
  selectionModel,
  setSelectionModel,
  rows,
  columns,
}: CustomToolbarProps) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
  const exportMenuOpen = Boolean(exportAnchorEl);

  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  const handleSelectAll = () => {
    setSelectionModel(rows.map((r: any) => r.specializationID));
    handleClose();
  };

  const handleInvertSelection = () => {
    const allIds = rows.map((r: any) => r.specializationID);
    const inverted = allIds.filter((id: any) => !selectionModel.includes(id));
    setSelectionModel(inverted);
    handleClose();
  };

  const handleClear = () => {
    setSelectionModel([]);
    handleClose();
  };

  const [openExcelDialog, setOpenExcelDialog] = useState(false);
  const [selectedExportColumns, setSelectedExportColumns] = useState<string[]>(
    columns.map((col) => col.field)
  );

  const handleExport = (selectedFields: string[]) => {
    const filteredData = rows.map((row) => {
      const filteredRow: any = {};
      selectedFields.forEach((field) => {
        filteredRow[field] = row[field];
      });
      return filteredRow;
    });

    console.log('Exporting data:', filteredData);

    // TODO: Replace this with actual Excel export logic, e.g., XLSX.utils
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <GridToolbarContainer
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1.5,
          pb: 2,
          pt: 0,
          px: 2,
          flexWrap: 'wrap',
        }}
      >
        <GridToolbarQuickFilter
          sx={{
            '.MuiDataGrid-root .MuiTextField-root': {
              height: '36px !important',
            },
            '& .MuiInputBase-root': {
              borderRadius: '8px',
              padding: '6px 10px',
              backgroundColor: '#EAECEE',
              height: '36px !important',
            },

            '& input': {
              fontSize: '14px',
              color: '#333',
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderRadius: '8px',
            },
            '&.MuiTextField-root': {
              height: '36px !important',
            },
          }}
        />
        <Box sx={{ flexGrow: 1 }} />

        <ButtonGroup
          variant="soft"
          sx={{
            backgroundColor: '#EAECEE',
            border: '1px solid #c0d6ec',
            py: '0',
            '& .MuiButton-root': {
              backgroundColor: 'transparent',
              color: '#000',
              height: '36px',
              '&:hover': {
                backgroundColor: '#D9DDE2',
              },
            },
            '& .MuiButtonGroup-grouped:not(:last-of-type)': {
              borderRight: '1px solid #c0d6ec',
            },
          }}
        >
          <Button
            startIcon={
              <Iconify icon="fluent:task-list-square-add-20-filled" sx={{ color: '#637381' }} />
            }
            onClick={handleClick}
            sx={{ fontWeight: 400 }}
          >
            Rows
          </Button>
          <Button
            sx={{
              backgroundColor: 'transparent',
              color: '#000',
              px: '5px',
              borderRight: 'none',

              '&:hover': {
                backgroundColor: '#d0e4f7',
              },
              '& .MuiSvgIcon-root': {
                color: '#637381',
              },
              '&.MuiButton-root .MuiButton-sizeSmall': {
                borderRight: '0px',
                px: '6px',
                fontWeight: '400 !important',
              },
            }}
          >
            <GridToolbarColumnsButton />
          </Button>
          <Button
            startIcon={<Iconify icon="solar:export-bold" sx={{ color: '#637381' }} />}
            onClick={handleExportClick}
            sx={{ fontWeight: 400 }}
          >
            Export
          </Button>
          <Button
            startIcon={<FilterListIcon sx={{ color: '#637381' }} />}
            onClick={() => onOpenFilter(false)}
            sx={{ fontWeight: 400 }}
          >
            Filter
          </Button>
        </ButtonGroup>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleSelectAll}>Select All</MenuItem>
          <MenuItem onClick={handleClear}>Clear Selection</MenuItem>
          <MenuItem onClick={handleInvertSelection}>Invert Selection</MenuItem>
        </Menu>

        <Menu anchorEl={exportAnchorEl} open={exportMenuOpen} onClose={handleExportClose}>
          <MenuItem
            onClick={() => {
              handleExportClose();
              console.log('Exporting to PDF');
            }}
          >
            Export as PDF
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExportClose();
              setOpenExcelDialog(true);
            }}
          >
            Export as Excel
          </MenuItem>
        </Menu>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          sx={{ textTransform: 'none', fontSize: 14, fontWeight: '400' }}
          onClick={onAddNew}
        >
          Add New
        </Button>
      </GridToolbarContainer>

      {Object.values(filterValues).some((v) => v) && (
        <Box
          sx={{
            bgcolor: '#fdf5e8',
            display: 'flex',
            flexWrap: 'wrap',
            py: 1,
            px: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography fontWeight="bold">Applied Filter :</Typography>

            {Object.entries(filterValues)
              .filter(([_, val]) => val)
              .map(([key, val], idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px dashed #999',
                    borderRadius: '5px',
                    px: 1,
                    py: 0.5,
                    bgcolor: '#fdf5e8',
                  }}
                >
                  <Typography variant="body2" sx={{ mr: 0.5 }}>
                    {key}:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
                    {val}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => {
                      const newFilters = { ...filterValues };
                      delete newFilters[key];
                      setFilterValues(newFilters);
                    }}
                    sx={{ p: 0.3 }}
                  >
                    <ClearIcon sx={{ fontSize: 16, color: '#444' }} />
                  </IconButton>
                </Box>
              ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              sx={{ fontWeight: 'bold', color: theme.palette.info.main }}
              onClick={() => onOpenFilter(true)}
            >
              Edit
            </Button>
            <IconButton onClick={() => setFilterValues({})}>
              <ClearIcon color="error" sx={{ height: '22px' }} />
            </IconButton>
          </Box>
        </Box>
      )}
      <ExportExcelDialog
        open={openExcelDialog}
        onClose={() => setOpenExcelDialog(false)}
        title="Export to Excel"
        content="Choose the columns you want to include in the export."
        columns={[
          //{ field: 'specializationID', headerName: 'ID' },
          { field: 'specializationName', headerName: 'Name' },
          { field: 'specializationShortName', headerName: 'Short Name' },
          //{ field: 'courseID', headerName: 'Course ID' },
          { field: 'courseName', headerName: 'Course Name' },
          { field: 'courseShortName', headerName: 'Course Short Name' },
          { field: 'description', headerName: 'Description' },
          //{ field: 'isActive', headerName: 'Active' },
        ]}
        selectedColumns={selectedExportColumns}
        setSelectedColumns={setSelectedExportColumns}
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleExport(selectedExportColumns);
              setOpenExcelDialog(false);
            }}
            sx={{ fontWeight: 400 }}
          >
            Confirm Export
          </Button>
        }
      />
    </Box>
  );
};
export default CustomToolbar;
