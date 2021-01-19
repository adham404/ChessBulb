import Chess from "chess.js" ;
export default function boardLogic(StartFen){
    var widget = {} ; 
    var FullGameEngine = new Chess(StartFen || '');
    var ControlingEngine = new Chess(StartFen || '');
    var CurrentMove = -1;
    var FullGameEngineMoves = FullGameEngine.history();
    // var ControlingEngineMoves = ControlingEngine.history();

    widget.PlayMove= function(NewMove){
        if(CurrentMove == FullGameEngine.history().length-1){
            FullGameEngine.move(NewMove);
            ControlingEngine.move(NewMove);
        }else if(CurrentMove < FullGameEngine.history().length-1){
            ControlingEngine.move(NewMove);
            FullGameEngine = new Chess();
            FullGameEngine.load_pgn(ControlingEngine.pgn());
        }
        CurrentMove++;
        
    }

    widget.Undo = function(){
        if(CurrentMove> -1){
            ControlingEngine.undo()
            CurrentMove--
            // console.log("undo",CurrentMove)
        }
        
        
    }
    
    widget.Redo = function(){
        if(CurrentMove < FullGameEngine.history().length -1){
            CurrentMove++
            FullGameEngineMoves = FullGameEngine.history();
            ControlingEngine.move(FullGameEngineMoves[CurrentMove])
            // console.log("redo",CurrentMove)
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