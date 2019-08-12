<template>
  <div class="header text-center">
    <b-nav tabs>
      <b-nav-item disabled><b>Fancy quiz App</b></b-nav-item>
      <b-nav-item disabled>Counter : {{index}}/10</b-nav-item>
      <b-nav-item disabled >Mohamed Nashaat</b-nav-item>
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
    background-color: rgb(34, 0, 0) ;
    margin-top: 0%;
  }
</style>

