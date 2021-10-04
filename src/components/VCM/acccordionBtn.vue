<template>
  <section class="section">
    <div class="container">
      <div class="column">
        <button class="accordion">{{ accordionName }}</button>
        <div class="panel" style="border: 1px solid #ccc">
          <p>{{ msgCard }}</p>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  name: "acccordionBtn",
  props: {
    accordionName: String,
    msgCard: String
  },
  data() {
    return {};
  },
  methods: {
    /**
     * This methods active icon toggle and card header
     * @function {activeAccordion}
     * @param none
     * @returns none
     */
    activeAccordion() {
      var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
      }
    }

  },
  mounted() {
    this.activeAccordion();
    document.addEventListener('DOMContentLoaded', () => {
    });

  }

}
</script>

<style scoped>
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  font-size: 15px;
  transition: 0.4s;
}

.panel {
  padding: 0 18px;
  display: none;
  background-color: white;
  /*overflow: hidden;*/
}
</style>
