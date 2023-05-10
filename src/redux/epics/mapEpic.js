import { filter, switchMap, map, catchError } from 'rxjs/operators'
import { from, of } from 'rxjs'
import {
    LIST_MAP_SUGGESTION,
    LIST_MAP_DETAIL,
    loadSuggestionsSuccess,
    loadSuggestionsFailure,
    loadDetailsSuccess,
    loadDetailsFailure
} from '../actions/mapAction'
import axios from 'axios'

const MAPBOX_BASE_URL = 'https://api.mapbox.com'
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
const MAPBOX_UUID4 = process.env.NEXT_PUBLIC_UUID4;


const mapEpics = {
    search: (action$) => action$
        .pipe(filter((action) => action.type === LIST_MAP_SUGGESTION))
        .pipe(switchMap(({ payload: { search } }) =>
            from(axios.get(`${MAPBOX_BASE_URL}/search/searchbox/v1/suggest`, {
                params: {
                    q: search,
                    access_token: MAPBOX_ACCESS_TOKEN ?? '',
                    session_token: MAPBOX_UUID4 ?? '',
                    limit: '5',
                    language: 'en'
                }
            }))
                .pipe(map(response => response.data))
        ))
        .pipe(map(loadSuggestionsSuccess))
        .pipe(catchError(() => of(loadSuggestionsFailure))),

    detail: (action$) => action$
        .pipe(filter((action) => action.type === LIST_MAP_DETAIL))
        .pipe(switchMap(({ payload: { id } }) =>
            from(axios.get(`${MAPBOX_BASE_URL}search/searchbox/v1/retrieve/${id}`, {
                params: {
                    access_token: MAPBOX_ACCESS_TOKEN ?? '',
                    session_token: MAPBOX_UUID4 ?? '',
                }
            }))
                .pipe(map(response => response.data))
        ))
        .pipe(map(loadDetailsSuccess))
        .pipe(catchError(() => of(loadDetailsFailure)))
}

export default mapEpics;