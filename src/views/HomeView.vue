<template>
  <!-- <div id="appCapsule">
    <div class="text-center">
      صفحه خانه
    </div>
    <div class="login-form mt-5 pe-2 ps-2">
      <div class="section">
        <img src="../assets/avatar1.jpg" alt="avatar" class="imaged rounded w86">
      </div>
      <div class="section mt-3">
        <h2>جولیان گرابر</h2>
      </div>
      <div class="section mt-3 mb-5">
        <form action="app-pages.html">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="password" class="d-none">type...</label>
              <input type="password" class="form-control" id="password1" placeholder="رمز" autocomplete="off">
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
            </div>
          </div>

          <div class="form-button-group">
            <button type="submit" class="btn btn-primary btn-block btn-lg">ورود</button>
          </div>

        </form>
      </div>
    </div>
  </div> -->
  <AppCostume  :label="selectLabel" :options="selectOptions" :value="selectedValue" v-model="selectedValue" />
</template>

<script>
import AppCostume from '@/components/AppCostume.vue';

export default {
  name: 'HomeView',
  components: {
    AppCostume,
  },
  data() {
    return {
      selectLabel: 'انتخاب گزینه',
      selectOptions: [
        { value: 'option1', label: 'گزینه 1' },
        { value: 'option2', label: 'گزینه 2' },
        { value: 'option3', label: 'گزینه 3' },
      ],
      selectedValue: '',
    };
  },
};
</script>
