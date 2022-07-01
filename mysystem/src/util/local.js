const getLocal=(key,emptyValue)=>{
    const item=localStorage.getItem(key)
    if(item){
        try{
            const data=JSON.parse(item)
            return data
        }
        catch(e){
            return item 
        }
    }
    return emptyValue?emptyValue:null;
}


const saveLocal=(key,value)=>{
    localStorage.setItem(key,JSON.stringify(value))
}

export {saveLocal,getLocal}