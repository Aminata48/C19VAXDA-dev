<template>
  <div class="mainApp">
    <div class="section">
      <div class="column">
        <card :labels="this.labels" :iconArrayProps="iconArrayProps"
              :chosenCharacterFromAvatarsView="chosenCharacterFromAvatarsView"
        />
      </div>
    </div>
  </div>
</template>

<script>
import card from "../components/Evidence/EvidenceCards.vue"


export default {
  name: "EvidenceView",
  props:{
    labels: Object,
    iconArrayProps: Object, //contains { targetList}
    chosenCharacterFromAvatarsView : Object,
  },
  components: {
    card
  },
  mounted() {
    console.log("chargement de evidence");
    this.$emit('changeRouteName', "Evidence");
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
