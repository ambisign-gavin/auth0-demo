import React from 'react';
import {
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LabelItem from 'src/components/common/LabelItem';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  isNil, not, pathOr,
} from 'ramda';
import { useMineProfile, useUpdateName } from 'src/api/user';
import UpdatePasswordDialog from './UpdatePasswordDialog';

type IFormData = {
  name: string
};

const schema: yup.SchemaOf<IFormData> = yup.object({
  name: yup.string()
    .required(),
}).required();

const ProfileGrid = React.memo(() => {
  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { data: profile, refetch } = useMineProfile();

  const { mutate } = useUpdateName();

  React.useEffect(() => {
    setValue('name', profile?.name || '');
  }, [profile?.name]);

  const [isOpenUpdatePWDModal, setOpenUpdatePWDModal] = React.useState(false);

  const onSubmit = (formData: IFormData) => {
    mutate({ name: formData.name }, { onSuccess: () => { refetch(); } });
  };

  return (
    <>
      <UpdatePasswordDialog
        open={isOpenUpdatePWDModal}
        onClose={() => setOpenUpdatePWDModal(false)}
      />
      <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
        <Stack height={1} justifyContent="space-between">
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} md={6}>
              <LabelItem label="Name">
                <TextField
                  sx={{ width: 1 }}
                  variant="outlined"
                  error={not(isNil(errors.name))}
                  helperText={pathOr('', ['name', 'message'], errors)}
                  {...register('name')}
                  FormHelperTextProps={{
                    sx: {
                      fontSize: '1rem',
                    },
                  }}
                />
              </LabelItem>
            </Grid>
            {profile?.registerSource === 'email' && (
              <Grid item xs={12} md={6}>
                <LabelItem label="Password">
                  <TextField
                    sx={{ width: 1 }}
                    disabled
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => {
                            setOpenUpdatePWDModal(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      ),
                    }}
                    type="password"
                    value="***********"
                    variant="outlined"
                  />
                </LabelItem>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <LabelItem label="Email">{profile?.email}</LabelItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <LabelItem label="Account link">{profile?.registerSource}</LabelItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <LabelItem label="Sign Up Time">{profile?.signUpAt ? new Date(profile.signUpAt).toLocaleString() : ''}</LabelItem>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ fontSize: '1.1rem', m: 2, py: 1 }}>
            Save
          </Button>
        </Stack>
      </form>
    </>
  );
});

export default ProfileGrid;
