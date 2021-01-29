<template>
    <div>
        <v-textarea
          solo
          name="input-7-4"
          label="Solo textarea"
          :disabled = "!Editing"
          flat
        ></v-textarea>
        <v-row justify="end" class="px-8">
            <v-btn rounded color="primary" v-if="Editing" @click="Editing = !Editing">
                Save
            </v-btn>
            <v-btn rounded color="primary" v-if="!Editing" @click="Editing = !Editing">
                Edit
            </v-btn>


        </v-row>

    </div>
</template>

<script>
    export default {
        data () {
            return{
                Editing: true
            }
        }
        
    }
</script>

<style scoped>

</style>