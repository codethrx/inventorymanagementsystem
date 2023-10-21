/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  Calendar,
  Printer,
  search_whites,
  Search,
  MacbookIcon,
  OrangeImage,
  PineappleImage,
  StawberryImage,
  AvocatImage,
  Product1,
  Product7,
  Product8,
  Product9,
} from "../../EntryFile/imagePath";
import Tabletop from "../../EntryFile/tabletop";

const StoreReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [inputfilter, setInputfilter] = useState(false);

  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const [data] = useState([
    {
      id: 1,
      Name: "Macbook pro",
      Category: "Aug-18-2023",
      Instock: 156,
    },
  ]);

  const columns = [
    {
      title: "Store Name",
      dataIndex: "Name",
      render: (text, record) => (
        <div className="productimgname">
          <a>{text}</a>
        </div>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },

    {
      title: "Join Date",
      dataIndex: "Category",
      sorter: (a, b) => a.Category.length - b.Category.length,
    },

    {
      title: "No of Saleman",
      dataIndex: "Instock",
      sorter: (a, b) => a.Instock.length - b.Instock.length,
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Store Report</h4>
            <h6>Manage your Store Report</h6>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <Tabletop />

            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default StoreReport;
