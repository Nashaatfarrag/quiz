<template>
  <div class="header bg-dark">
    <b-nav tabs align="center">
      <b-nav-item disabled><b>Fancy quiz App</b></b-nav-item>
      <b-nav-item disabled>Counter : {{Math.min(index+1,10)}}/10</b-nav-item>
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
  *{
  
    color: rgb(255, 255, 255);
    margin-bottom: 10px
  }
</style>

