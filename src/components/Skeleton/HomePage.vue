<template>
    <div>
        <router-link to="/Stories/1" >Stories</router-link>
        <tr></tr>
        <router-link to="/PostStory">Post Story</router-link>
        <router-view></router-view>

    </div>
</template>

<script>
/*eslint-disable*/
    import StoryScrollingTab from '@/components/MarawanComponents/StoryScrolling/StoryScrollingTab.vue'
    import ProfileCard from '@/components/SadekComponents/ProfileCard/ProfileCard.vue'
    import NewsFeed from '@/components/SadekComponents/NewsFeed/NewsFeed.vue'
    export default {
        
    }
</script>

<style scoped>


</style>
