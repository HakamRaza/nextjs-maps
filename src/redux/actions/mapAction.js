// Action Lists
export const LIST_MAP_SUGGESTION = 'MAP/LIST_SUGGESTION';
export const LIST_MAP_SUGGESTION_SUCCESS = 'MAP/LIST_SUGGESTION_SUCCESS';
export const LIST_MAP_SUGGESTION_FAILED = 'MAP/LIST_SUGGESTION_FAILED';

export const LIST_MAP_DETAIL = 'MAP/LIST_DETAIL';
export const LIST_MAP_DETAIL_SUCCESS = 'MAP/LIST_DETAIL_SUCCESS';
export const LIST_MAP_DETAIL_FAILED = 'MAP/LIST_DETAIL_FAILED';

// Actions Creators
export const loadSuggestions = (search) => ({ type: LIST_MAP_SUGGESTION, payload: { search } })
export const loadSuggestionsSuccess = (payload) => ({ type: LIST_MAP_SUGGESTION_SUCCESS, payload: payload.suggestions })
export const loadSuggestionsFailure = (payload) => ({ type: LIST_MAP_SUGGESTION_FAILED, payload })

export const loadDetails = (id) => ({ type: LIST_MAP_SUGGESTION, payload: { id } })
export const loadDetailsSuccess = (payload) => ({ type: LIST_MAP_SUGGESTION_SUCCESS, payload: payload.features })
export const loadDetailsFailure = (payload) => ({ type: LIST_MAP_SUGGESTION_FAILED, payload })