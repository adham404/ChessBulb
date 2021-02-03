<template>
  <div>
    <AddCard />
    <Stories />
    <NewsFeed />
  </div>
</template>

<script>
import NewsFeed from "@/components/MobileComponents/Newsfeed";
import Stories from "@/components/MobileComponents/Stories";
import AddCard from "@/components/MobileComponents/AddCard";
export default {
  name: "Home",
  components: {
    AddCard,
    NewsFeed,
    Stories
  }
};
</script>
