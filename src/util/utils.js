export function storeLocal(name,item){
    localStorage.setItem(name,JSON.stringify({item}))
}

export function getFromLocal(name){
    let item = JSON.parse(localStorage.getItem(name));
    if(!item){
        return null
    }
    
    return item.item;
}