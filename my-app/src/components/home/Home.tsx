import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import styles from "./Home.module.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useState } from "react";
import {
  getBlandList,
  getBlandStatisticList,
  postBland,
  selectEbayStatus,
} from "../../slices/ebaySlices";
import { useDispatch, useSelector } from "../../slices/store";
import { Page } from "../page/Page";
import { useNavigate } from "react-router";
import { shallowEqual } from "react-redux";
import { SalesPerformanceTable } from "../salesPerformanceTable/SalesPerformanceTable";

export const Home = () => {
  const [isOpenChartSelector, setIsOpenChartSelector] = useState(false);
  const [selectedBlandId, setSelectedBlandId] = useState<number | undefined>();
  const [selectedItem, setSelectedItem] = useState("");
  const [isBlandInputFormOpen, setIsBlandInputFormOpen] = useState(false);
  const [addedBlandName, setAddedBlandName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blandList, blandStatisticList } = useSelector(
    selectEbayStatus,
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getBlandList());
  }, [dispatch]);

  useEffect(() => {
    if (blandList.length === 0) {
      return;
    }
    console.log("blandList: ", blandList);
    setSelectedBlandId(blandList[0].id);
    dispatch(getBlandStatisticList(blandList[0].id));
  }, [blandList, dispatch]);

  const soldCountData = useMemo(() => {
    return blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.soldItems.itemCount,
    }));
  }, [blandStatisticList]);

  const activeCountData = useMemo(() => {
    return blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.unSoldItems.itemCount,
    }));
  }, [blandStatisticList]);

  const soldMinPriceData = useMemo(() => {
    return blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.soldItems.minPrice,
    }));
  }, [blandStatisticList]);

  const soldMaxPriceData = useMemo(() => {
    return blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.soldItems.maxPrice,
    }));
  }, [blandStatisticList]);

  const soldAvgPriceData = useMemo(() => {
    return blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.soldItems.averagePrice,
    }));
  }, [blandStatisticList]);

  const activeMinPriceData = useMemo(() => {
    return blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.unSoldItems.minPrice,
    }));
  }, [blandStatisticList]);

  const activeMaxPriceData = useMemo(() => {
    return blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.unSoldItems.maxPrice,
    }));
  }, [blandStatisticList]);

  const activeAvgPriceData = useMemo(() => {
    return blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.unSoldItems.averagePrice,
    }));
  }, [blandStatisticList]);

  const chartItems = useMemo(() => {
    return [
      { label: "Sold Count", data: soldCountData },
      { label: "Active Count", data: activeCountData },
      { label: "Sold Min Price", data: soldMinPriceData },
      { label: "Sold Max Price", data: soldMaxPriceData },
      { label: "Sold Avg Price", data: soldAvgPriceData },
      { label: "Active Min Price", data: activeMinPriceData },
      { label: "Active Max Price", data: activeMaxPriceData },
      { label: "Active Avg Price", data: activeAvgPriceData },
    ];
  }, [
    soldCountData,
    activeCountData,
    soldMinPriceData,
    soldMaxPriceData,
    soldAvgPriceData,
    activeMinPriceData,
    activeMaxPriceData,
    activeAvgPriceData,
  ]);

  const chartOptions: Highcharts.Options = useMemo(
    () => ({
      title: {
        text: "",
      },
      xAxis: {
        categories: blandStatisticList.map(
          (item) => item.blandModelName,
        ),
      },
      series: [
        {
          data: chartItems
            .find((item) => item.label === selectedItem)
            ?.data.map((item) => [item.value]),
          type: "column",
          name: "Sold Count",
        },
      ],
    }),
    [chartItems, selectedItem, blandStatisticList],
  );

  return (
    <Page>
      <div className={styles.homeContainer}>
        <Card className={styles.listCard}>
          <CardBody className="d-flex flex-column justify-content-between">
            <div className={styles.listCardBody}>
              <CardTitle tag="h5">Bland List</CardTitle>
              <ListGroup>
                {blandList.length > 0
                  ? blandList.map((item) => (
                    <ListGroupItem
                      key={item.id}
                      className={`list-group-item-action action ${styles.listGroupItem}`}
                      href="#pablo"
                      tag={"a"}
                      onClick={() => {
                        setSelectedBlandId(item.id);
                        dispatch(getBlandStatisticList(item.id));
                      }}
                    >
                      {item.blandName}
                    </ListGroupItem>
                  ))
                  : <></>}
                {isBlandInputFormOpen
                  ? (
                    <Input
                      type="text"
                      className={styles.blandInput}
                      placeholder="Input Bland Name"
                      onChange={(e) => setAddedBlandName(e.target.value)}
                      value={addedBlandName}
                    />
                  )
                  : <></>}
              </ListGroup>
            </div>
            <div className="d-flex flex-row justify-content-between">
              <div className="align-self-start">
                {isBlandInputFormOpen
                  ? (
                    <Button
                      onClick={() => {
                        setIsBlandInputFormOpen((prev) => !prev);
                        setAddedBlandName("");
                      }}
                    >
                      <i className="fas fa-times" />
                      Cancel
                    </Button>
                  )
                  : <></>}
              </div>
              <div className="align-self-end">
                {isBlandInputFormOpen
                  ? (
                    <Button
                      onClick={() => {
                        setIsBlandInputFormOpen((prev) => !prev);
                        dispatch(postBland(addedBlandName));
                      }}
                      disabled={addedBlandName === ""}
                    >
                      <i className="fas fa-times" />
                      Save
                    </Button>
                  )
                  : (
                    <Button
                      onClick={() => setIsBlandInputFormOpen((prev) => !prev)}
                    >
                      <i className="fas fa-plus" />
                      Add Bland
                    </Button>
                  )}
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className={styles.detailCard}>
          <CardBody className={styles.detailCardBody}>
            <CardTitle tag="h5">Salse Performance</CardTitle>
            <SalesPerformanceTable
              blandStatisticList={blandStatisticList}
              handleItemClick={(modelId) =>
                navigate(
                  `/home/bland/${selectedBlandId}/model/${modelId}`,
                )}
            />
            <div className={styles.chartItemSelector}>
              <Dropdown
                isOpen={isOpenChartSelector}
                onClick={() => setIsOpenChartSelector(!isOpenChartSelector)}
                className="me-2"
              >
                <DropdownToggle caret>
                  {selectedItem || "Select Sales Performance"}
                </DropdownToggle>
                <DropdownMenu container="body">
                  {chartItems.map((item) => (
                    <DropdownItem
                      key={item.label}
                      onClick={() => setSelectedItem(item.label)}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className={styles.chartContainer}>
              <HighchartsReact
                highcharts={Highcharts}
                class={styles.chart}
                options={chartOptions}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </Page>
  );
};
