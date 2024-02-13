<template>
  <div id="appCapsule">

    <div class="message-divider">
      جمعه، 20 مرداد 1401، 10:40 AM
    </div>

    <div class="message-item">
      <img src="assets/img/sample/avatar/avatar1.jpg" alt="avatar" class="avatar">
      <div class="content">
        <div class="title">جان</div>
        <div class="bubble">
          سلام به همگی حالتون چطوره؟
        </div>
        <div class="footer">8:40 AM</div>
      </div>
    </div>

    <div class="message-item user">
      <div class="content">
        <div class="bubble">
          لطفاً عکسی را که دیروز ارسال کردید قرار دهید؟
        </div>
        <div class="footer">10:40 AM</div>
      </div>
    </div>

    <div class="message-divider">
      شنبه، 21 مرداد 1401، 10:40 AM
    </div>
  </div>
  <!-- * App Capsule -->

  <!-- Add Action Sheet -->
  <div class="offcanvas offcanvas-bottom action-sheet inset" tabindex="-1" id="actionSheetAdd">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">اشتراک گذاری</h5>
    </div>
    <div class="offcanvas-body">
      <ul class="action-button-list">
        <li>
          <a href="#" class="btn btn-list" data-bs-dismiss="offcanvas">
            <span>
              <ion-icon name="camera-outline"></ion-icon>
              عکس گرفتن
            </span>
          </a>
        </li>
        <li>
          <a href="#" class="btn btn-list" data-bs-dismiss="offcanvas">
            <span>
              <ion-icon name="videocam-outline"></ion-icon>
              ویدئو
            </span>
          </a>
        </li>
        <li>
          <a href="#" class="btn btn-list" data-bs-dismiss="offcanvas">
            <span>
              <ion-icon name="image-outline"></ion-icon>
              آپلود از گالری
            </span>
          </a>
        </li>
        <li>
          <a href="#" class="btn btn-list" data-bs-dismiss="offcanvas">
            <span>
              <ion-icon name="document-outline"></ion-icon>
              اسناد
            </span>
          </a>
        </li>
        <li>
          <a href="#" class="btn btn-list" data-bs-dismiss="offcanvas">
            <span>
              <ion-icon name="musical-notes-outline"></ion-icon>
              فایل صوتی
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <!-- * Add Action Sheet -->

  <!-- chat footer -->
  <div class="chatFooter">
    <form>
      <a href="#" class="btn btn-icon btn-secondary rounded" data-bs-toggle="offcanvas" data-bs-target="#actionSheetAdd">
        <ion-icon name="add">h</ion-icon>
      </a>
      <div class="form-group boxed">
        <div class="input-wrapper">
          <label class="d-none"></label>
          <input type="text" class="form-control" placeholder="یک پیام بنویسید...">
          <i class="clear-input">
            <ion-icon name="close-circle"></ion-icon>
          </i>
        </div>
      </div>
      <button type="button" class="btn btn-icon btn-primary rounded">
        <ion-icon name="send"> </ion-icon>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HChatView',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch('headerTitle', {
        vis: true,
        center: 'چت',
        left: '<ion-icon name="call-outline"></ion-icon><span class="badge badge-danger">1</span>',
        to: 'forget',
        right: 'goBack',
      }).then(() => {
      });
    });
  },
};
</script>
