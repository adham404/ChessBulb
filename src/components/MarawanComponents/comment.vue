<template>
  <div class="ml-2" >
    <v-row >
      <v-col  cols="1" >
        <v-avatar>
          <img
          :src="Data.doc_data.Photo ? Data.doc_data.Photo : '/img/icons/pexels-pixabay-220453.jpg'"
          alt=""
          style="object-fit: cover" 
          />
        </v-avatar>
      </v-col>
      <v-col  cols="10" class="mb-6"  >
        <v-row class="text-subtitle-1 ml-5 mt-2 font-weight-regular" > {{Data.doc_data.user_name}}</v-row>
        <v-row class="ml-4 mt-4 ">
          <v-sheet color="grey lighten-3 " class="text-subtitle-2 font-weight-regular pa-3 rounded-xl" >
            {{Data.doc_data.comment}}
          </v-sheet>
          
        </v-row>
        <v-row class="mt-3 ml-4 " >
          <v-col cols="2" class="ma-0 pa-0">
            <v-btn
              
              class="text-subtitle-2 text-capitalize"
              rounded
              text
              @click="Reply(Data)"
              >
              Reply
            </v-btn>
          </v-col>
          <v-col class="ma-0 pa-0">
            <v-btn
              v-if="SeeReplies"
              class="text-subtitle-2 text-capitalize"
              rounded
              text
              @click="SendRepiles(Data)"
              >
              See Replies
            </v-btn>
          </v-col>
       
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      
    </v-row>
        </div>
</template>

<script>
import {EventBus} from "@/main.js"
export default {
  props:["Data"],
  watch:{
    Data:function(){
      console.log("Comment Updatet",this.Data)
    }
  },
  data(){
        return{
            SeeReplies: false
        }
    },
    methods:{
      SendRepiles(data){
        EventBus.$emit("ShowReplies",data)
      },
      Reply(data){
        EventBus.$emit("ReplyToComment",data)
      }
    },
    mounted(){
      setTimeout(()=>{
        if(this.Data["Comments"]){
          this.SeeReplies = true
        }else{
         // console.log(this.Data)
        }
        
      },1000)
    }

}
</script>

<style>

</style>