/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import Tabletop from "../../EntryFile/tabletop";
import "react-select2-wrapper/css/select2.css";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  PlusIcon,
  Printer,
  Search,
  search_whites,
  EditIcon,
  DeleteIcon,
} from "../../EntryFile/imagePath";
import EditStore from "./EditStore";
import AddStore from "./AddStore";
// http://localhost:4000/api/user/get-stores

const StoreList = ({ stores, refetchFlag, setRefetchFlag }) => {
  const [inputfilter, setInputfilter] = useState(false);

  const [editStoreModal, setEditStoreModal] = useState(false);
  const [addStoreModal, setAddStoreModal] = useState(false);
  const [storeId, setStoreId] = useState(null);

  const confirmText = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };
  const togglefilter = (value) => {
    setInputfilter(value);
  };

  const options = [
    { id: 1, text: "Disable", text: "Disable" },
    { id: 2, text: "Enable", text: "Enable" },
  ];

  const columns = [
    {
      title: "Store Name",
      dataIndex: "storeName",
      sorter: (a, b) => a.storeName.length - b.storeName.length,
    },

    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   sorter: (a, b) => a?.phone?.length - b?.phone?.length,
    // },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Status",

      render: (e, record) => <ToggleStatusStore data={e} />,
    },
    // {
    //   title: "Action",
    //   render: (data) => (
    //     <>
    //       <button
    //         onClick={() => {
    //           setStoreId(data._id);
    //           handleStoreModal();
    //         }}
    //         className="me-3"
    //       >
    //         <img src={EditIcon} alt="img" />
    //       </button>
    //       <button
    //         className="confirm-text"
    //         to="#"
    //         onClick={async () => {
    //           const response = await fetch(
    //             "http://localhost:4000/api/user/delete-store/" + data._id,
    //             {
    //               method: "DELETE",
    //             }
    //           );
    //           const json = await response.json();
    //           if (response.ok) {
    //             setRefetchFlag(!refetchFlag);
    //           }
    //         }}
    //       >
    //         <img src={DeleteIcon} alt="img" />
    //       </button>
    //     </>
    //   ),
    // },
  ];

  const handleStoreModal = () => setEditStoreModal(!editStoreModal);
  const handleAddStoreModal = () => setAddStoreModal(!addStoreModal);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Store List</h4>
              <h6>Manage your Store</h6>
            </div>
            <div className="page-btn">
              <a className="btn btn-added" onClick={handleAddStoreModal}>
                <img src={PlusIcon} alt="img" className="me-1" />
                Add Store
              </a>
            </div>
          </div>
          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} />

              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={stores?.map((elem) => ({
                    ...elem,
                    storeName: elem.fullName,
                  }))}
                />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>

      <Modal show={editStoreModal} onHide={handleStoreModal} size="xl">
        <Modal.Body>
          <EditStore
            customSpace="m-0 p-0"
            storeId={storeId}
            setStoreId={setStoreId}
            refetchFlag={refetchFlag}
            setRefetchFlag={setRefetchFlag}
            setAddStoreModal={setEditStoreModal}
          />
        </Modal.Body>
      </Modal>

      <Modal show={addStoreModal} onHide={handleAddStoreModal} size="xl">
        <Modal.Body>
          <AddStore
            refetchFlag={refetchFlag}
            setRefetchFlag={setRefetchFlag}
            setAddStoreModal={setAddStoreModal}
            customSpace="m-0 p-0"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StoreList;
function ToggleStatusStore({ data }) {
  const [toggle, setToggle] = useState(data.approved);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(data._id);
  const updateActivity = async () => {
    setLoading(true);
    setError(null);
    const payload = { approved: toggle };
    // formData.append("imageUrl", file);
    const response = await fetch(
      "http://localhost:4000/api/user/toggle-activity/" + data._id,
      {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${user.token}`
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json);
    }
    if (response.ok) {
      setLoading(false);
      setError(null);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (started) {
      updateActivity();
    }
  }, [started, toggle]);

  return (
    <div className="status-toggle d-flex justify-content-between align-items-center">
      <input
        type="checkbox"
        // id="user18"
        id={data._id}
        className="check"
        checked={toggle}
      />
      {/* <label htmlFor="user18" className="checktoggle"> */}
      <label
        onClick={
          loading
            ? () => {}
            : () => {
                setStarted(true);
                setToggle(!toggle);
              }
        }
        htmlFor={data._id}
        className="checktoggle"
      >
        checkbox
      </label>
    </div>
  );
}
