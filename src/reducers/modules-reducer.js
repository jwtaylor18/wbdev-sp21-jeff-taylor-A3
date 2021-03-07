const initialState = {
    modules: [
        // {_id: 123, title: "Module 123"},
        // {_id: 456, title: "Module 456"},
        // {_id: 789, title: "Module 789"}
    ]
}

const moduleReducer = (state=initialState, action) => {
    switch (action.type) {

        case "FIND_MODULES_FOR_COURSE":
            return {
                ...state,
                modules: action.modules
            }

        case "CREATE_MODULE":
            const newState = {
                modules: [
                    ...state.modules,
                    action.module
                ]
            }
            return newState
        case "DELETE_MODULE":
            const newState1 = {
                modules: state.modules.filter(module => {
                    if(module._id === action.moduleToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1

        case "UPDATE_MODULE":
            return {
                modules: state.modules.map(m => {
                    if(m._id === action.module._id) {
                        return action.module
                    } else {
                        return m
                    }
                })
            }
        default:
            return state
    }
}

export default moduleReducer