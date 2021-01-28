<template>
  <div>
      <button @click="CreateDummyEnroll(id)">Create Dummy Enroll Doc for this Academy</button>
      <hr>
      <div>My Academy Dasboard: </div>
      <div>Academy Name: {{getMyAcademyStat().AcademyData.AcademyName}}</div>
      <div>About the Academy: {{getMyAcademyStat().AcademyData.About}}</div>
      <div>About the Owner: {{getMyAcademyStat().AcademyData.AboutOwner}}</div>
      <div>Price: {{getMyAcademyStat().AcademyData.Price}}</div>
      <div>--------------------Stats-----------------</div>
      <div>Number of courses: {{getMyAcademyStat().NumberOfCourses}}</div>
      <div>Number of LiveSessions: {{getMyAcademyStat().NumberOfLiveSessions}}</div>
      <div>Number of Active Subscribers: {{getMyAcademyStat().NumberOfSubscription}}</div>
      <div>Total Monthly Income: <span style="color:green">{{getMyAcademyStat().TotalMonthlyIncome}}</span></div>
      <div>-------------Data About Enrollments------------</div>
      <div v-for="(Enroll,y) in getMyAcademyStat().Enrollments" :key="y" >
          <div>Date Of Enrollment: {{Enroll.Date}}</div>
          <div>Payment: <span style="color:green">{{Enroll.Payment}}</span></div>
          <hr> 
      </div>
      <div>-----------Data About Subscribers--------------</div>
      <div v-for="(Student,x) in getMyAcademyStat().Subscribers" :key="x">
          <div>Student Name: {{Student.FirstName}} {{Student.LastName}}</div>
          <div>Student Email: {{Student.Email}}</div>
          <hr>
      </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
    data()
    {
        return{
            id:"",
            // AcademyData: ""
        }
    },
    async mounted()
    {
        this.id = await this.$route.query.id;
        await this.FetchAcademyStats(this.id);
        console.log(this.getMyAcademyStat());
    },
    methods:
    {
        ...mapGetters(['getMyAcademyStat']),
        ...mapActions(['CreateDummyEnroll','FetchAcademyStats'])
    }
}
</script>

<style>
div {
    color: white;
}
</style>