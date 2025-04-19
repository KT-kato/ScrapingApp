import { http, HttpResponse } from 'msw'
import { modelList } from '../data/models'
import { blandStatisticsResponse, statisticsData } from '../data/statistics'
import {
  ebayPostBlandModelStatisticsRequestBody,
  getBlandModelListResponseType,
  getBlandStatisticListResponseType,
  getBlandStatisticsResponseType,
} from '../../api/ebay/type'

export const modelHandlers = [
  http.get<{ blandId: string }, getBlandModelListResponseType>(
    '*/ebay/bland/:blandId/models',
    ({ params }) => {
      const blandId = params.blandId
      const filteredModels = modelList
        .filter(model => model.brandId === parseInt(blandId, 10))
        .map(model => ({
          id: model.id,
          blandModelName: model.name,
        }))
      return new HttpResponse(JSON.stringify({ modelList: filteredModels }), {
        headers: { 'Content-Type': 'application/json' },
      })
    },
  ),

  http.get<
    { blandId: string; modelId: string },
    getBlandStatisticsResponseType
  >('*/ebay/bland/:blandId/models/:modelId', () => {
    return new HttpResponse(JSON.stringify(blandStatisticsResponse), {
      headers: { 'Content-Type': 'application/json' },
    })
  }),

  // ブランド統計リスト取得
  http.get<{ blandId: string }, getBlandStatisticListResponseType>(
    '*/ebay/bland/:blandId/bland-statistics',
    ({ params }) => {
      const blandId = params.blandId
      const blandStatistics = statisticsData.filter(
        stat => stat.blandId === parseInt(blandId, 10),
      )
      return new HttpResponse(
        JSON.stringify({ statisticList: blandStatistics }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    },
  ),

  // モデル追加
  http.post<{ blandId: string }, { success: boolean }>(
    '*/ebay/bland/:blandId/models',
    () => {
      return new HttpResponse(JSON.stringify({ success: true }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    },
  ),

  // モデル統計追加
  http.post<{ blandId: string }, ebayPostBlandModelStatisticsRequestBody>(
    '*/ebay/bland/:blandId/models/statistics',
    () => {
      return new HttpResponse(
        JSON.stringify({
          blandModelNumber: 1,
          categoryId: '123',
          country: 'US',
          location: 'New York',
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    },
  ),

  http.post('/auth', () => {
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'mySecret=abc-123',
        'X-Custom-Header': 'yes',
      },
    })
  }),
]
