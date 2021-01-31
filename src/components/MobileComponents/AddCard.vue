<template>
    <div>
        <v-divider class = "grey darken-1"></v-divider>
        <v-sheet rounded="false">
        <v-container>
            <v-row justify="center" align-self ="center" >
                <v-col cols="2" align-self="center" class="py-3">
                    <v-avatar size="50" class = "mb-1">
                    <img :src="GetProfilePicUrl ? GetProfilePicUrl : '/img/icons/pexels-pixabay-220453.jpg' " style="object-fit: cover">
                    </v-avatar>
                </v-col>
                <v-col cols="8" class="mt-2">
                    <v-btn rounded text class="text-capitalize font-weight-normal text-subtitle-2" outlined @click= "()=>$router.push('/AddPost')">
                        Post your latest chess encounter!
                    </v-btn>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class = "mt-1" justify="space-around">
                <v-col cols="4">
                    <v-btn class="text-capitalize text-subtitle-2" text @click= "()=>$router.push('/AddPost')">
                        <v-icon left color="primary">
                            fa-chess-board
                        </v-icon>
                        <span>Chess game</span>
                    </v-btn>
                </v-col>
                <v-divider vertical inset class="mb-1" cols = "4"></v-divider>
                <v-col cols="4">
                    <v-btn class="text-capitalize text-subtitle-2" text @click= "() => {$router.push('/AddSnapshot')}">
                        <v-icon left color="primary">fa-chess-rook</v-icon>
                        <span>Snapshot</span>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        </v-sheet>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
    export default {
        computed:{
            ...mapGetters(["GetProfilePicUrl"])
        }
    }
</script>

<style scoped>

</style>