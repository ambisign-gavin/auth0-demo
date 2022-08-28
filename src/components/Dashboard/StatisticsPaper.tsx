import React from 'react';
import {
  Paper,
  Stack,
  Typography,
} from '@mui/material';

type IStatisticsPaperProps = {
  title: string;
  value: number;
};

const StatisticsPaper = React.memo<IStatisticsPaperProps>((props) => (
  <Paper
    sx={{
      width: { xs: 1, md: 1 / 3 },
      maxWidth: { md: 300 },
      borderBottom: { md: 3 },
      borderLeft: { xs: 3, md: 0 },
      borderColor: { xs: 'secondary.main', md: 'secondary.main' },
    }}
  >
    <Stack
      p={2}
      pb={1}
      spacing={1}
      justifyContent="space-between"
      direction={{
        xs: 'row',
        md: 'column',
      }}
    >
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        {props.title}
      </Typography>
      <Typography variant="h4" align="right">
        {props.value}
      </Typography>
    </Stack>
  </Paper>
));

export default StatisticsPaper;
