<template lang="pug">

  h4.text-xs-center.text-md-left.headline.teal--text
    | {{ title }}

</template>

<script>
  export default {
    name: 'Title',
    data () {
      return {
        title: 'Калькулятор кирпичной кладки'
      }
    }
  }
</script>

