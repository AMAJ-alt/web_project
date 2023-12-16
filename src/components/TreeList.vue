<!-- TreeList.vue -->
<template>
  <ul class="list-group">
    <li v-for="item in treeData" :key="item.id" class="list-group-item">
      <span class="tree-node" :style="{ 'margin-left': item.level * 20 + 'px' }">
        {{ item.label }}
      </span>
      <tree-list :treeData="item.children" v-if="item.children && item.children.length > 0"/>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
/* استایل‌های خاص شما */
.tree-node {
  font-weight: bold;
  color: #343a40; /* رنگ مشکی تیره */
  padding: 8px;
  border-radius: 4px;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.tree-node:hover {
  background-color: #e9ecef; /* رنگ پس زمینه در هنگام هاور */
}
</style>
