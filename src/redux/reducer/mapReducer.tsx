import {
    LIST_MAP_SUGGESTION,
    LIST_MAP_SUGGESTION_SUCCESS,
    LIST_MAP_DETAIL_SUCCESS,
} from '../actions/mapAction'

type mapReducerType = {
    searchString: Array<string>,
    suggestionList: Array<suggestionResult>,
    suggestionDetail: featureResult
}

type suggestionResult = {
    name: string,
    mapbox_id: string,
    full_address: string,
}

type featureResponse = {
    geometry: {
        // formatted as [longitude,latitude].
        coordinates: Array<number>
    },
    properties: {
        name: string,
        mapbox_id: string,
        full_address: string,
        place_formatted: string,
        coordinates: {
            longitude: number
            latitude: number
        }
    }
}

type featureResult = {
    // formatted as [longitude,latitude].
    coordinate_array: Array<number>
    name: string,
    full_address: string,
    longitude: number
    latitude: number
}

const initialState: mapReducerType = {
    searchString: [],
    suggestionList: [],
    suggestionDetail: {
        name: '',
        full_address: '',
        coordinate_array: [0, 0],
        latitude: 0,
        longitude: 0,
    }
}

const mapReducer = (
    state = initialState,
    action: { type: string, payload: any }
): mapReducerType => {
    switch (action.type) {

        case LIST_MAP_SUGGESTION: {
            const filtered = state.searchString.filter(str => str != action.payload)
            return { ...state, searchString: [...filtered, action.payload] }
        }

        case LIST_MAP_SUGGESTION_SUCCESS: {
            const results: Array<suggestionResult> = []

            for (const suggestion of action.payload) {

                results.push({
                    name: suggestion.name,
                    mapbox_id: suggestion.mapbox_id,
                    full_address: suggestion.full_address,
                })
            }
            return { ...state, suggestionList: results }
        }

        case LIST_MAP_DETAIL_SUCCESS: {
            const features: Array<featureResponse> = action.payload;

            if (features.length > 1) {
                return {
                    ...state,
                    suggestionDetail: {
                        name: features[0].properties.name,
                        full_address: features[0].properties.full_address,
                        coordinate_array: features[0].geometry.coordinates,
                        latitude: features[0].properties.coordinates.latitude,
                        longitude: features[0].properties.coordinates.longitude,
                    }
                }
            }

            return state;
        }
    }
    return state
}

export default mapReducer;