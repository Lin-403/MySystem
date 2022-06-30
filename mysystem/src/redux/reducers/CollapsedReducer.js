

export const CollapsedReducer=(prevState={
    isCollapsed:false
},action)=>{
    
    switch(action.type){
        case "change-collapsed":{
            var state={...prevState}
            state.isCollapsed=!state.isCollapsed
            return state
        }
        default:{
            return prevState
        }
    }
}