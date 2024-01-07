<template>
  <TicketApp v-if="selectedTicketId !== undefined" :Id="selectedTicketId" />

  <div v-else class="container mt-5">
    <h1 class="mb-4">تیکت ها</h1>
    <ul class="list-group">
      <li v-for="ticket in GetSupportTicketingListResult" :key="ticket.Id" class="list-group-item"
        @click.prevent="getTicketDetails(ticket.Id)" @keydown.prevent="getTicketDetails(ticket.Id)">
        <h3 class="mb-3">{{ ticket.Subject }}</h3>
        <p><strong>شناسه:</strong> {{ ticket.Id }}</p>
        <p><strong>توضیحات:</strong> {{ ticket.CustomerText }}</p>
      </li>
    </ul>
    <div class="fab-button text bottom-center">
      <button @click.prevent="getCatagory" class="fab border-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <ion-icon name="add-outline" role="img" class="md hydrated"></ion-icon>
        افزودن جدید
      </button>
    </div>

    <!-- Modal -->
    <div class="modal" id="exampleModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">ثبت تیکت</h4>
            <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Your Form Goes Here -->
            <vee-form id="AddTicketForm" @submit="addTicket" :validation-schema="filterSchema">
              <div class="mb-3">
                <label for="Subject" class="form-label">درخواست</label>
                <vee-field name="Subject" type="text" class="form-control" />
                <ErrorMessage class="text-danger fs-6" name="Subject" />
              </div>
              <div class="mb-3">
                <label for="Comment" class="form-label">توضیحات</label>
                <vee-field name="Comment" as="textarea" class="form-control"></vee-field>
                <ErrorMessage class="text-danger fs-6" name="Comment" />
              </div>
              <div class="mb-3">
                <div class="form-group boxed">
                  <div class="input-wrapper">
                    <label for="Status" class="ms-1 mb-1">دسته</label>
                    <AppSelect :id="'sCategoryId'" :name="'CategoryId'" :label="'انتخاب دسته'" :options="catOp" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">بستن</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">ثبت</button>
              </div>
            </vee-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketApp from '@/components/TicketApp.vue';
import { mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'TicketAllView',
  data() {
    return {
      filterSchema: {
        Subject: 'required',
        Comment: 'required',
        CategoryId: 'required',
      },

      catOp: [],

      selectedTicketId: undefined,

      savedIdUrl: null,
    };
  },
  components: {
    TicketApp,
  },
  methods: {
    getTicketDetails(Id) {
      this.selectedTicketId = Id;
      this.savedIdUrl = Id;
      console.log('aaa');
    },
    async getCatagory() {
      const cmsTaskObj = {
        Type: 'SupportTicketing',
      };

      await this.$store.dispatch('Ws_GetCmsCatList', tikaUtils.serializeObject(cmsTaskObj));

      setTimeout(() => {
        const catJsonArr = [];
        this.AdvCmsCatResult.forEach((x) => {
          const catJson = {};
          catJson.value = x.Id;
          catJson.label = x.Title;
          catJsonArr.push(catJson);
        });
        this.catOp = catJsonArr;
      }, (2000));
    },
    async addTicket() {
      await this.$store.dispatch('WS_AddSupportTicketing', tikaUtils.serializeForm('AddTicketForm'));

      const getTicketTaskObj = {

      };
      await this.$store.dispatch('WS_GetSupportTicketingList', tikaUtils.serializeObject(getTicketTaskObj));
    },
  },
  computed: {
    ...mapState(['GetSupportTicketingListResult', 'AdvCmsCatResult']),
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      const getTicketTaskObj = {

      };
      await vm.$store.dispatch('WS_GetSupportTicketingList', tikaUtils.serializeObject(getTicketTaskObj));

      await vm.$store.dispatch('headerTitle', {
        center: 'تیکت ها',
        left: '<ion-icon name="share-outline"></ion-icon>',
        to: 'auth',
        right: 'goBack',
      }).then(() => {
      });

      const { TicketId } = vm.$route.query;
      // eslint-disable-next-line
      vm.savedIdUrl = TicketId;
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (!(to.query && to.query.TicketId)) {
      this.selectedTicketId = undefined;
    }
    next();
  },
  watch: {
    savedIdUrl(newVal) {
      if (newVal === this.$route.query.TicketId) {
        this.selectedTicketId = newVal;
        return;
      }

      this.$router.push({
        query: {
          TicketId: newVal,
        },
      });
    },
  },
};
</script>

<style scoped>
li {
  cursor: pointer;
}

p {
  color: rgb(99, 95, 95);
}
</style>
