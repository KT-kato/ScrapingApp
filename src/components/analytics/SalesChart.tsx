import {
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useMemo, useState } from 'react'
import styles from './SalesChart.module.scss'
import { getBlandStatisticType } from '../../api/ebay/type'

export type ChartItem = {
  label: string
  data: { key: number; value: number }[]
}

export type SalesChartProps = {
  statisticList: getBlandStatisticType[]
  chartItems: ChartItem[]
}

export const SalesChart = ({ statisticList, chartItems }: SalesChartProps) => {
  const [isOpenChartSelector, setIsOpenChartSelector] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const chartOptions: Highcharts.Options = useMemo(
    () => ({
      title: {
        text: '',
      },
      xAxis: {
        categories: statisticList.map(item => item.blandModelName),
      },
      series: [
        {
          data: chartItems
            .find(item => item.label === selectedItem)
            ?.data.map(item => [item.value]),
          type: 'column',
          name: selectedItem || 'Select a metric',
        },
      ],
    }),
    [chartItems, selectedItem, statisticList],
  )

  return (
    <Card className={styles.chartCard}>
      <CardTitle tag="h5">Sales Performance Chart</CardTitle>
      <CardBody className={styles.chartCardBody}>
        <div className={styles.chartItemSelector}>
          <Dropdown
            isOpen={isOpenChartSelector}
            onClick={() => setIsOpenChartSelector(!isOpenChartSelector)}
            className="me-2">
            <DropdownToggle caret>
              {selectedItem || 'Select Sales Performance'}
            </DropdownToggle>
            <DropdownMenu container="body">
              {chartItems.map(item => (
                <DropdownItem
                  key={item.label}
                  onClick={() => setSelectedItem(item.label)}>
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={styles.chartContainer}>
          <HighchartsReact
            highcharts={Highcharts}
            className={styles.chart}
            options={chartOptions}
          />
        </div>
      </CardBody>
    </Card>
  )
}
