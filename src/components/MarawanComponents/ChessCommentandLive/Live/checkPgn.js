import Chess from "chess.js"

function RemoveHeaders(pgn){
    const engine = new Chess();
    engine.load_pgn(pgn)
    var headers = engine.header()
    var headersSize = headers.toString().split(",").length
    var pgnList = engine.pgn().split("\n")
    // console.log(headersSize)
    return pgnList.slice(headersSize+1).join("\n")
}

export default function(text){
    const engine = new Chess();
    var res = engine.load_pgn(text,{ sloppy: true})
    if(res){
        // console.log('pgn is detected!!')
        return RemoveHeaders(text)
    }else{
        return text
    }
} 