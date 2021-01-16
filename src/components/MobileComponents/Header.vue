<template>
  <v-app id="inspire">
    <v-app-bar-title
    height = "200"
    >
      <svg id="Group_56" data-name="Group 56" xmlns="http://www.w3.org/2000/svg" width="180" height="50.001" viewBox="0 0 151 40.001">
        <path id="Icon_awesome-lightbulb" data-name="Icon awesome-lightbulb" d="M5.441,25.734a1.813,1.813,0,0,0,.3,1l.968,1.455A1.812,1.812,0,0,0,8.221,29h3.5a1.812,1.812,0,0,0,1.509-.809l.968-1.455a1.812,1.812,0,0,0,.3-1l0-2.172H5.438ZM0,9.968a9.913,9.913,0,0,0,2.467,6.558,16.277,16.277,0,0,1,2.957,5.18c0,.015,0,.029.006.044h9.076c0-.015,0-.029.006-.044a16.277,16.277,0,0,1,2.957-5.18A9.966,9.966,0,1,0,0,9.968ZM9.968,5.437A4.536,4.536,0,0,0,5.437,9.968a.906.906,0,0,1-1.812,0A6.351,6.351,0,0,1,9.968,3.625a.906.906,0,0,1,0,1.812Z" transform="translate(3 11.001)" fill="#215679"/>
        <text id="Chessbulb" transform="translate(0 32)" font-size="32" font-family="Quicksand-Regular, Quicksand"><tspan x="0" y="0">Chessbulb</tspan></text>
      </svg>
    </v-app-bar-title>
    <v-app-bar
      color="white"
      flat
    >

      <v-tabs
        centered
        class="ml-1"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key = link
        >
          <v-icon size = 28>{{link}}</v-icon>
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'mdi-home',
        'mdi-account-circle',
        'mdi-teach',
        'mdi-pencil',
      ],
    }),
  }
</script>