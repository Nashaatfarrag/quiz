<template>
  <div class="header bg-light">
    <b-nav tabs align="center">
      <b-nav-item disabled><b>Fancy quiz App</b></b-nav-item>
      <b-nav-item disabled>Counter : {{index}}/10</b-nav-item>
    </b-nav>
  </div>
</template>
<script>

export default {
  props : {
    index : Number , 
  }

}
</script>
<style scoped>
  .header{
  
    color: white;
    margin-bottom: 10px
  }
</style>

