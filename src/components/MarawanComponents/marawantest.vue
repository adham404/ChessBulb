<template>
  <div>
   <router-link to="/Purchase/price_1HVqJXC7X3YpNau36qSerzer" >CheckOut</router-link><br/>
   <router-link to="/Subscribe/price_1HWe12C7X3YpNau3GI4EWGwI" >Subscribe</router-link><br/>
   <router-link to="/InstructorRegistration" >Instructor Registration</router-link><br/>
   <router-link to="/profile/1/Courses" >My Courses</router-link><br/>
   <router-link to="/AcademyForm" >Academy Form</router-link><br/>
   <StoryHeader></StoryHeader>
   <router-view></router-view>
  </div>
</template>

<script>

import StoryHeader from "@/components/MarawanComponents/StoryScrolling/StoryDisplayheader"
export default {
  components:{
    StoryHeader
  },
  data(){
    return{
      filters: true
    }
  },
  methods:{
    
  }
  
    
  
  
};
</script>

<style>
div {
  color: white;
}
</style>
