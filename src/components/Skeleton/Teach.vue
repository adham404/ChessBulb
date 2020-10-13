<template>
    <div class="Container">
        <div class="InstructorRegistration">
            <h1>Become an Instructor</h1>
            <InstructorProfile/>

        </div>
        <h1>OR</h1>
        <div class="AcademySignUp">
            <h1>Create an Academy</h1>
            <iframe class="airtable-embed" src="https://airtable.com/embed/shrDXEKgKp1o5vj7Q?backgroundColor=gray" frameborder="0" onmousewheel="" width="600px" height="550px" style="background: transparent;"></iframe>
        </div>
    </div>
</template>

<script>
    import InstructorProfile from '@/components/MarawanComponents/InstructorProfile'
    export default {
        created() {
            let ckeditor = document.createElement('script');    
            ckeditor.setAttribute('src',"https://static.airtable.com/js/embed/embed_snippet_v1.js");
            document.head.appendChild(ckeditor);
        },
        components:{
            InstructorProfile
        }
        
    }

</script>


<style scoped>
h1{
    font-family: 'Quicksand', sans-serif;
    font-weight: normal;
    color: white;
}
.Container{
    display: flex;
    align-items: center;
    width: 100%;
}
.InstructorRegistration{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 100%;
}
.AcademySignUp{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 100%;
}

</style>