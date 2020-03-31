import { EDIT_CONTENT, INIT_FROM_SAVED } from '../constants/action-types'

export const initFromSaved = (value) => {
    return {
        type: INIT_FROM_SAVED,
        value: value
    }
}

export const editContent = (elementId, value) => {
    return {
        type: EDIT_CONTENT,
        element: elementId,
        content: value
    }
}
