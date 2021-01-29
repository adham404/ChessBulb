<template>
    <div class="mt-5">
        <v-row justify="space-around">
            <v-col cols="2">
                <v-sheet rounded="lg" elevation="4" height="500">
                    <v-avatar size="100" cols= "2" class="ml-16 mt-2">
                        <img src="img\icons\pexels-pixabay-220453.jpg" alt="" style="object-fit: cover">
                    </v-avatar>
                    <br>
                    <span class="text-subtitle-1 ml-4">Smouha Chess Academy</span>
                    <v-col >
                    <!-- <v-btn rounded color="primary" class="text-capitalize">
                        Edit Academy About
                    </v-btn>
                    <br>
                    <v-btn rounded color="primary" class = "text-capitalize">
                        Live sessions list
                    </v-btn>
                    <br>
                    <v-btn rounded color="primary" class = "text-capitalize">
                        Courses
                    </v-btn>
                    <br>
                    <v-btn rounded  color="primary" class = "text-capitalize">
                        Create Course
                    </v-btn>
                    <v-btn rounded  color="primary" class = "text-capitalize">
                        Create Live session
                    </v-btn> -->
                    <v-card
                            class="mx-auto"
                            max-width="300"
                            tile
                        >
                            <v-list dense>
                            <v-subheader>REPORTS</v-subheader>
                            <v-list-item-group
                                v-model="selectedItem"
                                color="primary"
                            >
                                <v-list-item
                                v-for="(item, i) in items"
                                :key="i"
                                >
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-sheet>
            </v-col>
            <v-col cols="6">
                <v-row>
                    <v-col>
                        <v-sheet cols = "5" rounded="lg" height="200" class="px-2">
                            <span class="text-h6">Monthly Income</span>
                            <br>
                            <span class="text-h1">200 Egp</span>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet cols = "5" rounded="lg" height="200" class="px-2">
                            <span class="text-h6">Number of Members</span>
                            <br>
                            <span class="text-h1">10</span>

                        </v-sheet>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-sheet rounded="lg" height="300">
                            <AcademyAboutEditing/>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="2">
                <v-sheet rounded="lg" height="500" class="px-2">
                    <span class="text-h6">List of Members</span>
                    <MemberList/>
                </v-sheet>
            </v-col>
        </v-row>

    </div>
</template>

<script>
import MemberList from "@/components/DesktopComponents/MemberList"
import AcademyAboutEditing from "@/components/DesktopComponents/AcademyAboutEditing"
    export default {
        data: () => ({
      selectedItem: 1,
      items: [
        { text: 'Edit Academy About', icon: 'fa-edit' },
        { text: 'Live sessions list', icon: 'fa-video' },
        { text: 'Courses', icon: 'fa-chalkboard-teacher' },
        { text: 'Create Course', icon: 'fa-chess-board' },
        { text: 'Create Live session', icon: 'fa-plus-circle' },
      ],
    }),
        components: {
            MemberList,
            AcademyAboutEditing
        }
        
    }
</script>

<style scoped>

</style>