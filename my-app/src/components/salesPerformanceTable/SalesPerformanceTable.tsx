import { Button } from "reactstrap";
import { getBlandStatisticType } from "../../api/ebay/type";
import styles from "./SalesPerformanceTable.module.scss";
import { TABLE_HEADER } from "./constraints";
import { useDispatch } from "../../slices/store";
import { postBlandModelStatistics } from "../../slices/ebaySlices";

type Props = {
  blandStatisticList: getBlandStatisticType[];
  handleItemClick: (modelId: number) => void;
};

export const SalesPerformanceTable = ({
  blandStatisticList,
  handleItemClick,
}: Props) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.salesPerformanceTable}>
        <thead>
          <tr>
            {TABLE_HEADER.map((item) => <th key={item}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {blandStatisticList.map((item) => (
            <tr key={item.modelId}>
              <td>
                <Button
                  onClick={() => {
                    handleItemClick(item.modelId);
                  }}
                >
                  {item.blandModelName}
                </Button>
              </td>
              <td>{item.soldItems.itemCount}</td>
              <td>{item.unSoldItems.itemCount}</td>
              <td>{item.soldItems.minPrice}</td>
              <td>{item.soldItems.maxPrice}</td>
              <td>{item.soldItems.averagePrice}</td>
              <td>{item.unSoldItems.minPrice}</td>
              <td>{item.unSoldItems.maxPrice}</td>
              <td>{item.unSoldItems.averagePrice}</td>
              <td className="text-center">
                <i
                  className="bi bi-arrow-clockwise"
                  onClick={() => {
                    dispatch(postBlandModelStatistics(
                      item.modelId,
                      {
                        blandModelNumber: item.blandModelName,
                        categoryId: "31387",
                        country: "104",
                        location: "98",
                      },
                    ));
                  }}
                >
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
