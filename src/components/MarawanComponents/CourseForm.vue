<template>
<div style="width :100%" >
<div class="Containerim">
  <div style="display: flex; flex-direction: column; width: 50%" class="Form">
      
          <label for="Course Name">Course Name</label>
          <input :class="errors.name" type="text" name="Course Name" id="CourseName"  v-model="course.name">
      
      
        <label for="Difficulty">Difficulty</label>
        <select  :class="errors.difficulty" name="Difficulty" id="Difficulty" v-model="course.difficulty">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
        </select>
      
      
        <label for="Price">Price</label>
        <input :class="errors.price" type="number" name="Price" id="Price"  v-model="course.price">
      

      
        <label for="Privileges">Privileges</label>
        <input type="text" :class="errors.privileges" name="Privileges" id="Privileges"  v-model="course.privileges">
      

      <button @click="validate">Submit</button>
  </div>
</div>
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
            var go = 0 ;
            console.log(this.course)
            this.errors.name = (this.course.name.length >= 5 ) ? 'ok' :  'error' ; 
            this.errors.difficulty = (this.course.difficulty ) ? 'ok' :  'error' ; 
            this.errors.price = (this.course.price > 0 ) ? 'ok' :  'error' ; 
            this.errors.privileges = (this.course.privileges.length >= 5 ) ? 'ok' :  'error' ; 
            console.log(this.errors)
            for(var i in this.errors){
                if(this.errors[i]== 'ok' ){
                    go += 1 
                }

            }
            if(go == 4 ){
                this.submit()
            }
            
        },
        submit(){
            console.log(this.course)
            EventBus.$emit('CourseForm',this.course)
            
            
        }
    }

}
</script>

<style scoped>
.Shadow {
  -webkit-box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
}
.Containerim {
  width: 530px;
  height: 550px;
  background-color: white;
  margin: auto;
  border-radius: 5px;
  margin-top: 20px;
}
.SignUpHeader {
  height: 25%;
  width: 96%;
  margin: auto;
  border-radius: 5px;
  background-color: #022a68;
  padding-left: 5px;
  font-family: "Quicksand", sans-serif;
  font-weight: lighter;
}
h1 {
  font-family: "Quicksand", sans-serif;
  font-weight: lighter;
  margin: 10px 0px 5px 0px;
  font-size: 3rem;
}
#SubHeader {
  margin: 1px 0px 5px 0px;
}
.Form {
  margin: auto;
  color: black;
  margin-top: 50px;
}
input {
  margin: 1px 0px 20px 0px;
  font-family: "Raleway", sans-serif;
  font-weight: lighter;
  border: 1px solid #cac7c7;
  border-radius: 6px;
  height: 22px;
}
label {
  font-family: "Raleway", sans-serif;
  font-weight: lighter;
}
button {
  height: 35px;
  width: 150px;
  border: none;
  outline: none;
  border-radius: 1.2rem;
  font-size: 0.9rem;
  font-family: "Raleway", sans-serif;
  background-color: #022a68;
  color: white;
  margin: auto;
}
button:hover {
  -webkit-box-shadow: 0px 0px 21px -10px rgb(3, 80, 143);
  -moz-box-shadow: 0px 0px 21px -10px rgb(3, 80, 143);
  box-shadow: 0px 0px 21px -10px rgb(3, 80, 143);
  background-color: #044bb6;
}
a {
  text-decoration: none;
  color: white;
}
a:hover {
  color: #044bb6;
}
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