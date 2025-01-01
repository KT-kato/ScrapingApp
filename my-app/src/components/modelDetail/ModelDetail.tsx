import { Card, CardBody, Table } from "reactstrap";
import { Page } from "../page/Page";

import styles from "./ModelDetail.module.scss";
import { ebayGetBlandListQueryParameters } from "../../api/ebay/type";
import { Fragment, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "../../slices/store";
import { getEbayBlandItems, selectEbayStatus } from "../../slices/ebaySlices";

export const ModelDetail = () => {
  const { blandList } = useSelector(selectEbayStatus);

  const dispatch = useDispatch();

  const blandDetailQueryParameters: ebayGetBlandListQueryParameters = useMemo(
    () => ({
      keywords: "seiko 8J55-0A10",
      categoryId: "31387",
      completed: "1",
      sold: "1",
      country: "104",
      location: "98",
    }),
    []
  );

  useEffect(() => {
    dispatch(getEbayBlandItems(blandDetailQueryParameters));
  }, [dispatch, blandDetailQueryParameters]);

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
              <tr>
                {blandList.items.map((item, index) => (
                  <Fragment key={index}>
                    <td>{`${item.itemName} 円`}</td>
                    <td>{`${item.itemPrice}  円`}</td>
                    <td>{`${item.itemSippingCost} 円`}</td>
                  </Fragment>
                ))}
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Page>
  );
};
