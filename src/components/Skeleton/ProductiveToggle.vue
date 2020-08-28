<template>
    <div>
            <button v-on:click = "toggle">toggle productive test but when merge</button>
    </div>
</template>

<script>
import { EventBus } from "@/main";
    export default {
        data(){
            return{
                productive: false
            }
            
        },
        methods:{
            toggle(){
                this.productive = !this.productive
                EventBus.$emit("Toggle", this.productive)
            }
        }
        
    }
</script>

<style scoped>

</style>