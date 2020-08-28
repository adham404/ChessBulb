<template>
  <div>//TODO make Component flag to switch between the (AcademiesList Component), the (CheckItOut Component) and the (Purchase Component) passing the Academies data and boolean for userID or not (5 minutes)</div>
</template>

<script>
//TODO importing firebase (3 minutes)
//TODO importing the (AcademiesList Component)(3 minutes)
//TODO importing the (CheckItOut Component)(3 minutes)
//TODO importing the (Purchase Component)(3 minutes)

export default {
  //TODO make the component object (3 minutes)
  //TODO use props to get UserID boolean, if the link in profile card clicked, the UserId will be true, if the link in the navbar clicked then the UserID is false (3 minutes)
  //TODO making the ComponentName variable and set its default to "AcademiesList" (5 minutes)
  //TODO make a boolean variable that linked with the Check it out button when it's clicked and set it to false(3 minutes)
  //TODO make a boolean variable that linked with the Enroll button when it's clicked and set it to false(3 minutes)
  //TODO in "mounted" if user id == false then get  the whole academies object from database and assign it to the "Academies" variable, else get every academy id that contains the user id and then get the Academies object and assign it to the variable (15 minutes)
  //TODO in "mounted" using EventBus.$on the Check it out or enroll clicked and assign the recieving  data to the variables and switch the boolean variables to true, if true change the ComponentName (15 minutes)
};
</script>

//TODO Testing Time (30 minutes)
//TODO Expected Time (95 minutes)