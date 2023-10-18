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

const SalesR = () => {
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
      Sku: "PT001",
      Category: "Computer",
      Brand: "N/D",
      Price: "1500.00",
      Unit: "5",
      Instock: 1356,
      image: Product1,
    },
    {
      id: 2,
      Name: "Orange",
      amount: 36080,
      Sku: "PT002",
      Category: "Fruits",
      Brand: "N/D",
      Price: "10.00",
      Unit: "4",
      Instock: 131,
      image: OrangeImage,
    },
    {
      id: 3,
      Name: "Pineapple",
      Sku: "PT003",
      Category: "Fruits",
      Brand: "N/D",
      Price: "10.00",
      Unit: "5",
      Instock: 131,
      image: PineappleImage,
    },
    {
      id: 4,
      Name: "Strawberry",
      Sku: "PT004",
      Category: "Fruits",
      Brand: "N/D",
      Price: "10.00",
      Unit: "3",
      Instock: 100,
      image: StawberryImage,
    },
    {
      id: 5,
      Name: "Sunglasses",
      Sku: "PT005",
      Category: "Accessories",
      Brand: "N/D",
      Price: "10.00",
      Unit: "5",
      Instock: 100,
      image: AvocatImage,
    },
    {
      id: 6,
      Name: "Unpaired gray",
      Sku: "PT006",
      Category: "Shoes",
      Brand: "Adidas",
      Price: "100.00",
      Unit: "2",
      Instock: 50,
      image: MacbookIcon,
    },
    {
      id: 7,
      Name: "Avocat",
      Sku: "PT007",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "4",
      Instock: 29,
      image: Product7,
    },
    {
      id: 8,
      Name: "Banana",
      Sku: "PT008",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "5",
      Instock: 24,
      image: Product8,
    },
    {
      id: 9,
      Name: "Earphones",
      Sku: "PT009",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "6",
      Instock: 11,
      image: Product9,
    },
    {
      id: 10,
      Name: "Banana",
      Sku: "PT010",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "10",
      Instock: 24,
      image: Product8,
    },
    {
      id: 11,
      Name: "Earphones",
      Sku: "PT007",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "3",
      Instock: 11,
      image: Product9,
    },
    {
      id: 12,
      Name: "Unpaired gray",
      Sku: "PT006",
      Category: "Shoes",
      Brand: "Adidas",
      Price: "100.00",
      Unit: "5",
      Instock: 50,
      image: MacbookIcon,
    },
    {
      id: 13,
      Name: "Avocat",
      Sku: "PT007",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "3",
      Instock: 29,
      image: Product7,
    },
    {
      id: 14,
      Name: "Banana",
      Sku: "PT008",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "5",
      Instock: 24,
      image: Product8,
    },
    {
      id: 15,
      Name: "Earphones",
      Sku: "PT009",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "7",
      Instock: 11,
      image: Product9,
    },
  ]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "Name",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img src={record.image} alt="product" />
          </Link>
          <Link to="#">{text}</Link>
        </div>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },

    {
      title: "Category",
      dataIndex: "Category",
      sorter: (a, b) => a.Category.length - b.Category.length,
    },

    {
      title: "Sold Amount",
      dataIndex: "Price",
      sorter: (a, b) => a.Price.length - b.Price.length,
    },
    {
      title: "Sold QTY",
      dataIndex: "Unit",
      sorter: (a, b) => a.Unit.length - b.Unit.length,
    },
    {
      title: "Instock QTY",
      dataIndex: "Instock",
      sorter: (a, b) => a.Instock.length - b.Instock.length,
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Sales Report</h4>
            <h6>Manage your Sales Report</h6>
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

export default SalesR;
