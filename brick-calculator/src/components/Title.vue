<template lang="pug">

  h4.text-xs-center.display-2.teal--text.mb-4
    | {{ $t('title.caption') }}

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

