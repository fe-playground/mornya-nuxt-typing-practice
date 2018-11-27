<template>
  <div class="ranking-wrapper">
    <div class="ranking-inner">
      <ul v-if="ranking.length">
        <li v-for="(item, index) in ranking" :key="`ranking-${index}`">
          <strong>{{ index + 1 }}</strong>등
          <strong>{{ item.username }}</strong>님... ( {{ item.elapsed / 1000 }}초 )
        </li>
      </ul>
      <div v-else class="no-ranking-data">📣 아직 랭킹 정보가 없습니다. 새로 도전해 보세요!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ranking',
  props: {
    ranking: {
      type: Array,
      required: false,
      default () {
        return []
      },
    },
  },
}
</script>

<style scoped lang="scss">
  .ranking-wrapper {
    margin: 0 auto;
    max-width: 500px;
    text-align: center;

    .ranking-inner {
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
      text-align: left;
      ul {
        list-style-type: none;
        padding: 20px 20px;
        li {
          strong {
            color: deeppink;
          }
        }
      }
      .no-ranking-data {
        padding: 20px;
        text-align: center;
        font-size: 14px;
      }
    }
  }
</style>
