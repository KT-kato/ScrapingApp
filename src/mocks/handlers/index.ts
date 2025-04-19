import { brandHandlers } from './blandHandlers'
import { modelHandlers } from './modelHandlers'
import { sessionHandlers } from './sessionHandlers'
import { statisticsHandlers } from './statisticsHandlers'

export const handlers = [
  ...brandHandlers,
  ...modelHandlers,
  ...statisticsHandlers,
  ...sessionHandlers,
]
