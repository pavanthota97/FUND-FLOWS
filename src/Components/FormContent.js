import React, { useState } from 'react';
import {
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

  return (
    <div>
      <BusinessIcon
        style={{ marginRight: '10px', cursor: 'pointer' }}
        onClick={toggleSidebar}
      />
      {/* The rest of your component code */}
    </div>
  );
}

export default Home;
