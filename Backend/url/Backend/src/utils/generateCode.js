const generateCode = ()=>{

    const mainString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let str = ""

    for(let i = 0; i<6 ; i++){
        str += mainString.charAt(Math.floor(Math.random() * mainString.length))
    }
    return str
}

export default generateCode