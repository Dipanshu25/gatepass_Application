import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import "./list.css";
import { addAction } from "../List/statusShow.js";
import { addRejectAction } from "../List/statusReject.js";
import { addPending } from "../List/statusPending.js";
import { addAll } from "../List/statusAll";
import { addStatus } from "./statusUpdate.js";
import { addReject } from "./statusUpdate2.js";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  QuestionCircleFilled,
  DatabaseFilled,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  CheckSquareTwoTone,
} from "@ant-design/icons";

function ListComp(props) {
  const [dataTable, setDataTable] = useState([]);
  const { formValues } = props;
  const { email } = formValues;
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5030/listRequest", formValues)
      .then((res) => setDataTable(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setNewData(dataTable);
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
  async function addView(payload) {
    let response = await axios
      .post("http://localhost:5030/statusApproved", payload)
      .then((response) => setDataTable(response.data))
      .catch((error) => error.response.data);
  }

  async function handleChange(payload) {
    let response = await addStatus(payload);
    addView({ email });
  }

  async function handleReject(payload) {
    console.log(payload);
    let response = await addReject(payload);
    addView({ email });
  }

  const column = [
    {
      title: "EMAIL",
      dataIndex: "useremail",
      render: (useremail) => {
        return <a>{useremail}</a>;
      },
      filters: [
        {
          text: "abc123@digi.com",
          value: "abc123@digi.com",
        },
        {
          text: "manager23@digi.com",
          value: "manager123@digi.com",
        },
        {
          text: "security123@digi.com",
          value: "security123@digi.com",
        },
      ],
      width: "20%",
      onFilter: (value, record) => record.useremail.indexOf(value) === 0,
    },
    { title: "REQUEST TYPE", dataIndex: "requesttype" },
    { title: "APPROVER", dataIndex: "approver" },
    {
      title: "RAISED ON",
      dataIndex: "raisedon",

      render: (raisedon) => {
        if (raisedon.includes("T")) {
          return <p>{raisedon.split("T")[0]}</p>;
        }
      },

      sorter: (a, b) =>
        a.raisedon.split("T")[0].substring(8, 10) -
        b.raisedon.split("T")[0].substring(8, 10),
    },
    { title: "TIME", dataIndex: "time" },
    {
      title: "STATUS",
      dataIndex: "status",
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
    {
      title: "ACTION",
      render: (payload, record) => {
        if (email === "superadmin123@digi.com") {
          return (
            <>
              <CheckCircleFilled
                onClick={() => {
                  handleChange(record);
                }}
                style={{ color: "#52c41a", marginRight: 15, fontSize: "large" }}
              />
              <CloseCircleFilled
                onClick={() => {
                  handleReject(record);
                }}
                style={{
                  color: "#eb2f96",
                  marginLeft: 5,
                  fontSize: "large",
                }}
              />
            </>
          );
        } else {
          if (payload.useremail !== "manager123@digi.com") {
            return (
              <>
                <CheckCircleFilled
                  onClick={() => {
                    handleChange(record);
                  }}
                  style={{
                    color: "#52c41a",
                    marginRight: 15,
                    fontSize: "large",
                  }}
                />
                <CloseCircleFilled
                  onClick={() => {
                    handleReject(record);
                  }}
                  style={{
                    color: "#eb2f96",
                    marginLeft: 5,
                    fontSize: "large",
                  }}
                />
              </>
            );
          } else {
            return <p>ADMIN</p>;
          }
        }
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

export default ListComp;
