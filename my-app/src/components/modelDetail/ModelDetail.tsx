import { Card, CardBody, Table } from "reactstrap";
import { Page } from "../page/Page";
import { useParams } from "react-router";
import styles from "./ModelDetail.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../slices/store";
import { getBlandStatistics, selectEbayStatus } from "../../slices/ebaySlices";

export const ModelDetail = () => {
  const { blandId, modelId } = useParams();
  const dispatch = useDispatch();
  const { blandStatistics } = useSelector(selectEbayStatus);

  useEffect(() => {
    if (!blandId || !modelId) {
      return;
    }
    dispatch(getBlandStatistics(Number(blandId), Number(modelId)));
  }, [blandId, modelId, dispatch]);
  return (
    <Page>
      <Card className={styles.modelDetailContainer}>
        <CardBody className="w-100 d-flex flex-column gap-3">
          <div className="fw-bold">Model Detail</div>
          <Table className={styles.modelDetailTable}>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Shipping Cost</th>
              </tr>
            </thead>
            <tbody>
              {blandStatistics
                ? blandStatistics.unSoldItems.map((statistic) => (
                  <tr key={statistic.itemName}>
                    <td>{statistic.itemName}</td>
                    <td>{statistic.itemPrice}</td>
                    <td>{statistic.itemShippingCost}</td>
                  </tr>
                ))
                : <></>}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
};
