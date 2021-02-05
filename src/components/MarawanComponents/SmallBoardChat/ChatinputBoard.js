import Chess from "chess.js" ;
export default async function  boardLogic(StartFen){
    var widget = {} ; 
    var FullGameEngine =await  new Chess(StartFen || '');
    var ControlingEngine = await new Chess(StartFen || '');
    var CurrentMove = -1;
    var FullGameEngineMoves = await FullGameEngine.history();
    // var ControlingEngineMoves = ControlingEngine.history();

    widget.PlayMove= async function(NewMove){
        if(CurrentMove == FullGameEngine.history().length-1){
            await FullGameEngine.move(NewMove);
            await ControlingEngine.move(NewMove);
        }else if(CurrentMove < FullGameEngine.history().length-1){
            await ControlingEngine.move(NewMove);
             FullGameEngine =await new Chess();
            await FullGameEngine.load_pgn(ControlingEngine.pgn());
        }
        CurrentMove++;
        
    }

    widget.Undo = async function(){
        if(CurrentMove> -1){
            await ControlingEngine.undo()
            await CurrentMove--
             //console.log("undo",CurrentMove)
        }
        
        
    }
    
    widget.Redo = async function(){
        if(CurrentMove < FullGameEngine.history().length -1){
            await CurrentMove++
            FullGameEngineMoves = await FullGameEngine.history();
            await ControlingEngine.move(FullGameEngineMoves[CurrentMove])
            //console.log("redo",CurrentMove,mmm)
        }
        
    }
    widget.ThePgn = function(){
        return FullGameEngine.pgn()
    }
    widget.TheFen = function(){
        return ControlingEngine.fen()
    }

    return widget 
}