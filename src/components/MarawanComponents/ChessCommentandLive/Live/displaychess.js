import Chess from "chess.js"

function Parsepgn(Pgn){
    const engine = new Chess()
    engine.load_pgn(Pgn)
    return engine.history()
}
function GetStartPos(pgn){
    const engine = new Chess()
    const engine2 = new Chess()
    engine.load_pgn(pgn)
    engine2.load_pgn(pgn)
    for(let index = 0 ; index < engine2.history().length ; index++ ){
        engine.undo()
    }
    
    return engine.fen()
}

export default  function(Pgn){
    var widget = {}
    const engine = new Chess(GetStartPos(Pgn))
    var CurrentMove = -1
    const Moves = Parsepgn(Pgn)
    widget.NextMove = function(){
        if(CurrentMove < Moves.length-1 ){
            CurrentMove++
            engine.move(Moves[CurrentMove])
            
        }
    }
    widget.PreviousMove = function(){
        if(CurrentMove > -1 ){
            CurrentMove--
            engine.undo()
        }
    }
    widget.getFEN = function(){
        return engine.fen()
    }
    return widget
}