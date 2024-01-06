<template>
  <div id="appCapsule">

    <div class="message-divider">
      جمعه، 20 مرداد 1401، 10:40 AM
    </div>

    <div class="message-item" :class="{ 'user': TicketDetails.IsSentByUser, }" v-for="TicketDetails in GetSupportTicketingDetailsResult" :key="TicketDetails.GUID">
      <!-- <img src="assets/img/sample/avatar/avatar1.jpg" alt="avatar" class="avatar"> -->
      <div class="content">
        <div class="bubble">
          {{ TicketDetails.Subject }}
        </div>
        <div class="footer">{{ TicketDetails.CreateDateStr }}</div>
      </div>
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
    <vee-form @submit="sendTicketDetails" :validation-schema="ticketSchema">
      <a href="#" class="btn btn-icon btn-secondary rounded" data-bs-toggle="offcanvas" data-bs-target="#actionSheetAdd">
        <ion-icon name="add">h</ion-icon>
      </a>
      <div class="form-group boxed">
        <div class="input-wrapper">
          <label class="d-none"></label>
          <vee-field name="pm" type="text" class="form-control" placeholder="یک پیام بنویسید..."/>
        </div>
      </div>
      <button type="button" class="btn btn-icon btn-primary rounded">
        <ion-icon name="send"> </ion-icon>
      </button>
    </vee-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'TicketView',
  data() {
    return {
      ticketSchema: {
        pm: '',
      },
    };
  },
  computed: {
    ...mapState(['GetSupportTicketingDetailsResult']),
  },
  methods: {
    sendTicketDetails() {

    },
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      const getTicketDetailTaskObj = {
        Id: vm.$route.params.id,
      };
      await vm.$store.dispatch('WS_GetSupportTicketingDetails', tikaUtils.serializeObject(getTicketDetailTaskObj));

      vm.$store.dispatch('headerTitle', {
        center: 'چت',
        left: '<ion-icon name="call-outline"></ion-icon><span class="badge badge-danger">1</span>',
        to: 'forget',
      }).then(() => {
      });
    });
  },
};
</script>
