<template>
  <div id="mainApp">

    <div style="margin-right: 155vh">
    <p>
      <b
      :style="{fontFamily: defaultsSettings.style.fontFamily.fontFamilySubtitle, fontSize: defaultsSettings.style.fontSize.fontSizeBox, fontWeight:defaultsSettings.style.fontWeight.fontWeightSubtitle}">{{this.labels.cardSubtitle[0]}}</b>
    </p>
    </div>
          <div id="vcm-card"
          :style="{fontFamily:defaultsSettings.style.fontFamily.fontFamilyBox, fontSize: defaultsSettings.style.fontSize.fontSizeBox}">
            <card :labels="this.labels.vcmComponent"/>
      </div>
    </div>
</template>

<script>
import card from "../components/VCM/Card.vue"
import config from "./../assets/json/hpvvax.json"
import defaultsSettings from "./../assets/json/defaultSettings.json"


export default {
  name: "VCMView",
  components: {
    card,
  },
  props: {
    labels: Object
  },
  data() {
    return {
      numberOfCard: 0,
      isLanguageChanged: false,
      defaultsSettings:defaultsSettings,
    };

  },
  methods: {
    /**
     * ---> ------------------ will be completed soon -------------------
     * @return none
     */
    getAllUrlParams(url) {

      // get query string from url (optional) or window
      let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

      // we'll store the parameters here
      let obj = {};

      // if query string exists
      if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        let arr = queryString.split('&');

        for (let i = 0; i < arr.length; i++) {
          // separate the keys and the values
          let a = arr[i].split('=');

          // set parameter name and value (use 'true' if empty)
          let paramName = a[0];
          let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

          // (optional) keep case consistent
          paramName = paramName.toLowerCase();
          if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

          // if the paramName ends with square brackets, e.g. colors[] or colors[2]
          if (paramName.match(/\[(\d+)?\]$/)) {

            // create key if it doesn't exist
            let key = paramName.replace(/\[(\d+)?\]/, '');
            if (!obj[key]) obj[key] = [];

            // if it's an indexed array e.g. colors[2]
            if (paramName.match(/\[\d+\]$/)) {
              // get the index value and add the entry at the appropriate position
              let index = /\[(\d+)\]/.exec(paramName)[1];
              obj[key][index] = paramValue;
            } else {
              // otherwise add the value to the end of the array
              obj[key].push(paramValue);
            }
          } else {
            // we're dealing with a string
            if (!obj[paramName]) {
              // if it doesn't exist, create property
              obj[paramName] = paramValue;
            } else if (obj[paramName] && typeof obj[paramName] === 'string') {
              // if property does exist and it's a string, convert it to an array
              obj[paramName] = [obj[paramName]];
              obj[paramName].push(paramValue);
            } else {
              // otherwise add the property
              obj[paramName].push(paramValue);
            }
          }
        }
      }

      return obj;
    }


  },
  created() {
    // global
    this.numberOfCard = config.numberOfCard;
  },
  mounted() {
    this.$emit('changeRouteName', "vcm");
  }
}
</script>

<style scoped>

#mainApp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 12px;
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100vh;
  background-attachment: fixed;
}

#space_between_card {
  margin-bottom: 0px;

}

.title.overall {
  /*background-color: #3273dc;*/
  /*opacity: 0.8;*/
  /*background: rgba(167,81,15,0.6);*/
  background: rgba(28, 93, 154, 0.5);
  /*background: rgba(28,32,154,0.5);*/
  padding: 12px;
}

.title.overall h1 {
  color: white;
  font-weight: bold;
}

/*on small devices such as phone and tablet(smartphone)*/
@media screen and (min-width: 320px)  and (max-width: 768px) {
  #mainApp {
    padding: 0;
  }
  #vcm-card{
   display: flex;
    align-items: center;
  }

  .column {
    padding: 0;
  }

  div.section {
    padding: 0;
  }

  .title.overall {
    padding: 0px;
    margin: 0px;
  }

}
</style>