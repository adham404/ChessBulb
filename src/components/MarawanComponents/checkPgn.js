import Chess from "chess.js"

function RemoveHeaders(pgn){
    const engine = new Chess();
    engine.load_pgn(pgn)
    var headers = engine.header()
    //console.log('headers',Object.keys(headers).length )
    if(Object.keys(headers).length >0){
    var headersSize = headers.toString().split(",").length
    //console.log("headersSize",headersSize)
    var pgnList = engine.pgn().split("\n")
    // console.log(headersSize)
    return pgnList.slice(headersSize+1).join("\n")
    }else{
        return  engine.pgn()
    }
    
}

export default function(text){
    const engine = new Chess();
    var widget = {}
    try{
        var res = engine.load_pgn(text,{ sloppy: true})
    }catch{
        res = false
    }
    
    if(res){
        widget.IsPgn = true
         console.log('pgn is detected!!')
        widget.Text = RemoveHeaders(text)
    }else{
        console.log("no pgn")
        widget.IsPgn = false
        widget.Text = text
    }
    return widget
    
} 