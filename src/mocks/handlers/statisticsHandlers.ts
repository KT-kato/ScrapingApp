import { http } from 'msw'
import { statisticsData } from '../data/statistics'
import { HttpResponse } from 'msw'

export const statisticsHandlers = [
  http.get<{ blandId: string }>('/api/statistics', ({ params }) => {
    const blandId = params.blandId
    const filteredStatistics = statisticsData.filter(
      stat => stat.blandId === parseInt(blandId, 10),
    )
    return new HttpResponse(
      JSON.stringify({ statistics: filteredStatistics }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }),
]
