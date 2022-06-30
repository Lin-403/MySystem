

export const CollapsedReducer=(prevState={
    isCollapsed:false
},action)=>{
    var state={...prevState}
    switch(action.type){
        case "change-collapsed":{
            state.isCollapsed=!state.isCollapsed
            return state
        }
        default:{
            return state
        }
    }
}