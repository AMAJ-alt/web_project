<template>
  <li>
    <router-link :to="{ name: 'blog', params: { id: item.GUID }, query: { item: JSON.stringify(item) } }" class="item">
      <div class="imageWrapper">
        <img :src="item.ImageUrl" alt="image" class="imaged w100">
      </div>
      <div class="in">
        <div>
          <header class="fs-6">{{ item.CategoryName }}</header>
          {{ item.Title }}
          <br>
          <footer>
            <p :class="['text-',item.StatusColor]">{{ item.StatusName }}</p>
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
