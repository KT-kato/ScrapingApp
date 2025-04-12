import {
  Badge,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "reactstrap";
import styles from "./ModelDetail.module.scss";

export type ItemData = {
  itemName: string;
  itemPrice: number;
  itemShippingCost: number;
  isSold: boolean;
};

export type ItemStatus = "Active" | "Sold" | "All";
export const itemStatus = {
  ACTIVE: "Active",
  SOLD: "Sold",
  ALL: "All",
} as const;

export type ModelDetailProps = {
  tableData: ItemData[];
  selectedStatus: ItemStatus;
  isStatusDropdownOpen: boolean;
  onToggleStatusDropdown: () => void;
  onSelectStatus: (status: ItemStatus) => void;
};

export const ModelDetail = ({
  tableData,
  selectedStatus,
  isStatusDropdownOpen,
  onToggleStatusDropdown,
  onSelectStatus,
}: ModelDetailProps) => {
  return (
    <Card className={styles.modelDetailContainer}>
      <CardBody className="w-100 d-flex flex-column gap-3">
        <div className="d-flex flex-row justify-content-between">
          <div className="fw-bold">Model Detail</div>
          <Dropdown
            isOpen={isStatusDropdownOpen}
            onClick={onToggleStatusDropdown}
          >
            <DropdownToggle caret>{selectedStatus}</DropdownToggle>
            <DropdownMenu container={"body"}>
              {Object.values(itemStatus).map((status) => (
                <DropdownItem
                  key={status}
                  onClick={() => onSelectStatus(status)}
                >
                  {status}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Table className={styles.modelDetailTable}>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Shipping Cost</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr key={data.itemName}>
                <td className="w-100 d-flex flex-row gap-2 align-items-center">
                  <Badge color={data.isSold ? "danger" : "success"}>
                    {data.isSold ? "Sold" : "Active"}
                  </Badge>
                  <div>{data.itemName}</div>
                </td>
                <td>{data.itemPrice}</td>
                <td>{data.itemShippingCost}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
