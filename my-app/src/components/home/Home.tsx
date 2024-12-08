import {
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import styles from "./Home.module.scss";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useState } from "react";
import { getEbayToken } from "../../slices/ebaySlices";
import { useDispatch } from "../../slices/store";
import { Page } from "../page/Page";

const listSapmle = [
  {
    id: 1,
    name: "seiko",
  },
  {
    id: 2,
    name: "rolex",
  },
  {
    id: 3,
    name: "citizen",
  },
];

const detailSample = {
  id: 1,
  name: "seiko",
  modelSalsePerformances: [
    {
      id: 1,
      model: "001",
      soldCount: 100,
      activeCount: 10,
      soldMinPrice: 10000,
      soldMaxPrice: 20000,
      soldAvgPrice: 15000,
      activeMinPrice: 20000,
      activeMaxPrice: 30000,
      activeAvgPrice: 25000,
    },
    {
      id: 2,
      model: "002",
      soldCount: 200,
      activeCount: 20,
      soldMinPrice: 20000,
      soldMaxPrice: 30000,
      soldAvgPrice: 25000,
      activeMinPrice: 30000,
      activeMaxPrice: 40000,
      activeAvgPrice: 35000,
    },
    {
      id: 3,
      model: "003",
      soldCount: 300,
      activeCount: 30,
      soldMinPrice: 30000,
      soldMaxPrice: 40000,
      soldAvgPrice: 35000,
      activeMinPrice: 40000,
      activeMaxPrice: 50000,
      activeAvgPrice: 45000,
    },
    {
      id: 4,
      model: "004",
      soldCount: 400,
      activeCount: 40,
      soldMinPrice: 40000,
      soldMaxPrice: 50000,
      soldAvgPrice: 45000,
      activeMinPrice: 50000,
      activeMaxPrice: 60000,
      activeAvgPrice: 55000,
    },
    {
      id: 5,
      model: "005",
      soldCount: 500,
      activeCount: 50,
      soldMinPrice: 50000,
      soldMaxPrice: 60000,
      soldAvgPrice: 55000,
      activeMinPrice: 60000,
      activeMaxPrice: 70000,
      activeAvgPrice: 65000,
    },
    {
      id: 6,
      model: "006",
      soldCount: 600,
      activeCount: 60,
      soldMinPrice: 60000,
      soldMaxPrice: 70000,
      soldAvgPrice: 65000,
      activeMinPrice: 70000,
      activeMaxPrice: 80000,
      activeAvgPrice: 75000,
    },
    {
      id: 7,
      model: "007",
      soldCount: 700,
      activeCount: 70,
      soldMinPrice: 70000,
      soldMaxPrice: 80000,
      soldAvgPrice: 75000,
      activeMinPrice: 80000,
      activeMaxPrice: 90000,
      activeAvgPrice: 85000,
    },
    {
      id: 8,
      model: "008",
      soldCount: 800,
      activeCount: 80,
      soldMinPrice: 80000,
      soldMaxPrice: 90000,
      soldAvgPrice: 85000,
      activeMinPrice: 90000,
      activeMaxPrice: 100000,
      activeAvgPrice: 95000,
    },
    {
      id: 9,
      model: "009",
      soldCount: 900,
      activeCount: 90,
      soldMinPrice: 90000,
      soldMaxPrice: 100000,
      soldAvgPrice: 95000,
      activeMinPrice: 100000,
      activeMaxPrice: 110000,
      activeAvgPrice: 105000,
    },
    {
      id: 10,
      model: "010",
      soldCount: 1000,
      activeCount: 100,
      soldMinPrice: 100000,
      soldMaxPrice: 110000,
      soldAvgPrice: 105000,
      activeMinPrice: 110000,
      activeMaxPrice: 120000,
      activeAvgPrice: 115000,
    },
  ],
};

const TABLE_HEADER = [
  "Model",
  "Sold Count",
  "Active Count",
  "Sold Min Price",
  "Sold Max Price",
  "Sold Avg Price",
  "Active Min Price",
  "Active Max Price",
  "Active Avg Price",
];

