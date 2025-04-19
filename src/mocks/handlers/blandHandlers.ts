import { http, PathParams } from 'msw'
import { blandList } from '../data/blandList'
import { getBlandListResponseType } from '../../api/ebay/type'
import { HttpResponse } from 'msw'

export const brandHandlers = [
  http.get<PathParams, getBlandListResponseType>('*/ebay/bland', () => {
    return new HttpResponse(
      JSON.stringify({
        blandList: blandList.map(bland => ({
          id: bland.id,
          blandName: bland.name,
        })),
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }),

  http.post<{ blandName: string }>('*/ebay/bland', () => {
    return new HttpResponse(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  }),
]
