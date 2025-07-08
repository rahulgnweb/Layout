import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import axios from 'axios';
import { useState, useEffect } from 'react';

import { Box, Button, IconButton } from '@mui/material';
import {
  DataGrid,
  GridPagination,
  useGridSelector,
  useGridApiContext,
  gridRowSelectionStateSelector,
} from '@mui/x-data-grid';

import { Iconify } from '../iconify';
import FooterAction from './CustomFooter';
import CustomToolbar from './CustomToolbar';
import { DynamicForm } from './DynamicForm';
import { ConfirmDialog } from '../custom-dialog';
import DynamicFilterDrawer from './DynamicFilterDrawer';
import { dataGridStyles, StyledFooterBox } from './Styles';

import type { List, StaffData, FilterField, DynamicFormSchemaType } from './types';
import { ConfirmDialogWithoutHeading } from '../custom-dialog/confirm-dialog-without-heading';

const DynamicTable = () => {
  const [rows, setRows] = useState<StaffData[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [opneFilter, setOpenFilter] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [sortModel, setSortModel] = useState<{
    sortField: string;
    sortOrder: 'asc' | 'desc' | null;
  }>({
    sortField: '',
    sortOrder: null,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [formInitialData, setFormInitialData] = useState<Partial<DynamicFormSchemaType>>({});
  const [isEditMode, setIsEditMode] = useState(false);

  const columns: GridColDef<List>[] = [
    {
      field: 'courseName',
      headerName: 'Course',
      filterable: true,
      sortable: true,
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <span style={{ color: '#3598dc' }}>
          {params.row.courseName ? params.row.courseName : ''}
        </span>
      ),
    },
    {
      field: 'specializationName',
      headerName: 'Name',
      filterable: true,
      sortable: true,
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <span>{params.row.specializationName ? params.row.specializationName : ''}</span>
      ),
    },
    {
      field: 'specializationShortName',
      headerName: 'Short Name',
      filterable: true,
      sortable: true,
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <span>{params.row.specializationShortName ? params.row.specializationShortName : ''}</span>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      minWidth: 100,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              setFormInitialData({
                name: params.row.specializationName,
                role: 'Admin',
                email: 'test@example.com',
              });
              setIsEditMode(true);
              setFormOpen(true);
            }}
          >
            <Iconify icon="solar:pen-bold" />
          </IconButton>
          <IconButton onClick={() => setOpenDelete(true)}>
            <Iconify icon="solar:trash-bin-trash-bold" color="#FF5630" />
          </IconButton>
        </>
      ),
    },
  ];

  const filterFields: FilterField[] = [
    { name: 'role', label: 'Role', type: 'select', options: ['Admin', 'Editor', 'Viewer'] },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
    { name: 'courseName', label: 'Name', type: 'text' },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5143/api/Specialization/list',
        {
          pageOffset,
          pageSize,
          sortField: sortModel.sortField,
          sortOrder: sortModel.sortOrder,
          filters: filterValues,
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJpZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiZW1haWxcIjpcImFkbWluQGxvY2FsaG9zdC5jb21cIixcInJvbGVJZFwiOlwiMVwiLFwiYWRtaXNzaW9uWWVhcklkXCI6XCIxXCIsXCJwYXRoXCI6XCIvYWRtaW5wYW5lbC9wYXltZW50U3RhdGlzdGljc1wiLFwiZGlzcGxheU5hbWVcIjpcIkFkbWluXCJ9IiwiZXhwIjoxNzUxNzg3MTkxLCJpc3MiOiJodHRwczovL3d3dy5nbndlYnNvZnQuY29tLyIsImF1ZCI6Imh0dHBzOi8vd3d3Lmdud2Vic29mdC5jb20vIn0.sIBO5BsrSE4PtQFuADe_ZrpWtzWiSLw-qDwQDzkC8hM`,
          },
        }
      );

      const { data, total } = response.data;
      setRows(data);
      setTotalCount(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageOffset, pageSize, filterValues, sortModel]);

  const handleApplyFilter = (filters: Record<string, any>) => {
    setFilterValues(filters);
    setOpenFilter(false);
  };

  const CustomFooter = () => {
    const apiRef = useGridApiContext();

    const selectedRows = useGridSelector(apiRef, gridRowSelectionStateSelector);
    const selectedCount = selectedRows.length ?? Object.keys(selectedRows).length;

    return (
      <StyledFooterBox>
        <FooterAction selectedCount={selectedCount} total={totalCount} onDelete={onDelete} />
        <GridPagination sx={{ '&.MuiTablePagination-root': { width: 'auto' } }} />
      </StyledFooterBox>
    );
  };

  const handleExport = () => {
    window.alert('export clicked');
  };

  const onAddNew = () => {
    setFormInitialData({});
    setIsEditMode(false);
    setFormOpen(true);
  };

  const onDelete = () => {
    setOpenDelete(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, width: '100%' }}>
      <DataGrid
        rows={rows}
        rowCount={totalCount}
        columns={columns as GridColDef[]}
        checkboxSelection
        disableRowSelectionOnClick
        pagination
        getRowId={(row) => row.specializationID}
        paginationModel={{ page: pageOffset, pageSize }}
        paginationMode="server"
        sortingMode="server"
        pageSizeOptions={[20, 30, 40, 50, 100]}
        onPaginationModelChange={(newModel) => {
          setPageOffset(newModel.page);
          setPageSize(newModel.pageSize);
        }}
        onSortModelChange={(model) => {
          if (model.length === 0) {
            setSortModel({ sortField: '', sortOrder: null });
            return;
          }

          const field = model[0].field;
          const direction = model[0].sort;

          if (!direction) {
            setSortModel({ sortField: '', sortOrder: null });
          } else {
            setSortModel({ sortField: field, sortOrder: direction });
          }
        }}
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={(newModel) => {
          setSelectionModel(newModel);
        }}
        slots={{
          toolbar: () => (
            <CustomToolbar
              onOpenFilter={() => setOpenFilter(true)}
              onAddNew={onAddNew}
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              onExport={handleExport}
              selectionModel={selectionModel}
              setSelectionModel={setSelectionModel}
              rows={rows}
              columns={columns}
            />
          ),
          footer: CustomFooter,
        }}
        sx={{ ...dataGridStyles }}
      />

      <DynamicFilterDrawer
        open={opneFilter}
        fields={filterFields}
        defaultValues={filterValues}
        onApply={handleApplyFilter}
        onClose={() => setOpenFilter(false)}
      />

      <DynamicForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialData={formInitialData}
        isEditMode={isEditMode}
      />

      <ConfirmDialogWithoutHeading
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        content="Are you sure want to delete this record?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              window.alert('Delete Clicked');
              setOpenDelete(false);
            }}
          >
            Delete
          </Button>
        }
      />
    </Box>
  );
};

export default DynamicTable;
