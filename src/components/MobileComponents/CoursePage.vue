<template>
    <div>
        <CourseCard/>
        <v-sheet class="px-2 mb-3">
            <span class="text-h6">Course description</span>
            <br>
            <span class="text-subtitle-2 font-weight-normal">
                The course will talk about the scillian najdorf opening and how to use it in battles of the galaxy
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, id? Ducimus veritatis aliquid quasi eos aut nobis sapiente nostrum nulla perferendis animi exercitationem illo, perspiciatis blanditiis dolorem architecto itaque nihil.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius ratione eum cupiditate velit similique. Dignissimos obcaecati voluptates sequi! Sed excepturi modi pariatur laboriosam laborum maiores inventore quasi sint. Vel, officiis.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi error dicta nostrum? Labore eligendi maiores, hic ullam asperiores natus ad ratione accusamus ut commodi, distinctio eveniet minima libero neque iusto!
            </span>
            <v-btn xs class="text-capitalize primary" height="25" @click="() => {$router.push('/CourseStreaming')}">Open</v-btn>
        </v-sheet>
        <span class="text-h6" style="color: white">Reviews and Ratings</span>
        <v-divider size= "5" color = "white">

        </v-divider>
        <v-sheet class="mb-8 mt-5">
            <v-row>
                <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="9" >
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    readonly
                    value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, quos amet velit quis fuga veniam ipsam nesciunt error ut incidunt illo! Reprehenderit, sapiente sequi optio eos deleniti culpa voluptatum earum.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus eos non voluptates! Consequuntur expedita consequatur, iure asperiores veniam ex maxime amet! Unde, ducimus rem. Aperiam aliquam asperiores tenetur similique pariatur.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, enim praesentium aliquam nemo, eaque explicabo illum, doloremque ab cupiditate incidunt quidem dignissimos ratione. Animi molestias corporis cupiditate. Blanditiis, eum beatae."
                    >
                    
                    </v-textarea>
                    <v-rating
                        hover
                        length="5"
                        size="20"
                        value="3"
                        readonly="true"
                    >

                    </v-rating>
            </v-col>
            </v-row>
            
        </v-sheet>
        <v-sheet class="my-8">
            <v-row>
                <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="9" >
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    >
                    </v-textarea>
                    <v-rating
                        hover
                        length="5"
                        size="20"
                        value="3"
                    >

                    </v-rating>
                    <v-btn
                    rounded
                    color="primary"
                    class = "text-capitalize mx-auto"
                    >submit</v-btn>
            </v-col>
            </v-row>
            
        </v-sheet>
        <!-- <v-row>
            <v-col>
                <v-avatar>
                    <img src="@/assets/ProfilePic2.jpg" alt="">
                </v-avatar>
            </v-col>
            <v-col>
                <v-sheet>
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    >
                    </v-textarea>
                    <v-rating
                        hover
                        length="5"
                        size="20"
                        value="3"
                    >
                    </v-rating>
                </v-sheet>
            </v-col>
        </v-row> -->

    </div>
</template>

<script>
import CourseCard from "@/components/MobileComponents/CourseCard"
    export default {
        components: {
            CourseCard
        }
    }
</script>

<style scoped>

</style>