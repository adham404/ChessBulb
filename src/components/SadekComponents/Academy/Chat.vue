<template>
  <div>
    //TODO make chat room heading (2 minutes)
    //TODO paragraph tag for "No Messages Yet" v-if "Messages.length == 0" (5 minutes)
    //TODO loop through the Messages array using "v-chat-scroll = {always:false, smooth:true}" library (3 minutes)
    //TODO img tag for the message.userPhoto (2 minutes)
    //TODO paragraph tag for message.userName (2 minutes)
    //TODO paragraph tag for message.message (2 minutes)
    //TODO paragraph tag for message.TimeStamp (2 minutes)
    //TODO use the (CreateMessage Component) passing userId (2 minutes)
  </div>
</template>

<script>
//TODO importing firestore (2 minutes)
//TODO importing moment lib (2 minutes)
//TODO importing  the (CreateMessage Component) (2 minutes)
export default {
  //TODO get userID (2 minutes)
  //TODO make component object (2 minutes)
  //TODO make an array for Messages:[] (2 minutes)
  //TODO in "Created"  1. Obtain reference to use messages collection and order by ("timeStamp") (5 minutes)
  //TODO 2. use the reference on snapshot foreach change (5 minutes)
  //TODO 3. if the change was add declare the document
  //TODO4. then push to the Messages array {UserName:***, UserPhoto:***, Message:***, TimeStamp: use moment library to set the format to "LTS" } (10 minutes)
};
</script>

<style scoped>
/*TODO use the css ids from tettra (2 minutes) */
</style>
//TODO Testing Time (1 day)
//TODO Expected Time (1 day + 65 minutes)