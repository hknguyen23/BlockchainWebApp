import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import {
  Divider,
  TextField,
  Toolbar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import { getListTransactions } from '../../services/TransactionService';
import config from '../../constants/config.json';

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    color:
      theme.palette.type === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: '12pt',
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
      borderRight: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
        }`,
    },
    '& .MuiDataGrid-colCellTitle': {
      display: 'block',
      textAlign: 'right',
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'}`,
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.type === 'light'
          ? 'rgba(0,0,0,.85)'
          : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    '& .MuiDataGrid-main': {
      border: '1px solid #ccc'
    }
  },
  label: {
    marginTop: theme.spacing(1),
  },
  toolbar: {
    padding: 0,
    marginTop: 20,
    marginBottom: 20
  },
  textField: {
    marginRight: 10,
    height: '40px'
  },
  comboBox: {
    height: '40px'
  },
  button: {
    marginLeft: 10,
    padding: 0,
    borderRadius: '4px',
    textTransform: 'none',
    width: '300px',
    height: '40px'
  },
  deleteIcon: {
    color: 'red',
  },
  container: {
    marginLeft: '50px',
    marginRight: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '14pt'
  },
}));

export default function ViewTransactions({ user }) {
  const classes = useStyles();
  const history = useHistory();

  const [transactions, setTransactions] = useState([]);
  const [pageSize, setPageSize] = useState(config.PAGE_SIZE);
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const [openConfirmDeleteProjectDialog, setOpenConfirmDeleteProjectDialog] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const columns = [
    {
      field: 'Receiver',
      headerName: 'Receiver',
      width: 200
    },
    {
      field: 'Amount',
      headerName: 'Amount',
      width: 120,
      headerAlign: 'right',
      align: 'right',
      type: 'number'
    },
    {
      field: 'Description',
      headerName: 'Description',
      flex: 1
    },
    {
      field: 'DateAdded',
      headerName: 'Date Added',
      type: 'date',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params) => {
        return moment(params.getValue('DateAdded')).format(config.FORMAT_DATETIME_PATTER.DATE_TIME);
      }
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <IconButton style={{ flex: 1 }}>
            <DeleteForeverIcon className={classes.deleteIcon} />
          </IconButton>
        );
      }
    }
  ];

  useEffect(() => {
    getListTransactions(user.ID)
      .then(result => {
        setTransactions(result.transactions);
      })
      .catch(error => {
        history.push("/error", { errorMessage: error });
      });
  }, []);

  const handleSearch = () => {

  }

  const handleReset = () => {

  }

  const handleDeleteProject = () => {

  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <p style={{ fontSize: '18pt', color: '#666666', fontWeight: 500, }}>
          Your transactions
        </p>

        <Divider />

        <div>
          <Toolbar className={classes.toolbar}>
            <TextField
              value={searchFieldValue}
              className={classes.textField}
              autoFocus
              id="transactionSearch"
              size='small'
              placeholder="Search..."
              variant="outlined"
              fullWidth
              onChange={e => setSearchFieldValue(e.target.value)}
            />

            <Button className={classes.button} variant="contained" color="primary" onClick={handleSearch}>
              Search Button
          </Button>

            <Button className={classes.button} variant="outlined" color="primary" onClick={handleReset}>
              Reset Button
          </Button>
          </Toolbar>
        </div >

        <div style={{ height: 190 + 41 * pageSize, width: '100%' }}>
          <DataGrid
            className={classes.root}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            disableSelectionOnClick
            disableColumnMenu
            rows={transactions}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            rowHeight={32}
            headerHeight={32}
            onPageSizeChange={(params) => {
              setPageSize(params.pageSize);
            }}
            onStateChange={(params) => {
              if (isReset) {
                params.state.selection = {};
              }
            }}
            density='comfortable'
          />
        </div>
      </div>

      <Dialog
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={openConfirmDeleteProjectDialog}
      >
        <DialogTitle id="confirmation-dialog-title">
          deleteConfirmDialog.title
        </DialogTitle>
        <DialogContent dividers>
          deleteConfirmDialog.content
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenConfirmDeleteProjectDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProject} style={{ color: 'red' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}