import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

import "./table.css";
import { addAction } from "../List/statusShow.js";
import { addRejectAction } from "../List/statusReject.js";
import { addPending } from "../List/statusPending.js";
import { addAll } from "../List/statusAll";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  QuestionCircleFilled,
  DatabaseFilled,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

function TableComp(props) {
  const [dataTable, setDataTable] = useState([]);
  const { formValues } = props;
  const { email } = formValues;
  const [newData, setNewData] = useState([]);

  // const history = useHistory();
  // const handleRoute = (e) => {
  //   history.push(e);
  // };
  useEffect(() => {
    axios
      .post("http://localhost:5030/listRequest", formValues)
      .then((res) => setDataTable(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setNewData(dataTable);
    console.log("new data", dataTable);
  }, [dataTable]);

  async function handleApprove(payload) {
    console.log("jaiiii");
    let response = await addAction(payload);

    setNewData(response);
  }
  async function handleRejected(payload) {
    let response = await addRejectAction(payload);
    setNewData(response);
  }
  async function handlePending(payload) {
    let response = await addPending(payload);
    setNewData(response);
  }
  async function handleAll(payload) {
    let response = await addAll(payload);
    setNewData(response);
  }

  const column = [
    {
      title: "EMAIL",
      dataIndex: "useremail",
      render: (useremail) => {
        return <a>{useremail}</a>;
      },
      width: "20%",
    },
    { title: "REQUEST TYPE", dataIndex: "requesttype", width: "20%" },
    { title: "APPROVER", dataIndex: "approver" },
    {
      title: "RAISED ON",
      dataIndex: "raisedon",
      width: "20%",
      render: (raisedon) => {
        if (raisedon.includes("T")) {
          return <p>{raisedon.split("T")[0]}</p>;
        }
      },
    },
    { title: "TIME", dataIndex: "time", width: "20%" },
    {
      title: "STATUS",
      dataIndex: "status",
      width: "20%",
      render: (tag) => {
        const color = tag.includes("approved")
          ? "success"
          : tag.includes("rejected")
          ? "error"
          : "processing";
        const icon = tag.includes("approved") ? (
          <CheckCircleOutlined />
        ) : tag.includes("rejected") ? (
          <CloseCircleOutlined />
        ) : (
          <SyncOutlined spin />
        );
        return (
          <Tag color={color} icon={icon}>
            {tag}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="App">
      <header className="header">
        <div className="site-button-ghost-wrapper">
          <Button
            type="default"
            size="large"
            icon={<CheckCircleFilled />}
            onClick={() => {
              handleApprove({ email });
            }}
          >
            APPROVED
          </Button>
          <Button
            type="default"
            size="large"
            icon={<CloseCircleFilled />}
            onClick={() => {
              handleRejected({ email });
            }}
          >
            REJECTED
          </Button>
          <Button
            type="default"
            size="large"
            icon={<QuestionCircleFilled />}
            onClick={() => {
              handlePending({ email });
            }}
          >
            PENDING
          </Button>
          <Button
            type="default"
            size="large"
            icon={<DatabaseFilled />}
            onClick={() => {
              handleAll({ email });
            }}
          >
            ALL
          </Button>
        </div>
      </header>

      <Table
        dataSource={newData}
        columns={column}
        pagination={true}
        bordered
        size="large"
      />
    </div>
  );
}

export default TableComp;
