<template>
  <v-col >
    <v-app-bar
        color="white"
        dark
        fixed
        :height="this.navbarHeight"
        class="appBar"
        elevation="12"
        style="z-index: 99;"
        app
    >
      <div>
        <v-btn v-html="require(`../assets/images/logo.svg`)"
               color="white"
               elevation="0"
               class="logo"
               @click="goToHomePage"
               height="auto"></v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-tabs align-with-title
              slider-color="black"
              slider-size="3"
              style="display: flex;
              flex-direction: row;
              justify-content: center;">
        <v-tabs-slider  :color= this.defaultSettings.style.color.primaryColors class="tabsSlider"></v-tabs-slider>
        <v-tab>
          <div>
            <v-menu
                open-on-click>
              <template v-slot:activator="{ on: menu, attrs }">
                <v-btn
                    ref="navbarBtn"
                    color="white"
                    dark
                    elevation="0"
                    :style="{color: defaultSettings.style.color.primaryColors}"
                    v-bind="attrs"
                    v-on="{...menu }">
                  {{routeName}}
                </v-btn>
              </template>

              <v-list class="list">
                <v-list-item
                    v-for="(item, index) in defaultSettings.routeName"
                    :key="index"
                    link
                    :style="{color: defaultSettings.style.color.primaryColors}"
                    :id="`listItem_${index}`"
                    class="listItem"
                    @click="showActiveView(item)"
                    :to="defaultSettings.routePath[index]"
                >
                  <v-list-item-title class="listItemTitle">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-tab>
      </v-tabs>

      <v-spacer></v-spacer>

      <div id="labels">
        <v-row
            class="d-flex"
            justify="end"
        >
          <v-select
              full-width
              :placeholder="this.labels.language"
              :items="this.defaultSettings.languageSelected"
              item-disabled="languageDisabled"
              dense
              background-color="#008363"
              item-color="green"
              @change="$emit('langSwitch', $event)"
          ></v-select>
        </v-row>
      </div>

    </v-app-bar>
  </v-col>
</template>

<script>
import defaultSettings from '../assets/json/defaultSettings.json';
export default {
  name: "Navbar",
  components : {

  },
  data() {
    return {
      defaultSettings : defaultSettings,
      screenWidth:
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
    }
  },
  props: {
    labels: {
      type : Object,
      require: true,
    },
    routeName: String,
  },
  methods: {
    showActiveView(routeName){
      this.activeView = routeName;
    },
    /**
     * ---> Switches between routes
     * @return none
     */
    switchRoutes(route) {
      if (this.$route.name.toLowerCase() !== route.toLowerCase()) {
        if (route === "Instructions") {
          route = '/';
          this.$router.push(route);
        }
        this.$router.push(route);

      }
    },
    goToHomePage(){
      this.$router.push('/');
      location.reload();
    }
  },
  computed: {
    navbarHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 125;
        case "sm":
          return 90;
        default:
          return 95;
      }
    },
    navbarLabels() {
      return this.labels.navbar;
    }
  },
  created() {

  },
  mounted() {
    // console.log("magniol test", this.$refs.navbarBtn);
  }
}
</script>


<style scoped lang="scss">

.logo{
  margin-left: 1vw;
  height : 130px;
  width: 130px;
}

#circularProgressBar:hover {
  cursor: initial;
}

.label {
  color: #3a3b41;
  transition: 0.3s;
}

.label:hover {
  color: #008363;
}



#lab {
  font-weight: 300;
  color: #3a3b41;
  font-size: max(5vh, 16px);
  text-decoration: none;
  margin: 0.6em 0 0 1.5em;
}

#lab:hover {
  cursor: pointer;
}

#labels {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 10vw;
  margin-right: 3vw;
}

.appBar {
  background-color: #008363;
  color: black;
}

@media screen and (max-width: 768px) {
  #navbarWrapper {
    display: initial;
  }

  #lab {
    text-align: center;
    font-size: max(3.7vh, 16px);
    width: 100%;
    margin: 0;
  }

  #labels {
    width: 100%;
  }
}
</style>
