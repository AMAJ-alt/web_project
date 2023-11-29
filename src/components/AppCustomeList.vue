<template>
  <li :class="item.StatusColor">
    <router-link :to="{ name: 'GetAdvCnt', params: { type: 'Articles', id: item.Id } }" class="item">
      <div class="imageWrapper">
        <img :src="item.ImageUrl" alt="image" class="imaged w100">
      </div>
      <div class="in">
        <div>
          <header class="fs-6">{{ item.CategoryName }}</header>
          {{ item.Title }}
          <br>
          <footer>
            <p>{{ item.StatusName }}</p>
            <br>
            <time>{{ item.PublishDateStr }}</time>
          </footer>
        </div>
        <span class="text-muted">ویرایش</span>
      </div>
    </router-link>
  </li>
</template>
<script>
export default {
  name: 'AppCustomeList',
  props: ['item'],
};
</script>

<style>
.success{
  background-color: #0080000f;
}
.info{
  background-color: #0000ff0f;
}
.danger{
  background-color: #ff00000a;
}
</style>
