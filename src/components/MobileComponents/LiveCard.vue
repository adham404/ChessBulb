<template>
  <div>
    <v-sheet class="my-8">
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols="2" class="mx-0 px-0">
            <img
              :src="LiveData.InstractorPic ? LiveData.InstractorPic :'/img/icons/pexels-pixabay-220453.jpg'"
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
          <!-- <span class="text-caption ml-2">Mostafa</span> -->
        </v-col>
        <v-col cols="9">
          <span class="text-h6">{{ LiveData.LiveTitle }}</span>
          <br />
          <span class="text-caption"
            >>by {{LiveData.InstractorName}} (instructor at {{LiveData.AcademyName}})</span
          >
          <br />
          <span class="text-subtitle-1">starts on {{ LiveData.LiveDate.toDate().toDateString() }}</span>
          <v-btn
            xs
            class="text-lowercase primary"
            height="25"
            :disabled="LiveData.status== 'OffLine' ? true : false "
            @click="
              () => {
                $router.push('/LiveViewer/' +LiveData.id);
              }
            "
            >join room</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: ["LiveData"]
};
</script>

<style scoped></style>
