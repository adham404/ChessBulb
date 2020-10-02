<template>
  <div>
      <input type="text"  placeholder="Search" v-model="qurey" >
   <input type="submit" value="search" @click="search">
   <div v-if="ShowFilters" >
    <input type="checkbox" v-model="checkedFilters" value="Difficulty:Beginner" id="Beginner">
    <label for="Beginner">Beginner</label>
    <input type="checkbox" v-model="checkedFilters" value="Difficulty:Intermediate" id="Intermediate">
    <label for="Intermediate">Intermediate</label>
    <input type="checkbox" v-model="checkedFilters" value="Difficulty:Advanced" id="Advanced">
    <label for="Advanced">Advanced</label>
   </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
//firebase functions:config:set algolia.app=6QLSJPKZLF algolia.key=73c12cce64ff2c58497bac33bc843859
import algoliasearch from 'algoliasearch/lite';
import {EventBus} from '@/main.js'
var  index ;
export default {
    props:[
        'ShowFilters',
        'SearchIndex'
        ],
    async mounted(){
        const client = await algoliasearch('6QLSJPKZLF', '3cd07d257f7f35161891483bda18ed92');
        if(this.SearchIndex){
            index = await client.initIndex(this.SearchIndex);
        }
        EventBus.$on('SearchIndex',ind =>{
            index =  client.initIndex(ind);
        })
    },
    data(){
        return{
            checkedFilters:[],
            qurey : ''
        }
    },
    methods:{
        async search(){
            var options = '';
            this.checkedFilters.forEach((i,index) =>{
                options += (index==this.checkedFilters.length-1) ?  i :  i +' OR '
            })
            // console.log(options)
            var val =  await index.search(this.qurey,{
                filters: options
            })
            var res = []
            // console.log(val)
            await val.hits.forEach(doc=>{res.push(doc.objectID)})
            await console.log(res)
            
        }
    }
}
</script>

<style>

</style>
//TODO create search filde (3min)
//TODO create search bottoms(5min)
//TODO add funcation for querying  (5min)
//TODO get the name of the colection to scearch in(5min)
//TODO get the querying data (5min)
//TODO search the data from the input(4min)
//TODO return the searched data (4min)
//FIXME how to use Algolia (30min)