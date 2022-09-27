import "./table.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
const Table = ({ data, column }) => {
  return (
    <table>
      <thead>
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button
            className="btn"
            variant="contained"
            color="default"
            margin-right="5px"
          >
            PENDING
          </Button>

          <Button
            className="btn1"
            variant="contained"
            color="primary"
            margin-left="5px"
            // onClick={() => {
            //   handleReject(item);
            // }}
          >
            APPROVED
          </Button>
          <Button
            className="btn1"
            variant="contained"
            color="secondary"
            margin-left="5px"
            // onClick={() => {
            //   handleReject(item);
            // }}
          >
            REJECTED
          </Button>
        </ButtonGroup>
      </thead>
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem item={item} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow item={item} column={column} />
        ))}
      </tbody>
    </table>
  );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
const TableRow = ({ item, column }) => (
  <tr>
    {column.map((columnItem, index) => {
      if (item[columnItem.value].includes("T")) {
        return <td>{item[columnItem.value].split("T")[0]}</td>;
      }
      return <td>{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);

export default Table;
