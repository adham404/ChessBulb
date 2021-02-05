import Chess from "chess.js"

async function Parsepgn(Pgn){
    const engine = await new Chess()
    await engine.load_pgn(Pgn,{ sloppy: true})
    return await engine.history()
}
async function  GetStartPos(pgn){
    const engine = await new Chess()
    const engine2 = await new Chess()
    await engine.load_pgn(pgn,{ sloppy: true})
    await engine2.load_pgn(pgn,{ sloppy: true})
    for(let index = 0 ; index < engine2.history().length ; index++ ){
        await engine.undo()
    }
    //console.log("fen from sm b d",engine.fen())
    return engine.fen()
}

export default async  function(Pgn){
    var widget = {}
    const engine = await new Chess(await GetStartPos(Pgn))
    var CurrentMove = -1
    const Moves = await Parsepgn(Pgn)
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