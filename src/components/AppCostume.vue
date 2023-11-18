<template>
  <div>
    <!-- <div data-bs-toggle="offcanvas" data-bs-target="#actionSheetDefaultInset" class="form-control"
      @keydown.prevent="toggleDropdown" @click="toggleDropdown" style="padding: 10px 15px; text-align: start;">
      {{ selectedOption.label }}
    </div> -->
    <label for="number" class="d-none"></label>
    <vee-field as="checkbox" name="gender" data-bs-toggle="offcanvas" data-bs-target="#actionSheetDefaultInset"
      class="form-control" style="padding: 10px 16px;" :value="selectedOption.label"
      placeholder="جنسیت خود را انتخاب کنید" />
    <br>
    <ErrorMessage class="text-danger fs-6" name="gender" />

    <div class="offcanvas offcanvas-bottom action-sheet inset" tabindex="-1" id="actionSheetDefaultInset">
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
    label: String,
    options: Array,
    value: String,
  },
  data() {
    return {
      selectedOption: this.findOptionByValue(this.value) || { label: '' },
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
      this.$emit('input', option.value);
    },
    findOptionByValue(value) {
      return this.options ? this.options.find((option) => option.value === value) : null;
    },
  },
};
</script>
