<template>
    <div>
        <ChessBoardDisplay id="1" :fen='boardfen'></ChessBoardDisplay>
        <button @click="move1" >move 1 </button>
        <button @click="move2" >move 1 </button>
        <StockFish></StockFish>
        
    </div>
</template>

<script>
import ChessBoardDisplay from '@/components/MarawanComponents/ChessBoard/ChessBoardDisplay.vue'
import StockFish from '@/components/MarawanComponents/StockFish.vue'
//TODO make a story div(5min)
//TODO add it in v for(3min)
//TODO get following users id array(5min)
//TODO get storys ids and put it to an array(5min) 
//TODO load user profile photo for each story(5min)
//TODO add route to add story (3min)
//TODO add route to each story (3min)
//TODO route storys cards to display story window(3min)
export default {
    data(){
        return{
            boardfen : null,
            boardfen2 : null,
        }
    },
    components:{
        ChessBoardDisplay,
        StockFish,
    },
    methods:{
        move1(){
            this.boardfen = 'rnbqkb1r/ppppppnp/6p1/8/8/4P3/PPPPQPPP/RNB1KBNR b KQkq - 0 1'

        },
        move2(){
            this.boardfen = 'rnbqkb1r/1pppppnp/6p1/p7/8/4PQ1P/PPPP1PP1/RNB1KBNR w KQkq - 0 1'

        },
        move12(){
            this.boardfen2 = 'rnbqkb1r/1pppp1pp/5n2/p4p2/2P4P/2N5/PP1PPPP1/R1BQKBNR b KQkq - 0 1'

        },
        move22(){
            this.boardfen2 = '8/8/3qK3/8/3Qk3/8/7P/8 w - - 0 1'

        }
    }

}
</script>


<style>

</style>