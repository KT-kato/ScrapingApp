import { useState } from 'react'
import { useDispatch } from '../../../slices/store'
import {
  postBlandModel,
  postBlandModelStatistics,
} from '../../../slices/ebaySlices'
import { SalesPerformanceTable } from './SalesPerformanceTable'
import { getBlandStatisticType } from '../../../api/ebay/type'

export type SalesPerformanceTableContainerProps = {
  statisticList: getBlandStatisticType[]
  onItemClick: (modelId: number) => void
  blandId: number | undefined
}

export const SalesPerformanceTableContainer = ({
  statisticList,
  onItemClick,
  blandId,
}: SalesPerformanceTableContainerProps) => {
  const dispatch = useDispatch()
  const [isModelInputFormOpen, setIsModelInputFormOpen] = useState(true)
  const [modelValue, setModelValue] = useState('')

  const handleToggleModelInput = () => {
    setIsModelInputFormOpen(prev => !prev)
    if (isModelInputFormOpen) {
      setModelValue('')
    }
  }

  const handleSaveModel = () => {
    setIsModelInputFormOpen(prev => !prev)
    if (blandId) {
      dispatch(postBlandModel(blandId, modelValue))
    }
    setModelValue('')
  }

  const handleUpdateStatistics = (modelName: string) => {
    if (!blandId) {
      return
    }
    dispatch(
      postBlandModelStatistics(blandId, {
        blandModelNumber: modelName,
        categoryId: '31387',
        country: '104',
        location: '98',
      }),
    )
  }

  return (
    <SalesPerformanceTable
      statisticList={statisticList}
      isModelInputFormOpen={isModelInputFormOpen}
      modelValue={modelValue}
      onModelValueChange={setModelValue}
      onToggleModelInput={handleToggleModelInput}
      onSaveModel={handleSaveModel}
      onItemClick={onItemClick}
      onUpdateStatistics={handleUpdateStatistics}
      isSaveDisabled={modelValue === '' || !blandId}
    />
  )
}
