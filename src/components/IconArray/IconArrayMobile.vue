<template>
  <v-app id="main_container">
    <v-container id="myContainer" @click="$emit('move')" @touchmove="$emit('highlight')">

      <!--      icon array description-->
      <div >
        <h1 >Lorem ipsum dolor</h1>
        <br>
        sit amet, usu at dicam dolore inimicus. Ad voluptua definiebas vim, te vim omnes postulant.
        Oblique facilisis id qui. Eros latine pertinax no pri, his ei lorem nominati. Malis tractatos mnesarchum cum ut,
        at cibo sale pro. Qui ex nibh augue vituperata, ut nec fabulas evertitur vituperata.
        In eos natum populo malorum, equidem ancillae invenire nec ut, no his quas tation ponderum.

      </div>


      <!--      icon array-->
      <div style="display: flex; justify-content:center">
        <div class="iconArray" :key="column_id" v-for="column_id in 10">
          <div :key="line_id" v-for="line_id in 10">
            <div :class="line_id+'_'+column_id" :id="line_id+'_'+column_id">
              <Character style="margin: 10px 5px;"  :ref="line_id+'_'+column_id" :is-name="true" class="avatar"
                       :size="{width: '32px', height: '32px'}" :edit="false" :customised="true" :colors="avatar.colors"
                         :id="avatar.id + '_'+line_id+'_'+column_id" :svgFile="require(`@/assets/characters/${avatar.file}`)"/>
            </div>
          </div>
        </div>
      </div>



    </v-container>
  </v-app>
</template>

<script>
import Character from "@/components/Avatars/Character";

export default {
  name: "IconArrayMobile",
  components: {
    Character
  },

  data() {
    return {

    };
  },

  props:{
    avatar :{
      type : Object
    }
  },
}
</script>

<style scoped>

.avatar{
  height: 27px;
  width: 27px;
}

h1{
  font-size: 40px;
}

</style>