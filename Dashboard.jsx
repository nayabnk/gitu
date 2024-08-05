

import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { IoFilterSharp } from "react-icons/io5";
import React, { useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Chart from 'chart.js/auto';
import { CiExport } from "react-icons/ci";
import { BiExport } from "react-icons/bi";
// Styled Paper component for cards
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f5f5f5', // Light grey background for cards
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const dataDoughnut = {
  labels: ["KFC", "Lorem ipsum", "Lorem ipsum"],
  datasets: [
    {
      data: [60500, 6000, 500],
      backgroundColor: ["#008000", "#0000FF", "#87CEEB"],
      hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
    },
  ],
};

const dataBar = {
  labels: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Lorem ipsum", "Lorem ipsum"],
  datasets: [
    {
      label: "Sales",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
      hoverBorderColor: "rgba(54, 162, 235, 1)",
      data: [90000, 80000, 60000, 50000, 40000, 20000],
    },
    {
      label: "Royalty",
      backgroundColor: "#FF9F40",
      borderColor: "rgba(255, 159, 64, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255, 159, 64, 0.4)",
      hoverBorderColor: "rgba(255, 159, 64, 1)",
      data: [9000, 8000, 7000, 6000, 5000, 3000],
    },
  ],
};

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'franchiseName', headerName: 'Franchise Name', width: 200 },
  { field: 'franchisorName', headerName: 'Franchisor Name', width: 200 },
  { field: 'city', headerName: 'City', width: 150 },
  { field: 'sales', headerName: 'Sales', width: 150 },
  { field: 'royalty', headerName: 'Royalty', width: 150 },
];

const rows = [
  { id: 'A101', franchiseName: 'Lorem ipsum dim eim', franchisorName: 'Lorem ipsum dim eim', city: 'Riyadh', sales: '$60000', royalty: '$6000' },
  { id: 'A102', franchiseName: 'KFC', franchisorName: 'Gladys Esther', city: 'Jeddah', sales: '$60000', royalty: '$6000' },
  { id: 'A103', franchiseName: 'Lorem ipsum dim eim', franchisorName: 'Lorem ipsum dim eim', city: 'Lorem ipsum dim', sales: '$60000', royalty: '$6000' },
  { id: 'A104', franchiseName: 'Lorem ipsum dim eim', franchisorName: 'Lorem ipsum dim eim', city: 'Jeddah', sales: '$60000', royalty: '$6000' },
];

const CustomToolbar = () => (
  <GridToolbarContainer sx={{ justifyContent: 'flex-end' }}>
    <GridToolbarExport />
  </GridToolbarContainer>
);

