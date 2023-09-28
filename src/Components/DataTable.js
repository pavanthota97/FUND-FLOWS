import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [formData, setFormData] = useState({
    tTyp: '',
    line: '',
    documentNumber: '',
    documentDate: '',
    year: '',
  });
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    toggleSidebar();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.tTyp &&
      formData.line &&
      formData.documentNumber &&
      formData.documentDate &&
      formData.year
    ) {
      if (editingIndex === -1) {
        const newRow = { ...formData };
        setTableData([...tableData, newRow]);
      } else {
        const updatedTableData = [...tableData];
        updatedTableData[editingIndex] = { ...formData };
        setTableData(updatedTableData);
        setEditingIndex(-1);
      }

      setFormData({
        tTyp: '',
        line: '',
        documentNumber: '',
        documentDate: '',
        year: '',
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleEdit = (index) => {
    const selectedRowData = tableData[index];
    setFormData({ ...selectedRowData });
    setEditingIndex(index);
  };

  const handleCopy = (index) => {
    console.log('Copy row:', tableData[index]);
  };

  // Conditionally render the table based on the selectedMenuItem
  const renderTable = () => {
    if (selectedMenuItem) {
      return (
        <div>
          <Typography variant="h6">{selectedMenuItem}</Typography>
          <form onSubmit={handleSubmit}>
          <TextField
              label="T Typ"
              name="tTyp"
              value={formData.tTyp}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Line"
              name="line"
              value={formData.line}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Document Number"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Document Date"
              name="documentDate"
              value={formData.documentDate}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
            />
            <Button variant="contained" color="primary" type="submit">
              {editingIndex === -1 ? 'Submit' : 'Update'}
            </Button>
          </form>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>T Typ</TableCell>
                <TableCell>Line</TableCell>
                <TableCell>Document Number</TableCell>
                <TableCell>Document Date</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Copy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.tTyp}</TableCell>
                  <TableCell>{row.line}</TableCell>
                  <TableCell>{row.documentNumber}</TableCell>
                  <TableCell>{row.documentDate}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleCopy(index)}>
                      <FileCopyIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
    }
    return null; // Don't render the table if no menu item is selected
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <BusinessIcon
            style={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={toggleSidebar}
          />
          <Typography variant="h6">KMV GROUP</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {renderTable()}
      </Container>
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar} style={{ backgroundColor: '#D3D3D3' }}>
        <List>
          {[
            "P2P Payments",
            "P2P Loans",
            "RO-RO Loans",
            "P2R Surplus Funds Transfer",
            "Payments",
            "R2C Surplus Funds Transfer",
            "Receipt From RO",
            "CO Levies",
            "Assets Funds",
            "Term Loan Setoff",
          ].map((menuItem, index) => (
            <ListItem button key={index} onClick={() => handleSidebarItemClick(menuItem)}>
              <ListItemText primary={menuItem} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default Home;
