import { Button, Input } from "reactstrap";
import { getBlandStatisticType } from "../../api/ebay/type";
import styles from "./SalesPerformanceTable.module.scss";
import { TABLE_HEADER } from "./constraints";
import { useDispatch } from "../../slices/store";
import {
  postBlandModel,
  postBlandModelStatistics,
} from "../../slices/ebaySlices";
import { useState } from "react";

type Props = {
  blandStatisticList: getBlandStatisticType[];
  handleItemClick: (modelId: number) => void;
  blandId: number | undefined;
};

export const SalesPerformanceTable = ({
  blandStatisticList,
  handleItemClick,
  blandId,
}: Props) => {
  const dispatch = useDispatch();

  const [isModelInputFormOpen, setIsModelInputFormOpen] = useState(true);
  const [modelValue, setModelValue] = useState("");

  return (
    <>
      <div className="d-flex flex-column w-100 row-gap-2">
        <div className="w-100 d-flex flex-row column-gap-2 justify-content-end">
          {isModelInputFormOpen
            ? (
              <Button
                onClick={() => setIsModelInputFormOpen((prev) => !prev)}
              >
                Add Model
              </Button>
            )
            : (
              <>
                <Button
                  onClick={() => setIsModelInputFormOpen((prev) => !prev)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsModelInputFormOpen((prev) => !prev);
                    if (blandId) {
                      dispatch(postBlandModel(blandId, modelValue));
                    }
                  }}
                  disabled={modelValue === "" || !blandId}
                >
                  Save
                </Button>
              </>
            )}
        </div>
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
                      className="w-100"
                      onClick={() => {
                        handleItemClick(item.modelId);
                      }}
                    >
                      {item.blandModelName}
                    </Button>
                  </td>
                  <td>{item.soldItems.itemCount}</td>
                  <td>{item.unSoldItems.itemCount}</td>
                  <td>
                    {item.unSoldItems.itemCount !== 0
                      ? item.soldItems.itemCount / item.unSoldItems.itemCount
                      : 0}
                  </td>
                  <td>{item.soldItems.minPrice.toLocaleString("ja-JP")}</td>
                  <td>{item.soldItems.maxPrice.toLocaleString("ja-JP")}</td>
                  <td>{item.soldItems.averagePrice.toLocaleString("ja-JP")}</td>
                  <td>{item.unSoldItems.minPrice.toLocaleString("ja-JP")}</td>
                  <td>{item.unSoldItems.maxPrice.toLocaleString("ja-JP")}</td>
                  <td>
                    {item.unSoldItems.averagePrice.toLocaleString("ja-JP")}
                  </td>
                  <td className="text-center">
                    <i
                      className="bi bi-arrow-clockwise"
                      onClick={() => {
                        if (!blandId) {
                          return;
                        }
                        dispatch(postBlandModelStatistics(
                          blandId,
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
              {!isModelInputFormOpen &&
                (
                  <tr>
                    <Input
                      type="text"
                      placeholder="Model Name"
                      onChange={(e) => setModelValue(e.target.value)}
                    />
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
