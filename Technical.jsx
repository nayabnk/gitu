import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const columns = [
  { field: 'id', headerName: 'Request ID', width: 150 },
  { field: 'userId', headerName: 'User ID', width: 150 },
  { field: 'fullName', headerName: 'Full Name', width: 200 },
  { field: 'userType', headerName: 'User Type', width: 150 },
  { field: 'requestTitle', headerName: 'Request Title', width: 300 },
  { field: 'dateSubmitted', headerName: 'Date Submitted', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
];

const initialRows = [
  { id: 'TR01', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Cannot update profile info', dateSubmitted: '12-Oct-2024', status: 'Pending' },
  { id: 'TR02', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Issue with report export', dateSubmitted: '12-Oct-2024', status: 'Pending' },
  { id: 'TR01', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Cannot update profile info', dateSubmitted: '12-Oct-2024', status: 'Pending' },
  { id: 'TR02', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Issue with report export', dateSubmitted: '12-Oct-2024', status: 'Pending' },
  { id: 'TR01', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Cannot update profile info', dateSubmitted: '12-Oct-2024', status: 'Pending' },
  { id: 'TR02', userId: 'A102', fullName: 'Hedwig F. Nguyen', userType: 'Franchisor', requestTitle: 'Issue with report export', dateSubmitted: '12-Oct-2024', status: 'Pending' },
  // Add more rows as needed
];

const CustomToolbar = () => (
  <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
    <GridToolbarExport />
    <Button variant="outlined" color="primary" sx={{ ml: 2 }}>Filter</Button>
  </GridToolbarContainer>
);

export default function Dashboard() {
  const [rows, setRows] = useState(initialRows);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    id: '',
    userId: '',
    fullName: '',
    userType: '',
    requestTitle: '',
    dateSubmitted: '',
    status: '',
  });

  const handleFilterButtonClick = () => {
    setIsFilterDialogOpen(true);
  };

  const handleFilterDialogClose = () => {
    setIsFilterDialogOpen(false);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleFilterSubmit = () => {
    const filteredRows = initialRows.filter((row) => {
      return Object.keys(filterValues).every((key) => {
        return row[key].toString().toLowerCase().includes(filterValues[key].toLowerCase());
      });
    });
    setRows(filteredRows);
    setIsFilterDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Technical Requests
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Item>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h4">20</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Typography variant="h6">Pending</Typography>
            <Typography variant="h4">19</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Typography variant="h6">Resolved</Typography>
            <Typography variant="h4">01</Typography>
          </Item>
        </Grid>
      </Grid>
      <Box sx={{ mb: 2 }}>
        <Stack direction="row" spacing={140}>
          <TextField variant="outlined" placeholder="Search"  />
          <Button variant="outlined" color="primary" onClick={handleFilterButtonClick}>
            Filter
          </Button>
        </Stack>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          components={{ Toolbar: CustomToolbar }}
        />
      </div>
      <Dialog open={isFilterDialogOpen} onClose={handleFilterDialogClose}>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
        
       
          {Object.keys(filterValues).map((key) => (
           
            <TextField
              key={key}
              margin="dense"
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth
              variant="outlined"
              value={filterValues[key]}
              onChange={handleFilterChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFilterSubmit} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