export default function Dashboard() {
  const [searchText, setSearchText] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const [selectedYear, setSelectedYear] = React.useState(2023);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    id: '',
    franchiseName: '',
    franchisorName: '',
    city: '',
    sales: '',
    royalty: ''
  });

  const handleFilterButtonClick = () => {
    setIsFilterDialogOpen(true);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterValues({
      ...filterValues,
      [name]: value
    });
  };

  const handleFilterSubmit = () => {
    const filtered = rows.filter((row) =>
      (filterValues.id === '' || row.id.includes(filterValues.id)) &&
      (filterValues.franchiseName === '' || row.franchiseName.toLowerCase().includes(filterValues.franchiseName.toLowerCase())) &&
      (filterValues.franchisorName === '' || row.franchisorName.toLowerCase().includes(filterValues.franchisorName.toLowerCase())) &&
      (filterValues.city === '' || row.city.toLowerCase().includes(filterValues.city.toLowerCase())) &&
      (filterValues.sales === '' || row.sales.includes(filterValues.sales)) &&
      (filterValues.royalty === '' || row.royalty.includes(filterValues.royalty))
    );
    setFilteredRows(filtered);
    setIsFilterDialogOpen(false);
  };

  const handleFilterDialogClose = () => {
    setIsFilterDialogOpen(false);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);
    const filtered = rows.filter((row) =>
      row.franchiseName.toLowerCase().includes(searchValue) ||
      row.franchisorName.toLowerCase().includes(searchValue) ||
      row.city.toLowerCase().includes(searchValue)
    );
    setFilteredRows(filtered);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#f0f0f0', padding: 2 }}>
      <Box sx={{ width: '80%' }}>
        <div className="p-3 mb-2 bg-black text-white">
          <Stack direction="row" spacing={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Typography variant="h4" color="textPrimary" sx={{ textAlign: 'left' }}>
                  Financial Overview
                </Typography>
              </Grid>
              <Grid item>
                <FormControl variant="outlined" sx={{ minWidth: 120, textAlign: 'right' }}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={selectedYear}
                    onChange={handleYearChange}
                    label="Year"
                  >
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2026}>2026</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        </div>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Item>
                  <Typography variant="h6" color="textSecondary">
                    Total Franchise
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                    20
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Item>
                  <Typography variant="h6" color="textSecondary">
                    Total Sales
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                    $90,000
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Item>
                  <Typography variant="h6" color="textSecondary">
                    Total Royalty
                  </Typography>
                  <Typography variant="h4" color="textPrimary">
                    $6,000
                  </Typography>
                </Item>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={4}>
                <Item>
                  <Typography variant="h6" color="textSecondary">
                    Top Franchise
                  </Typography>
                  <Doughnut data={dataDoughnut} />
                </Item>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Item>
                  <Typography variant="h6" color="textSecondary">
                    Top Sales Location
                  </Typography>
                  <Bar data={dataBar} />
                </Item>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Item>
              <Box sx={{ mb: 2 }}>
                <Stack direction="row" spacing={100}>
                  <TextField
                  
                    variant="outlined"
                    placeholder="Search"
                    value={searchText}
                    onChange={handleSearch}
                  />
                   <Stack direction="row" spacing={2} >
                  <Button variant="outlined" color="primary" onClick={handleFilterButtonClick}>
                  <IoFilterSharp />Filter
                  </Button>
                  <Button variant="outlined" color="primary"><BiExport /> Export</Button>
                  </Stack>
                </Stack>
              </Box>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={filteredRows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  components={{ Toolbar: CustomToolbar }}
                />
              </div>
            </Item>
          </Grid>
        </Grid>

        <Dialog open={isFilterDialogOpen} onClose={handleFilterDialogClose}>
         <h2>Filter</h2> 
          <DialogContent>
          <Stack spacing={4}>
          <Stack direction="row" spacing={2}>
            <TextField
              margin="dense"
              name="id"
              label="ID"
              fullWidth
              variant="outlined"
              value={filterValues.id}
              onChange={handleFilterChange}
            />
            <TextField
              margin="dense"
              name="franchiseName"
              label="Franchise Name"
              fullWidth
              variant="outlined"
              value={filterValues.franchiseName}
              onChange={handleFilterChange}
            />
            <TextField
              margin="dense"
              name="franchisorName"
              label="Franchisor Name"
              fullWidth
              variant="outlined"
              value={filterValues.franchisorName}
              onChange={handleFilterChange}
            />
            </Stack>
            <Stack direction="row" spacing={2}>
            <TextField
              margin="dense"
              name="city"
              label="City"
              fullWidth
              variant="outlined"
              value={filterValues.city}
              onChange={handleFilterChange}
            />
            <TextField
              margin="dense"
              name="sales"
              label="Sales"
              fullWidth
              variant="outlined"
              value={filterValues.sales}
              onChange={handleFilterChange}
            />
            <TextField
              margin="dense"
              name="royalty"
              label="Royalty"
              fullWidth
              variant="outlined"
              value={filterValues.royalty}
              onChange={handleFilterChange}
            />
            </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={handleFilterDialogClose} type="button" class="btn btn-primary">              Clear all
            </Button>
            
            <Button onClick={handleFilterSubmit} type="button" class="btn btn-primary">
              Show result
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
