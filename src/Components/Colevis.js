import React, { useState } from 'react';
import { Button, Table, Input, Select } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import DuplicateIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Option } = Select;

const Colevies = () => {
  const [isnewrecord, setisnewrecord] = useState(false);
  const [data, setData] = useState([]);

  const toggleInputRow = () => {
    setisnewrecord(!isnewrecord);
    if (!isnewrecord) {
      const newKey = Math.max(...data.map((item) => item.key), 0) + 1;
      const newRecord = {
        key: newKey,
        type: '',
        documentDate: '',
        year: '',
        period: '',
        reference: '',
        paymentProject: '',
        receiptProject: '',
        ledger: '',
        amount: '',
        status: '',
        isEditing: true,
      };
      setData([newRecord, ...data]);
    }
  };

  const handleFieldChange = (key, fieldName, value) => {
    const newData = [...data];
    const targetRow = newData.find((item) => item.key === key);
    if (targetRow) {
      targetRow[fieldName] = value;
      setData(newData);
    }
  };

  const handleDuplicate = (key) => {
    const targetRow = data.find((item) => item.key === key);
    if (targetRow) {
      const newKey = Math.max(...data.map((item) => item.key), 0) + 1;
      const duplicatedRow = { ...targetRow, key: newKey };
      const newData = [...data];
      const index = newData.findIndex((item) => item.key === key);
      if (index !== -1) {
        newData.splice(index + 1, 0, duplicatedRow);
        setData(newData);
      }
    }
  };

  const handleEdit = (key) => {
    const newData = [...data];
    const targetRow = newData.find((item) => item.key === key);
    if (targetRow) {
      targetRow.isEditing = true;
      setData(newData);
    }
  };

  const handleSave = (key) => {
    const newData = [...data];
    const targetRow = newData.find((item) => item.key === key);
    if (targetRow) {
      targetRow.isEditing = false;
      // Implement save functionality here
      // You can save the edited row data or perform other actions
      // For now, let's just log the row data for demonstration
      console.log('Saving row with key:', key, 'Data:', targetRow);
      setData(newData);
    }
  };

  const handleCancel = (key) => {
    const newData = [...data];
    // const targetRow = Math.max(...data.map((item) => item.key), 0) + 1;
    const targetRow = newData.find((item) => item.key === key);

    if (targetRow) {
      if (targetRow.key < 0) {
        // If it's a newly added row (key is negative), remove it
        newData.splice(newData.indexOf(targetRow), 1);
      } else if (targetRow.isEditing) {
        // If it's an edited row, revert the changes by copying the original data back
        const originalData = data.find((item) => item.key === key);
        if (originalData) {
          targetRow.type = originalData.type;
          targetRow.documentDate = originalData.documentDate;
          targetRow.year = originalData.year;
          targetRow.period = originalData.period;
          targetRow.reference = originalData.reference;
          targetRow.paymentProject = originalData.paymentProject;
          targetRow.receiptProject = originalData.receiptProject;
          targetRow.ledger = originalData.ledger;
          targetRow.amount = originalData.amount;
          targetRow.status = originalData.status;
          targetRow.isEditing = false; // Exit edit mode
        }
      }
      setData(newData);
    }
  };

  const columns = [
    {
      title: 'T Type',
      dataIndex: 'type',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        record.isEditing ? (
          <Select
            value={record.type}
            onChange={(value) => handleFieldChange(record.key, 'type', value)}
          >
            <Option value="BLR">BLR</Option>
            <Option value="CO">CO</Option>
            <Option value="HYD">HYD</Option>
            <Option value="RAN">RAN</Option>
          </Select>
        ) : record.type
      ),
    },
    {
      title: 'Document Date',
      dataIndex: 'documentDate',
      width: '15%',
      align: 'center',
      render: (_, record) => (
        record.isEditing ? (
          <Input
            value={record.documentDate}
            onChange={(e) => handleFieldChange(record.key, 'documentDate', e.target.value)}
          />
        ) : record.documentDate
      ),
    },
    {
      title: 'Year',
      dataIndex: 'year',
      width: '7%',
      align: 'center',
      render: (_, record) => (
        record.isEditing ? (
          <Input
            value={record.year}
            onChange={(e) => handleFieldChange(record.key, 'year', e.target.value)}
          />
        ) : record.year
      ),
    },
    {
      title: 'Period',
      dataIndex: 'period',
      width: '7%',
      align: 'center',
      render: (_, record) => (
        record.isEditing ? (
          <Input
            value={record.period}
            onChange={(e) => handleFieldChange(record.key, 'period', e.target.value)}
          />
        ) : record.period
      ),
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        record.isEditing ? (
          <Input
            value={record.reference}
            onChange={(e) => handleFieldChange(record.key, 'reference', e.target.value)}
          />
        ) : record.reference
      ),
    },
    {
      title: 'Payments Projects',
      dataIndex: 'paymentProject',
      width: '15%',
      align: 'center',
      render: (_, record) => (
        record.isEditing ? (
          <Input
            value={record.paymentProject}
            onChange={(e) => handleFieldChange(record.key, 'paymentProject', e.target.value)}
          />
        ) : record.paymentProject
      ),
    },
    {
      title: 'Receipts Project',
      dataIndex: 'receiptProject',
      width: '15%',
      align: 'center',
      render: (_, record) => (
        record.isEditing ? (
          <Input
            value={record.receiptProject}
            onChange={(e) => handleFieldChange(record.key, 'receiptProject', e.target.value)}
          />
        ) : record.receiptProject
      ),
    },
    {
      title: 'Ledger',
      dataIndex: 'ledger',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        record.isEditing ? (
          <Input
            value={record.ledger}
            onChange={(e) => handleFieldChange(record.key, 'ledger', e.target.value)}
          />
        ) : record.ledger
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: '8%',
      align: 'center',
      render: (_, record) => (
        record.isEditing ? (
          <Input
            value={record.amount}
            onChange={(e) => handleFieldChange(record.key, 'amount', e.target.value)}
          />
        ) : record.amount
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        record.isEditing ? (
          <Input
            value={record.status}
            onChange={(e) => handleFieldChange(record.key, 'status', e.target.value)}
          />
        ) : record.status
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '8%',
      align: 'center',
      render: (_, record) => (
        <div>
          {record.isEditing ? (
            <>
              <SaveIcon
                onClick={() => handleSave(record.key)}
                style={{ cursor: 'pointer', marginRight: '8px' }}
              />
              <CancelIcon
                onClick={() => handleCancel(record.key)}
                style={{ cursor: 'pointer' }}
              />
            </>
          ) : (
            <>
              <EditIcon
                onClick={() => handleEdit(record.key)}
                style={{ cursor: 'pointer', marginRight: '8px' }}
              />
              <DuplicateIcon
                onClick={() => handleDuplicate(record.key)}
                style={{ cursor: 'pointer' }}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={toggleInputRow} className="my-3">
        Add
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ width: '100vw', height: '50vh' }}
        scroll={{ y: 500, x: 2200 }}
      />
    </div>
  );
};

export default Colevies;