export const Home = () => {
  const [isOpenChartSelector, setIsOpenChartSelector] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEbayToken());
  }, [dispatch]);

  useEffect(() => {
    setSelectedItem(TABLE_HEADER[1]);
  }, []);

  const soldCountData = useMemo(() => {
    return detailSample.modelSalsePerformances.map((item) => ({
      key: item.model,
      value: item.soldCount,
    }));
  }, [detailSample.modelSalsePerformances]);

  const activeCountData = useMemo(() => {
    return detailSample.modelSalsePerformances.map((item) => ({
      key: item.model,
      value: item.activeCount,
    }));
  }, [detailSample.modelSalsePerformances]);

  const soldMinPriceData = useMemo(() => {
    return detailSample.modelSalsePerformances.map((item) => ({
      key: item.model,
      value: item.soldMinPrice,
    }));
  }, [detailSample.modelSalsePerformances]);

  const soldMaxPriceData = useMemo(() => {
    return detailSample.modelSalsePerformances.map((item) => ({
      key: item.model,
      value: item.soldMaxPrice,
    }));
  }, [detailSample.modelSalsePerformances]);

  const soldAvgPriceData = useMemo(() => {
    return detailSample.modelSalsePerformances.map((item) => ({
      key: item.model,
      value: item.soldAvgPrice,
    }));
  }, [detailSample.modelSalsePerformances]);

  const activeMinPriceData = useMemo(() => {
    return detailSample.modelSalsePerformances.map((item) => ({
      key: item.model,
      value: item.activeMinPrice,
    }));
  }, [detailSample.modelSalsePerformances]);

  const activeMaxPriceData = useMemo(() => {
    return detailSample.modelSalsePerformances.map((item) => ({
      key: item.model,
      value: item.activeMaxPrice,
    }));
  }, [detailSample.modelSalsePerformances]);

  const activeAvgPriceData = useMemo(() => {
    return detailSample.modelSalsePerformances.map((item) => ({
      key: item.model,
      value: item.activeAvgPrice,
    }));
  }, [detailSample.modelSalsePerformances]);

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
        categories: detailSample.modelSalsePerformances.map(
          (item) => item.model
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
    [chartItems, selectedItem]
  );

  return (
    <Page>
      <div className={styles.homeContainer}>
        <Card className={styles.listCard}>
          <CardBody>
            <CardTitle tag="h5">Bland List</CardTitle>
            <ListGroup className="my-5">
              {listSapmle.map((item) => (
                <ListGroupItem
                  key={item.id}
                  className={`list-group-item-action action ${styles.listGroupItem}`}
                  href="#pablo"
                  tag={"a"}
                >
                  {item.name}
                </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
        <Card className={styles.detailCard}>
          <CardBody className={styles.detailCardBody}>
            <CardTitle tag="h5">Salse Performance</CardTitle>
            <div className={styles.tableWrapper}>
              <table className={styles.salesPerformanceTable}>
                <thead>
                  <tr>
                    {TABLE_HEADER.map((item) => (
                      <th key={item}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detailSample.modelSalsePerformances.map((item) => (
                    <tr key={item.id}>
                      <td>{item.model}</td>
                      <td>{item.soldCount}</td>
                      <td>{item.activeCount}</td>
                      <td>{item.soldMinPrice}</td>
                      <td>{item.soldMaxPrice}</td>
                      <td>{item.soldAvgPrice}</td>
                      <td>{item.activeMinPrice}</td>
                      <td>{item.activeMaxPrice}</td>
                      <td>{item.activeAvgPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.chartItemSelector}>
              <Dropdown
                isOpen={isOpenChartSelector}
                onClick={() => setIsOpenChartSelector(!isOpenChartSelector)}
                className="me-2"
              >
                <DropdownToggle caret>Select Performance Item</DropdownToggle>
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
