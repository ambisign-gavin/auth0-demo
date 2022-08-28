import { IconButton, TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordField = React.forwardRef<any, TextFieldProps>((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <TextField
      {...props}
      ref={ref}
      type={visible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => setVisible((v) => !v)}>
            {visible ? <VisibilityOff /> : <Visibility /> }
          </IconButton>
        ),
      }}
    />
  );
});

export default PasswordField;
