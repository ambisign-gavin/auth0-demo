import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useUsers } from 'src/api/user';
import env from 'src/constants/env';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom } from 'src/atom';
import {
  IconButton, Paper, Stack, Typography,
} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useQueryClient } from '@tanstack/react-query';

const UsersTable = React.memo(() => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  const queryClient = useQueryClient();

  const [pageIndex, setPageIndex] = React.useState(0);

  const { data: usersRes, isLoading, refetch } = useUsers({
    countPerPage: env.COUNT_PER_PAGE,
    pageIndex,
  }, {
    enabled: isAuthenticated,
  });

  const columns: GridColDef[] = [
    {
      field: 'id', headerName: 'ID', flex: 1, sortable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 120,
      sortable: false,
    },
    {
      field: 'loginCount',
      headerName: 'Login count',
      flex: 1,
      minWidth: 100,
      sortable: false,
    },
    {
      field: 'signUpAt',
      minWidth: 180,
      headerName: 'Sign up time',
      sortable: false,
      flex: 1,
      valueGetter:
        (params: GridValueGetterParams) => (params.row.signUpAt
          ? new Date(params.row.signUpAt).toLocaleString()
          : null),
    },
    {
      field: 'lastSessionAt',
      headerName: 'Last session time',
      minWidth: 180,
      sortable: false,
      flex: 1,
      valueGetter:
        (params: GridValueGetterParams) => (params.row.lastSessionAt
          ? new Date(params.row.lastSessionAt).toLocaleString()
          : null),
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
      >
        <Typography variant="h6">
          All Users
        </Typography>
        <IconButton onClick={() => {
          refetch();
          queryClient.refetchQueries(['useUsersStatistics'], {
            exact: false,
          });
        }}
        >
          <AutorenewIcon />
        </IconButton>
      </Stack>
      <Paper sx={{ height: 600, width: 1 }}>
        <DataGrid
          loading={!isAuthenticated || isLoading}
          disableColumnMenu
          rows={usersRes?.records || []}
          columns={columns}
          page={usersRes?.currentPageIndex || 0}
          pageSize={env.COUNT_PER_PAGE}
          rowsPerPageOptions={[env.COUNT_PER_PAGE]}
          rowCount={usersRes?.totalCount || 0}
          disableSelectionOnClick
          onPageChange={(page) => {
            setPageIndex(page);
          }}
        />
      </Paper>
    </>
  );
});

export default UsersTable;
