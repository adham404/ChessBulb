<template>
    <div class="AboutInstructorData">
        <img src="@/assets/ProfilePic.jpg" alt="">
        <h2>AboutInstructor:</h2>
        <p>
            {{AboutInstructor}}
        </p>
    </div>
</template>

<script>
import firebase from "firebase"
    export default {
        data:function()
        {
            return{
                AboutInstructor:"The instructor is really great he initiated three tournaments and won three gold medals for three different players and has an amazing crowd of really good players"

            }
        },
    props:['InstructorID'],
    mounted()
    {
            var db = firebase.firestore();
            var Dbref = db.collection("Users").doc(this.InstructorID);
            Dbref.get().then((doc) => {
            if(doc.exists)
            {
                //DONE Assign the returned value to the Data Property (1min)
                this.AboutInstructor = doc.data().AboutInstructor;
            }
            else
            {
                console.log("No Doc in Her");
            }
            }).catch((error)=>{
            console.log("Some sort of an error: "+error);
        })            
        
    }        
    }
</script>

<style scoped>
.AboutInstructorData{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: 'QuickSand',sans-serif;
    color: black;
    font-weight: lighter;
    margin-left: 15px;
}
p{
    margin: 5px;
    font-size: 1.5rem;
}
h2{
    margin: 5px;
    font-size: 1.7rem;
}
img{
    width: 100px;
    height: 100px;
    border-radius: 100px;
}

</style>