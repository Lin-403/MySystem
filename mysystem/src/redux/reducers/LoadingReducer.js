

export const LoadingReducer=(prevState={
    isLoading:false
},action)=>{
    var state={...prevState}
    switch(action.type){
        case "change-loading":{
            state.isLoading=action.payload
            return state
        }
        default:{
            return state
        }
    }
}