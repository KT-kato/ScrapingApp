import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "../slices/store";
import {
  getBlandList,
  getBlandStatisticList,
  postBland,
  selectEbayStatus,
} from "../slices/ebaySlices";
import { useNavigate } from "react-router";
import { shallowEqual } from "react-redux";
import { Page } from "../components/layout/Page/Page";
import { BrandList } from "../components/brands/BrandList";
import { SalesPerformanceTableContainer } from "../components/models/SalesPerformanceTable/SalesPerformanceTableContainer";
import { SalesChart } from "../components/analytics/SalesChart";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blandList, blandStatisticList } = useSelector(
    selectEbayStatus,
    shallowEqual
  );
  const [selectedBlandId, setSelectedBlandId] = useState<number | undefined>();

  // ブランドリストの取得
  useEffect(() => {
    dispatch(getBlandList());
  }, [dispatch]);

  // 初期ブランド選択と統計情報の取得
  useEffect(() => {
    if (blandList.length === 0) {
      return;
    }
    setSelectedBlandId(blandList[0].id);
    dispatch(getBlandStatisticList(blandList[0].id));
  }, [blandList, dispatch]);

  // ブランド選択時の処理
  const handleSelectBrand = (brandId: number) => {
    setSelectedBlandId(brandId);
    dispatch(getBlandStatisticList(brandId));
  };

  // ブランド追加時の処理
  const handleAddBrand = (brandName: string) => {
    dispatch(postBland(brandName));
  };

  // モデル詳細ページへの遷移
  const handleModelClick = (modelId: number) => {
    if (selectedBlandId) {
      navigate(`/brands/${selectedBlandId}/models/${modelId}`);
    }
  };

  // チャートデータの作成
  const chartItems = useMemo(() => {
    const soldCountData = blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.soldItems.itemCount,
    }));

    const activeCountData = blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.unSoldItems.itemCount,
    }));

    const activeSoldRatioData = blandStatisticList.map((item) => ({
      key: item.modelId,
      value:
        item.unSoldItems.itemCount !== 0
          ? item.soldItems.itemCount / item.unSoldItems.itemCount
          : 0,
    }));

    const soldMinPriceData = blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.soldItems.minPrice,
    }));

    const soldMaxPriceData = blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.soldItems.maxPrice,
    }));

    const soldAvgPriceData = blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.soldItems.averagePrice,
    }));

    const activeMinPriceData = blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.unSoldItems.minPrice,
    }));

    const activeMaxPriceData = blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.unSoldItems.maxPrice,
    }));

    const activeAvgPriceData = blandStatisticList.map((item) => ({
      key: item.modelId,
      value: item.unSoldItems.averagePrice,
    }));

    return [
      { label: "Sold Count", data: soldCountData },
      { label: "Active Count", data: activeCountData },
      { label: "Active/Sold Ratio", data: activeSoldRatioData },
      { label: "Sold Min Price", data: soldMinPriceData },
      { label: "Sold Max Price", data: soldMaxPriceData },
      { label: "Sold Avg Price", data: soldAvgPriceData },
      { label: "Active Min Price", data: activeMinPriceData },
      { label: "Active Max Price", data: activeMaxPriceData },
      { label: "Active Avg Price", data: activeAvgPriceData },
    ];
  }, [blandStatisticList]);

  return (
    <Page>
      <div className={styles.homeContainer}>
        <div className={styles.brandListContainer}>
          <BrandList
            brands={blandList}
            selectedBrandId={selectedBlandId}
            onSelectBrand={handleSelectBrand}
            onAddBrand={handleAddBrand}
          />
        </div>
        <div className={styles.contentContainer}>
          <SalesPerformanceTableContainer
            statisticList={blandStatisticList}
            onItemClick={handleModelClick}
            blandId={selectedBlandId}
          />
          <SalesChart
            statisticList={blandStatisticList}
            chartItems={chartItems}
          />
        </div>
      </div>
    </Page>
  );
};
