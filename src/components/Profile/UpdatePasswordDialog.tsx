import React from 'react';
import {
  Dialog,
  Grid,
  IconButton,
  Stack,
  TextFieldProps,
} from '@mui/material';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import PasswordField from 'src/components/common/PasswordField';
import LabelItem from 'src/components/common/LabelItem';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  isNil, not, pathOr,
} from 'ramda';
import { useUpdatePassword } from 'src/api/user';
import { LoadingButton } from '@mui/lab';

type IUpdatePasswordDialogProps = {
  open?: boolean
  onClose: () => void
};

type IFormData = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
};

const passwordRegexp = /(?=.{8,})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])).*/;

const wrongPasswordFormat = 'Minimum eight characters contain at least 3 of the following types: one lower character, one upper character, one number, and one special character';

const schema: yup.SchemaOf<IFormData> = yup.object({
  oldPassword: yup.string()
    .required('Old password is a required field')
    .matches(passwordRegexp, wrongPasswordFormat),
  newPassword: yup.string()
    .required('New password is a required field')
    .matches(passwordRegexp, wrongPasswordFormat),
  confirmPassword: yup.string()
    .required('Confirm password is a required field')
    .oneOf([yup.ref('newPassword')], 'Passwords don\'t match'),
}).required();

const UpdatePasswordDialog = React.memo<IUpdatePasswordDialogProps>((props) => {
  const { open = false, onClose } = props;

  const { mutate, isLoading: isUpdating } = useUpdatePassword();

  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: IFormData) => {
    mutate(data, {
      onSuccess: onClose,
    });
  };

  const commonPasswordFieldProps = React.useMemo<TextFieldProps>(() => ({
    sx: { width: 1 },
    FormHelperTextProps: {
      sx: {
        fontSize: '1rem',
      },
    },
    variant: 'outlined',
  }), []);

  return (
    <Dialog
      open={open}
      sx={{
        zIndex: 1,
      }}
      fullWidth
      PaperProps={{
        sx: {
          position: 'relative',
        },
      }}
    >
      <Box position="absolute" right={0} top={0}>
        <IconButton onClick={onClose}>
          <CancelIcon sx={{ fontSize: '2rem' }} />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack height={1} justifyContent="space-between">
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <LabelItem label="Old password">
                <PasswordField
                  error={not(isNil(errors.oldPassword))}
                  helperText={pathOr('', ['oldPassword', 'message'], errors)}
                  {...register('oldPassword')}
                  {...commonPasswordFieldProps}
                />
              </LabelItem>
            </Grid>
            <Grid item xs={12}>
              <LabelItem label="New password">
                <PasswordField
                  error={not(isNil(errors.newPassword))}
                  helperText={pathOr('', ['newPassword', 'message'], errors)}
                  {...register('newPassword')}
                  {...commonPasswordFieldProps}
                />
              </LabelItem>
            </Grid>
            <Grid item xs={12}>
              <LabelItem label="Confirm new password">
                <PasswordField
                  error={not(isNil(errors.confirmPassword))}
                  helperText={pathOr('', ['confirmPassword', 'message'], errors)}
                  {...register('confirmPassword')}
                  {...commonPasswordFieldProps}
                />
              </LabelItem>
            </Grid>
          </Grid>
          <LoadingButton loading={isUpdating} type="submit" variant="contained" sx={{ fontSize: '1.1rem', m: 2, py: 1 }}>
            Edit
          </LoadingButton>
        </Stack>
      </form>
    </Dialog>
  );
});

export default UpdatePasswordDialog;
