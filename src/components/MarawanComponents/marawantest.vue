<template>
  <div>
      <h1>Welcome to Marwan Testing Page</h1>
      <p> if your name is Shemy please leave the page </p>
      <ChessBoardDisplay id="1" />
      <PgnReviewOutput :pgn='pgnv'  />
  </div>
</template>

<script>
import ChessBoardDisplay from '@/components/MarawanComponents/ChessBoard/ChessBoardDisplay.vue'
import PgnReviewOutput from '@/components/MarawanComponents/PgnReview/PgnReviewOutput.vue'

export default {
    components:{
        ChessBoardDisplay,
        PgnReviewOutput
        
    },
    mounted(){
       
    },
    methods:{
        
    },
    data(){
        return{
            pgnv :  `[Event "Budapest m"]
[Site "Budapest"]
[Date "1895.11.25"]
[Round "7"]
[White "Maroczy, Geza"]
[Black "Charousek, Rudolf Rezso"]
[Result "1/2-1/2"]
[WhiteElo ""]
[BlackElo ""]
[ECO "A26"]

1.c4 {king's pawn opening} e5 2.Nc3 {comment1} Nf6 3.g3 g6 {comment2} 4.Bg2 Bg7 5.d3 d6 6.Nf3 Nc6 7.O-O O-O 8.Bd2 Ne7
9.b4 c6 10.h3 Ne8 11.Rb1 f5 12.Qc1 d5 13.cxd5 Nxd5 14.b5 Bd7 15.Nxd5 cxd5
16.Qc5 Qb6 17.Bb4 e4 18.dxe4 dxe4 19.Ng5 Qxc5 20.Bxc5 h6 21.Rfd1 Nf6 22.Be7 hxg5
23.Bxf6 Be6 24.Bxg7 Kxg7 25.a4 Rfc8 26.Rb4 Rc2 27.e3 Rac8 28.Rbd4 Ra2 29.R1d2 Rxd2
30.Rxd2 Rc4 31.a5 Rc1+ 32.Kh2 Ra1 33.Rc2 Rxa5 34.Rc7+ Kf6 35.Rxb7 Bc4 36.b6 a6
37.Rc7 Bd3 38.b7 Rb5 39.Rc6+ Kg7 40.Rxa6 Rxb7 41.Ra1 Rb2 42.Kg1   1/2-1/2`

        }
    }

}
</script>

<style>
div{
    color: white;
}

</style>