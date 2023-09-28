import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Popconfirm, Typography, Select, DatePicker, InputNumber, Input } from 'antd';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const YourTable = () => {
  const [form] = Form.useForm();
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios.get('https://api.p360.build:6060/v1/fundflow/colevis/getCoLevies', {
      headers: {
        'Content-transactionType': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    })  
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data from API:', error);
      });
  };

  const [editingKey, setEditingKey] = useState('');
  const tableHeaderStyle = {
    backgroundColor: '#7da1ff',
    color: 'white',
    fontWeight: 'bold',
  };

  const columns = [
    {
      title: 'TTyp',
      dataIndex: 'transactionType',
      key: 'transactionType',
      width: "5%",
      render: (text, record) => renderCell(text, record, 'transactionType', 'select'),
    },
    {
      title: 'Line',
      dataIndex: 'id',
      key: 'id',
      width: "5%",
    },
    {
      title: 'Document Date',
      dataIndex: 'documentDate',
      key: 'documentDate',
      width: "7%",
      render: (text, record) => renderCell(text, record, 'documentDate', 'date'),
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      width: "5%",
      render: (text, record) => renderCell(text, record, 'year', 'text'),
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      width: "5%",
      render: (text, record) => renderCell(text, record, 'period', 'text'),
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
      width: "7%",
      render: (text, record) => renderCell(text, record, 'reference', 'text'),
    },
    {
      title: 'Payment Project',
      dataIndex: 'paymentProject',
      key: 'paymentProject',
      width: "7%",
      render: (text, record) => renderCell(text, record, 'paymentProject', 'text'),
    },
    {
      title: 'Receipt Project',
      dataIndex: 'receiptProject',
      key: 'receiptProject',
      width: "7%",
      render: (text, record) => renderCell(text, record, 'receiptProject', 'text'),
    },
    {
      title: 'Ledger',
      dataIndex: 'ledger',
      width: "8%",
      key: 'ledger',
      render: (text, record) => renderCell(text, record, 'ledger', 'select'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: "7%",
      render: (text, record) => renderCell(text, record, 'amount', 'number'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: "5%",
      render: (text, record) => renderCell(text, record, 'status', 'select'),
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      width: "7%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>Save</Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              <EditOutlined />
            </Typography.Link>
            <span style={{ margin: '0 8px' }}>|</span>
            <Typography.Link disabled={editingKey !== ''} onClick={() => duplicate(record)}>
              <CopyOutlined />
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  const renderCell = (text, record, dataIndex, inputtransactionType) => {
    const isEditing = record.key === editingKey;
    text = String(text);
    if (dataIndex === 'transactionType') {
      return isEditing ? (
        <Form.Item
          name={dataIndex}
          initialValue={text}
          rules={[
            {
              required: true,
              message: `${dataIndex} is required`,
            },
          ]}
        >
          <Select>
            <Select.Option value="BLR">BLR</Select.Option>
            <Select.Option value="CO">CO</Select.Option>
            <Select.Option value="HYD">HYD</Select.Option>
            <Select.Option value="RAN">RAN</Select.Option>
          </Select>
        </Form.Item>
      ) : (
        <div>{text}</div>
      );
    }
    else if (dataIndex === 'documentDate') {
      return isEditing ? (
        <Form.Item
          name={dataIndex}
          initialValue={text ? moment(text, 'DD-MM-YYYY') : null}
          rules={[
            {
              required: true,
              message: `${dataIndex} is required`,
            },
          ]}
        >
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
      ) : (
        <div>{text ? moment(text, 'DD-MM-YYYY').format('DD-MM-YYYY') : ''}</div>
      );
    } else if (dataIndex === 'ledger') {
      return isEditing ? (
        <Form.Item
          name={dataIndex}
          initialValue={text}
          rules={[
            {
              required: true,
              message: `${dataIndex} is required`,
            },
          ]}
        >
          <Select>
            <Select.Option value="Advance Tax 1%">Advance Tax 1%</Select.Option>
            <Select.Option value="Admin Charges 4%">Admin Charges 4%</Select.Option>
            <Select.Option value="Ad charges 1% B2B">Ad charges 1% B2B</Select.Option>
          </Select>
        </Form.Item>
      ) : (
        <div>{text}</div>
      );
    }
    else if (dataIndex === 'status') {
      return isEditing ? (
        <Form.Item
          name={dataIndex}
          initialValue={text}
          rules={[
            {
              required: true,
              message: `${dataIndex} is required`,
            },
          ]}
        >
          <Select>
            <Select.Option value="Draft">Draft</Select.Option>
            <Select.Option value="Submitted">Submitted</Select.Option>
          </Select>
        </Form.Item>
      ) : (
        <div style={{ backgroundColor: text === 'Draft' ? '#fc7f74' : text === 'Submitted' ? '#5fbffa' : 'transparent', color: "white", textAlign: "center", borderRadius: "8px" }}>
          {text}
        </div>
      );
    }
    return isEditing ? (
      <Form.Item
        name={dataIndex}
        initialValue={text}
        rules={[
          {
            required: true,
            message: `${dataIndex} is required`,
          },
        ]}
      >
        {inputtransactionType === 'number' ? (
          <InputNumber />
        ) : inputtransactionType === 'date' ? (
          <Input transactionType="date" />
        ) : (
          <Input />
        )}
      </Form.Item>
    ) : (
      <div>{text}</div>
    );
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
      isEditing: true,
    });
    setEditingKey(record.key);
    setIsEditingActive(true);
  };

  const save = (key) => {
    form.validateFields().then((values) => {
      const updatedData = data.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            ...values,
            isEditing: false,
          };
        }
        return item;
      });

      if (key === 'new') {
        axios
          .post(
            'https://api.p360.build:6060/v1/fundflow/colevis/addCoLevies',
            {
              transactionType: values.transactionType,
              documentDate: values.documentDate.format('DD-MM-YYYY'),
              year: values.year,
              period: values.period,
              reference: values.reference,
              paymentProject: values.paymentProject,
              receiptProject: values.receiptProject,
              ledger: values.ledger,
              amount: values.amount,
              status: values.status,
              createdDate: values.createdDate,
              createdBy: values.createdBy,
              submittedOn: values.submittedOn,
              submittedBy: values.submittedBy,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            }
          )
          .then((response) => {
            getDataFromAPI();
          })
          .catch(error => {
            console.error('Error saving data:', error.response || error.message || error);
          });
      } else {
        // This is an edited row, you can handle the update logic here if needed
      }

      setData(updatedData);
      setEditingKey('');
      setIsEditingActive(false);
    });
  };

  const duplicate = (record) => {
    const duplicatedRecord = {
      ...record,
      key: Math.random().toString(),
      isEditing: true,
    };

    const index = data.findIndex((item) => item.key === record.key);
    const updatedData = [...data.slice(0, index), duplicatedRecord, ...data.slice(index)];

    setData([...updatedData]);
    setEditingKey(duplicatedRecord.key);
    setIsEditingActive(true);
  };

  const cancel = (key) => {
    if (key === 'new') {
      const updatedData = data.filter((item) => item.key !== key);
      setData(updatedData);
    } else {
      form.resetFields();
      const updatedData = data.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            isEditing: false,
          };
        }
        return item;
      });
      setData(updatedData);
    }
    setEditingKey('');
    setIsEditingActive(false);
  };

  const handleAdd = () => {
    if (isEditingActive) {
      return;
    }

    const newKey = 'new';
    const newRow = {
      key: newKey,
      transactionType: '',
      line: '',
      documentNumber: '',
      documentDate: '',
      year: '',
      period: '',
      reference: '',
      paymentProject: '',
      receiptProject: '',
      ledger: '',
      amount: '',
      status: 'Draft',
      entryDate: '',
      createdBy: '',
      submittedOn: '',
      submittedBy: '',
    };

    setData([newRow, ...data]);
    setEditingKey(newKey);
  };

  return (
    <div style={{ margin: "20px" }}>
      <Form form={form} component={false}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>CO Levies</h2>
          <Button transactionType="primary" onClick={handleAdd} disabled={isEditingActive}>
            Add
          </Button>
        </div>
        {Array.isArray(data) && data.length > 0 ? (
          <Table
            columns={columns}
            dataSource={data}
            pagination={true}
            scroll={{ x: 1800, y: 350 }}
            components={{
              header: {
                cell: (props) => (
                  <th style={tableHeaderStyle}>
                    {props.children}
                  </th>
                ),
              },
            }}
          />
        ) : (
          <p>No data available</p>
        )}
      </Form>
    </div>
  );
};

export default YourTable;
