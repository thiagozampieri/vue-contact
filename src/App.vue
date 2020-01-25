<template>
	<div id="app">
		<Datatable/>
	</div>
</template>

<script>
  import Datatable from './components/Datatable.vue'

  export default {
    components: {
      Datatable
    }
  }
</script>

<style lang="scss" scoped>
  *, *::before, *::after {
    box-sizing: border-box;
  }

  #app { 
    max-width: 90%;
    margin: 0 auto;
    line-height: 1.4;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>