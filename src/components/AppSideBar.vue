<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebarPanel" aria-modal="true" role="dialog">
    <div class="offcanvas-body">
      <!-- profile box -->
      <div class="profileBox">
        <div class="image-wrapper">
          <!-- <img src="assets/img/sample/avatar/avatar1.jpg" alt="image" class="imaged rounded"> -->
        </div>
        <div class="in">
          <strong>جولیان گروبر</strong>
          <div class="text-muted">
            <ion-icon name="location" role="img" class="md hydrated" aria-label="location"></ion-icon>
            کالیفرنیا
          </div>
        </div>
        <a href="google.com" class="close-sidebar-button" data-bs-dismiss="offcanvas">
          <p class="d-none">asa</p>
          <ion-icon name="close" role="img" class="md hydrated" aria-label="close"></ion-icon>
        </a>
      </div>
      <!-- * profile box -->

      <ul class="listview flush transparent no-line image-listview mt-2">
        <li v-for="menuItem in GetAppMenuListResult" :key="menuItem.Id">
          <a href="index.html" class="item">
            <div class="icon-box bg-primary">
              <ion-icon name="home-outline" role="img" class="md hydrated" aria-label="home outline"></ion-icon>
            </div>
            <div class="in">
              {{ menuItem.Title }}
            </div>
          </a>
        </li>
      </ul>
    </div>

    <div class="sidebar-buttons">
      <a href="#" class="button">
        <p class="d-none">asa</p>
        <ion-icon name="person-outline" role="img" class="md hydrated" aria-label="person outline"></ion-icon>
      </a>
      <a href="#" class="button">
        <p class="d-none">asa</p>
        <ion-icon name="archive-outline" role="img" class="md hydrated" aria-label="archive outline"></ion-icon>
      </a>
      <a href="#" class="button">
        <p class="d-none">asa</p>
        <ion-icon name="settings-outline" role="img" class="md hydrated" aria-label="settings outline"></ion-icon>
      </a>
      <a href="#" class="button">
        <p class="d-none">asa</p>
        <ion-icon name="log-out-outline" role="img" class="md hydrated" aria-label="log out outline"></ion-icon>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppSideBar',
  computed: {
    ...mapState(['GetAppMenuListResult']),
  },
};
</script>
