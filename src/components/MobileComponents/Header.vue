<template>
  <div id="inspire">
    <!-- <v-app-bar-title
      app
    > -->
    <!-- <svg  id="Group_56" data-name="Group 56" xmlns="http://www.w3.org/2000/svg" width="180" height="50.001" viewBox="0 0 151 40.001" class="ml-1">
        <path id="Icon_awesome-lightbulb" data-name="Icon awesome-lightbulb" d="M5.441,25.734a1.813,1.813,0,0,0,.3,1l.968,1.455A1.812,1.812,0,0,0,8.221,29h3.5a1.812,1.812,0,0,0,1.509-.809l.968-1.455a1.812,1.812,0,0,0,.3-1l0-2.172H5.438ZM0,9.968a9.913,9.913,0,0,0,2.467,6.558,16.277,16.277,0,0,1,2.957,5.18c0,.015,0,.029.006.044h9.076c0-.015,0-.029.006-.044a16.277,16.277,0,0,1,2.957-5.18A9.966,9.966,0,1,0,0,9.968ZM9.968,5.437A4.536,4.536,0,0,0,5.437,9.968a.906.906,0,0,1-1.812,0A6.351,6.351,0,0,1,9.968,3.625a.906.906,0,0,1,0,1.812Z" transform="translate(3 11.001)" fill="#215679"/>
        <text id="Chessbulb" transform="translate(0 32)" font-size="32" font-family="Quicksand-Regular, Quicksand"><tspan x="0" y="0">Chessbulb</tspan></text>
      </svg> -->
    <!-- </v-app-bar-title> -->
    <v-app-bar color="white px-0 mx-0" flat>
      <v-tabs
        centered
        color="white"
        class="px-0"
        background-color="white"
        slider-color="primary"
      >
        <v-layout justify-center class="px-0" size="10">
          <v-tab
            v-for="link in links"
            :key="link"
            class="mx-0 px-0"
            retain-focus-on-click="false"
            :to="link.route"
          >
            <v-icon size="28" color="primary">{{ link.icon }}</v-icon>
          </v-tab>
        </v-layout>
      </v-tabs>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        icon: "fa-home",
        route: "/"
      },
      {
        icon: "mdi-account-circle",
        route: "/Profile"
      },
      {
        icon: "mdi-teach",
        route: "/Learn"
      },
      {
        icon: "fa-pen-square",
        route: "/Academies"
      }
    ]
  })
};
</script>
