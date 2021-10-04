<template>
<h1>text's coming </h1>
</template>

<script>
export default {
  name: "AboutUs",
  mounted() {
    this.$emit('changeRouteName', "AboutUs");
  }
}


</script>

<style scoped>

</style>