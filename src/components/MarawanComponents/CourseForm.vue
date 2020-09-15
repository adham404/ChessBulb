<template>
  <div>
      <div>
          <label for="Course Name">Course Name</label>
          <input type="text" name="Course Name" id="CourseName"  v-model="course.name">
      </div>
      <div>
        <label for="Difficulty">Difficulty</label>
        <select name="Difficulty" id="Difficulty" v-model="course.difficulty">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label for="Price">Price</label>
        <input type="number" name="Price" id="Price"  v-model="course.price">
      </div>

      <div>
        <label for="Privileges">Privileges</label>
        <input type="text" name="Privileges" id="Privileges"  v-model="course.privileges">
      </div>

      <button @click="submit">Submit</button>
  </div>
</template>

<script>
import {EventBus} from '@/main.js'
export default {
    data(){
        return{
            course:{
                name : null,
                difficulty : null,
                price : null ,
                privileges :null
            }
        }
    },methods:{
        submit(){
            console.log(this.course)
            EventBus.$emit('CourseForm',this.course)
        }
    }

}
</script>

<style>

</style>
//TODO create html inputs(10min)
//TODO create data object(10min)
//TODO connent data object to UI(10min)
//TODO check if data will be sent to academy or courses(2min)
//TODO get course /academy id(5min)
//TODO sent data to firbase firestore(3min)
//FIXME thier is no XD