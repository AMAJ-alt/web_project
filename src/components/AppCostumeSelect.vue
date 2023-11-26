<template>
  <div>
    <div data-bs-toggle="offcanvas" :data-bs-target="`#${id}`"
      class="form-control" style="padding: 10px 16px">
      {{ selectedOption }}
    </div>

    <vee-field :name="name" type="hidden" v-model="selectedOption"/>
    <ErrorMessage class="text-danger fs-6" :name="name" />

    <div class="offcanvas offcanvas-bottom action-sheet inset" tabindex="-1" :id="id">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">{{ label }}</h5>
      </div>
      <div class="offcanvas-body">
        <ul class="action-button-list">
          <li v-for="(option, index) in options" :key="index">
            <option data-bs-dismiss="offcanvas" :value="option.value" class="btn btn-list" @click="selectOption(option)">
              <span>{{ option.label }}</span>
            </option>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    label: String,
    options: Array,
    value: String,
  },
  data() {
    return {
      selectedOption: this.findOptionByValue(this.value) || '',
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option.value;
    },
    findOptionByValue(value) {
      return this.options ? this.options.find((option) => option.value === value) : null;
    },
  },
};
</script>
