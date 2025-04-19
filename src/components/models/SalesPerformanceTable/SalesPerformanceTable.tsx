import { Button, Input } from 'reactstrap'
import { getBlandStatisticType } from '../../../api/ebay/type'
import styles from './SalesPerformanceTable.module.scss'

// テーブルヘッダー定義
const TABLE_HEADER: string[] = [
  'Model',
  'Sold Count',
  'Active Count',
  'Sold/Active Ratio',
  'Sold Min Price',
  'Sold Max Price',
  'Sold Avg Price',
  'Active Min Price',
  'Active Max Price',
  'Active Avg Price',
  'Update',
]

export type SalesPerformanceTableProps = {
  statisticList: getBlandStatisticType[]
  isModelInputFormOpen: boolean
  modelValue: string
  onModelValueChange: (value: string) => void
  onToggleModelInput: () => void
  onSaveModel: () => void
  onItemClick: (modelId: number) => void
  onUpdateStatistics: (modelName: string) => void
  isSaveDisabled: boolean
}

export const SalesPerformanceTable = ({
  statisticList,
  isModelInputFormOpen,
  modelValue,
  onModelValueChange,
  onToggleModelInput,
  onSaveModel,
  onItemClick,
  onUpdateStatistics,
  isSaveDisabled,
}: SalesPerformanceTableProps) => {
  return (
    <div className="d-flex flex-column w-100 row-gap-2">
      <div className="w-100 d-flex flex-row column-gap-2 justify-content-end">
        {isModelInputFormOpen ? (
          <Button onClick={onToggleModelInput}>Add Model</Button>
        ) : (
          <>
            <Button onClick={onToggleModelInput}>Cancel</Button>
            <Button onClick={onSaveModel} disabled={isSaveDisabled}>
              Save
            </Button>
          </>
        )}
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.salesPerformanceTable}>
          <thead>
            <tr>
              {TABLE_HEADER.map((item: string) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {statisticList.map(item => (
              <tr key={item.modelId}>
                <td>
                  <Button
                    className="w-100"
                    onClick={() => onItemClick(item.modelId)}>
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
                <td>{item.soldItems.minPrice.toLocaleString('ja-JP')}</td>
                <td>{item.soldItems.maxPrice.toLocaleString('ja-JP')}</td>
                <td>{item.soldItems.averagePrice.toLocaleString('ja-JP')}</td>
                <td>{item.unSoldItems.minPrice.toLocaleString('ja-JP')}</td>
                <td>{item.unSoldItems.maxPrice.toLocaleString('ja-JP')}</td>
                <td>{item.unSoldItems.averagePrice.toLocaleString('ja-JP')}</td>
                <td className="text-center">
                  <i
                    className="bi bi-arrow-clockwise"
                    onClick={() => onUpdateStatistics(item.blandModelName)}></i>
                </td>
              </tr>
            ))}
            {!isModelInputFormOpen && (
              <tr>
                <Input
                  type="text"
                  placeholder="Model Name"
                  value={modelValue}
                  onChange={e => onModelValueChange(e.target.value)}
                />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
