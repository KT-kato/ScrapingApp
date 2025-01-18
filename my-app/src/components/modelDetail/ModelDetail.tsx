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
import { Page } from "../page/Page";
import { useParams } from "react-router";
import styles from "./ModelDetail.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "../../slices/store";
import { getBlandStatistics, selectEbayStatus } from "../../slices/ebaySlices";

type ItemStatus = "Active" | "Sold" | "All";
const itemStatus = {
  ACTIVE: "Active",
  SOLD: "Sold",
  ALL: "All",
} as const;

export const ModelDetail = () => {
  const { blandId, modelId } = useParams();
  const dispatch = useDispatch();
  const { blandStatistics } = useSelector(selectEbayStatus);
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus>(
    itemStatus.ACTIVE,
  );
  const [isOpenSelectStatusButton, setIsOpenSelectStatusButton] = useState(
    false,
  );

  useEffect(() => {
    if (!blandId || !modelId) {
      return;
    }
    dispatch(getBlandStatistics(Number(blandId), Number(modelId)));
  }, [blandId, modelId, dispatch]);

  const soldItems = useMemo(() =>
    blandStatistics?.soldItems.map((item) => ({
      itemName: item.itemName,
      itemPrice: item.itemPrice,
      itemShippingCost: item.itemShippingCost,
      isSold: true,
    })) || [], [blandStatistics]);

  const activeItems = useMemo(
    () =>
      blandStatistics?.unSoldItems.map((item) => ({
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemShippingCost: item.itemShippingCost,
        isSold: false,
      })) || [],
    [blandStatistics],
  );

  const tableRowData = useMemo(() => {
    switch (selectedStatus) {
      case itemStatus.ACTIVE:
        return activeItems;
      case itemStatus.SOLD:
        return soldItems;
      case itemStatus.ALL:
        return [...activeItems, ...soldItems];
    }
  }, [activeItems, selectedStatus, soldItems]);

  return (
    <Page>
      <Card className={styles.modelDetailContainer}>
        <CardBody className="w-100 d-flex flex-column gap-3">
          <div className="d-flex flex-row justify-content-between">
            <div className="fw-bold">Model Detail</div>
            <Dropdown
              isOpen={isOpenSelectStatusButton}
              onClick={() => setIsOpenSelectStatusButton((prev) => !prev)}
            >
              <DropdownToggle caret>
                {selectedStatus}
              </DropdownToggle>
              <DropdownMenu container={"body"}>
                {Object.values(itemStatus).map((status) => {
                  return (
                    <DropdownItem
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </DropdownItem>
                  );
                })}
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
              {tableRowData.map((data) => {
                return (
                  <tr key={data.itemName}>
                    <td className="w-100 d-flex flex-row gap-2 align-items-center">
                      <Badge color={data.isSold ? "danger" : "success"}>
                        {data.isSold ? "Sold" : "Active"}
                      </Badge>
                      <div>
                        {data.itemName}
                      </div>
                    </td>
                    <td>{data.itemPrice}</td>
                    <td>{data.itemShippingCost}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
};
