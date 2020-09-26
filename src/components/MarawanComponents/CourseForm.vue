<template>
  <div>
      <div>
          <label for="Course Name">Course Name</label>
          <input :class="errors.name" type="text" name="Course Name" id="CourseName"  v-model="course.name">
      </div>
      <div>
        <label for="Difficulty">Difficulty</label>
        <select  :class="errors.difficulty" name="Difficulty" id="Difficulty" v-model="course.difficulty">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label for="Price">Price</label>
        <input :class="errors.price" type="number" name="Price" id="Price"  v-model="course.price">
      </div>

      <div>
        <label for="Privileges">Privileges</label>
        <input type="text" :class="errors.privileges" name="Privileges" id="Privileges"  v-model="course.privileges">
      </div>

      <button @click="validate">Submit</button>
  </div>
</template>

<script>
import {EventBus} from '@/main.js'
export default {
    data(){
        return{
            course:{
                name : '',
                difficulty : null,
                price : 0 ,
                privileges :''
            },
            errors : {
                name : 'ok',
                difficulty : 'ok',
                price : 'ok' ,
                privileges :'ok'
            },
        }
    },methods:{
         validate(){
            console.log(this.course)
            this.errors.name = (this.course.name.length >= 5 ) ? 'ok' :  'error' ; 
            this.errors.difficulty = (this.course.difficulty ) ? 'ok' :  'error' ; 
            this.errors.price = (this.course.price > 0 ) ? 'ok' :  'error' ; 
            this.errors.privileges = (this.course.privileges.length >= 5 ) ? 'ok' :  'error' ; 
            console.log(this.errors)
            for(var i in this.errors){
                if(this.errors[i]== 'ok' ){
                    this.submit()
                }
            }
            
        },
        submit(){
            console.log(this.course)
            EventBus.$emit('CourseForm',this.course)
            
            
        }
    }

}
</script>

<style>
.error{
    border: red 2px solid;
}
.ok {
    border: white ;
}

</style>
//TODO create html inputs(10min)
//TODO create data object(10min)
//TODO connent data object to UI(10min)
//TODO check if data will be sent to academy or courses(2min)
//TODO get course /academy id(5min)
//TODO sent data to firbase firestore(3min)
//FIXME thier is no XD