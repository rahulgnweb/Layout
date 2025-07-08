import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Form, Field } from 'src/components/hook-form';

import { DynamicFormSchema, type DynamicFormSchemaType } from './types';

// ----------------------------------------------------------------------
type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<DynamicFormSchemaType>;
  isEditMode?: boolean;
};

export function DynamicForm({ open, onClose, initialData, isEditMode }: Props) {
  const defaultValues: DynamicFormSchemaType = {
    name: '',
    email: '',
    address: '',
    state: '',
    city: '',
    zipCode: '',
    status: '',
    company: '',
    role: '',
    ...initialData,
  };

  const methods = useForm<DynamicFormSchemaType>({
    mode: 'all',
    resolver: zodResolver(DynamicFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [initialData]);

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await promise;
      console.info(isEditMode ? 'EDIT DATA' : 'ADD DATA', data);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <DialogTitle>{isEditMode ? 'Edit User' : 'Add New User'}</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            {isEditMode ? 'You are editing user details' : 'Fill the form to add a new user'}
          </Alert>
          <Box
            sx={{
              rowGap: 3,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <Field.Text name="name" label="Full name" />
            <Field.Text name="email" label="Email address" />
            <Field.Text name="state" label="State/region" />
            <Field.Text name="city" label="City" />
            <Field.Text name="address" label="Address" />
            <Field.Text name="zipCode" label="Zip/code" />
            <Field.Text name="company" label="Company" />
            <Field.Text name="role" label="Role" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose} sx={{ fontWeight: 400 }}>
            Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {isEditMode ? 'Update' : 'Add'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
