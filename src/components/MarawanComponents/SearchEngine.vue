<template>
  <div>
      <input type="text"  placeholder="Search" v-model="qurey" >
   <input type="submit" value="search" @click="search">
  </div>
</template>

<script>
// import firebase from 'firebase'
//firebase functions:config:set algolia.app=6QLSJPKZLF algolia.key=73c12cce64ff2c58497bac33bc843859
import algoliasearch from 'algoliasearch/lite';
var  index ;
export default {
    async mounted(){
        const client = await algoliasearch('6QLSJPKZLF', '3cd07d257f7f35161891483bda18ed92');
        index = await client.initIndex('Courses');
        
    },
    data(){
        return{
            qurey : null
        }
    },
    methods:{
        async search(){
            var val =  await index.search(this.qurey,{
                restrictSearchableAttributes: ['privileges'],
                // filters: 'CourseName:new course 1 '
            })
            var res = []
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