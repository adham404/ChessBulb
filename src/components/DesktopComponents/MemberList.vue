<template>
    <div style="overflow-y: scroll; height: 80%; overflow-x: hidden;">
        <MemberCard v-for="n in 20" :key="n"/>

    </div>
</template>

<script>
import MemberCard from "@/components/DesktopComponents/MemberCard"
    export default {
        components: {
            MemberCard
        }
        
    }
</script>

<style scoped>

</style>