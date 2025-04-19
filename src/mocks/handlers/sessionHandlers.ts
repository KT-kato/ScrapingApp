import { http, HttpResponse } from 'msw'

export const sessionHandlers = [
  // Handles a POST /session request
  http.post('*/session/login', () => {
    return HttpResponse.json({
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      session: 'mockSession',
    })
  }),
]
