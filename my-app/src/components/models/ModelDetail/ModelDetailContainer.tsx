import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "../../../slices/store";
import {
  getBlandStatistics,
  selectEbayStatus,
} from "../../../slices/ebaySlices";
import { ModelDetail, ItemStatus, itemStatus, ItemData } from "./ModelDetail";

export type ModelDetailContainerProps = {
  blandId: number;
  modelId: number;
};

export const ModelDetailContainer = ({
  blandId,
  modelId,
}: ModelDetailContainerProps) => {
  const dispatch = useDispatch();
  const { blandStatistics } = useSelector(selectEbayStatus);
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus>(
    itemStatus.ACTIVE
  );
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(getBlandStatistics(blandId, modelId));
  }, [blandId, modelId, dispatch]);

  const soldItems = useMemo(
    () =>
      blandStatistics?.soldItems.map((item) => ({
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemShippingCost: item.itemShippingCost,
        isSold: true,
      })) || [],
    [blandStatistics]
  );

  const activeItems = useMemo(
    () =>
      blandStatistics?.unSoldItems.map((item) => ({
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemShippingCost: item.itemShippingCost,
        isSold: false,
      })) || [],
    [blandStatistics]
  );

  const tableData = useMemo(() => {
    switch (selectedStatus) {
      case itemStatus.ACTIVE:
        return activeItems;
      case itemStatus.SOLD:
        return soldItems;
      case itemStatus.ALL:
        return [...activeItems, ...soldItems];
    }
  }, [activeItems, selectedStatus, soldItems]);

  const handleToggleStatusDropdown = () => {
    setIsStatusDropdownOpen((prev) => !prev);
  };

  const handleSelectStatus = (status: ItemStatus) => {
    setSelectedStatus(status);
  };

  return (
    <ModelDetail
      tableData={tableData}
      selectedStatus={selectedStatus}
      isStatusDropdownOpen={isStatusDropdownOpen}
      onToggleStatusDropdown={handleToggleStatusDropdown}
      onSelectStatus={handleSelectStatus}
    />
  );
};
