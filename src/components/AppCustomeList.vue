<template>
  <li>
    <a href="#" class="item">
      <img src="assets/img/sample/avatar/avatar1.jpg" alt="image" class="image">
      <div class="in">
        <div>
          <header>{{ item.CreatorName }}</header>
            {{ item.Title }}
          <footer>{{ item.CategoryName }}</footer>
        </div>
        <span class="text-muted">ویرایش</span>
      </div>
    </a>
  </li>
</template>
<script>
export default {
  name: 'AppCustomeList',
  props: ['item'],
}
</script>
