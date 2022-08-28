import React from 'react';
import {
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

type ILabelItem = {
  label: string;
};

const LabelItem = React.memo<React.PropsWithChildren<ILabelItem>>((props) => {
  const { label, children } = props;
  return (
    <Stack p={1} spacing={3}>
      <Typography
        variant="h6"
        sx={{
          pl: 1,
          borderLeft: '2px solid',
          borderColor: 'text.secondary',
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>
      {typeof children === 'string' ? (
        <Typography
          sx={{
            minHeight: 56,
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            pl: 1,
          }}
        >
          {children}
        </Typography>
      ) : (
        <Box minHeight={56}>{children}</Box>
      )}
    </Stack>
  );
});

export default LabelItem;
