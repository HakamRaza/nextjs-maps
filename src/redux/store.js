import { createStore, applyMiddleware, combineReducers } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import mapEpics from './epics/mapEpic'
import mapReducer from './reducer/mapReducer'


export const rootEpic = combineEpics(
    ...Object.values(mapEpics)
)

const reducer = combineReducers({
    maps: mapReducer
})

export const createAppStore = (initialState) => {
    const epicMiddleware = createEpicMiddleware()
    const store = createStore(reducer, initialState, applyMiddleware(epicMiddleware));

    epicMiddleware.run(rootEpic)

    return store
}