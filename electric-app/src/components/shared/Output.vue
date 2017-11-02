<template lang="pug">

  v-container

    v-layout( row )
      v-flex( xs12 )
        h4
          | Перечень материалов
        article
          p Розетки LEGRAND(Франция).
          p Декоративные рамки LEGRAND(Франция).
          p Выключатели LEGRAND(Франция).
          p Подрозетники и распределительные коробки фирмы HOGEL.
          p Современный, качественный, удовлетворяющий всем нормам, медный негорючий провод ВВГ НГ Ls или NYM необходимого в зависимости от нагрузки сечения.
          p Гофрированная ПВХ труба в комплекте с креплениями по необходимости.
          p Современный качественный кабель для спутникового телевидения фирмы CAVEL(Италия) SAT 703.
          p TV розетки LEGRAND(Франция).
          p Разветвитель(краб) для спутникового телевидения.
          p Расходники: алмазные диски, диски по металлу, буры, сверла, клемные колодки, изолента, дюбель-гвозди, шины, лампочки и патроны.
          p Алебастр и Ротбанд.

    v-layout( row )
      v-flex( xs12 )
        h4
          | Перечень работ
        article
          p Укладка проводов в штробу и по необходимости в гофрированную пвх трубу с креплением на клипсы.
          p Монтаж подрозетников.
          p Установка розеток.
          p Проверка работоспособности системы.
          p Установка тв розеток.
    
    v-layout( row )
      v-flex( xs8 )
        | Персональная скидка на работу:
      v-flex( xs4 )
        | {{ discount | currency }}
    
    v-layout( row )
      v-flex( xs8 )
        | Стоимость работы с учетом скидки:
      v-flex( xs4 )
        | {{ costWork | currency }}

    v-layout( row )
      v-flex( xs8 )
        | Стоимость материалов:
      v-flex( xs4 )
        | {{ costMaterial | currency }}

    v-layout( row )
      v-flex( xs8 )
        | Сумма к оплате за работу и материалы, со скидкой:
      v-flex( xs4 )
        | {{ costTotal | currency }}

</template>

<script>
  import currency from '../../filters/currency'

  export default {
    name: 'Output',
    filters: {
      currency
    },
    computed: {
      discount () {
        return this.$store.getters.getCostCommonWorkDiscount
      },
      costWork () {
        return this.$store.getters.getCostCommonWorkWithDiscount
      },
      costMaterial () {
        return this.$store.getters.getCostMaterialCommon
      },
      costTotal () {
        return this.$store.getters.getCostTotal
      }
    }
  }
</script>

<style lang="stylus" scoped>
  //
</style>

