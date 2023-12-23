<template>
  <div class="mt-2" v-for="item in AdvCntResult" :key="item.id">
    <div class="blog-post">
      <div class="d-flex justify-content-center">
        <img :src="item.ImageUrl" alt="image" class="imaged w-50 rounded-2">
      </div>
      <hr>
      <h1 class="title">{{ item.Title }}</h1>

      <div class="post-header">
        <div>
          <a href="#">
            {{ item.CreatorFullName }}
          </a>
        </div>
        {{ item.PublishDateStr }}
      </div>
      <div class="post-body" v-html="item.Content"></div>
    </div>

    <div class="section mt-4">
      <button type="button" class="btn btn-outline-primary btn-block" data-bs-toggle="offcanvas"
        data-bs-target="#actionSheetShare">
        <ion-icon name="share-outline"></ion-icon>
        این نوشته را به اشتراک بگذارید
      </button>
    </div>

    <div class="divider mt-4 mb-3"></div>

    <div class="section">
      <div class="section-title mb-1">
        <h3 class="mb-0">دیدگاه ها ({{ AdvCommentMeta.total }})</h3>
      </div>
      <div class="pt-2 pb-2">
        <!-- comment block -->
        <div class="comment-block">
          <!--item -->
          <div v-for="comment in AdvCommentResult" :key="comment.Id" class="item">
            <div class="avatar">
              <img src="../assets/guest_img.jpg" alt="avatar" class="imaged w32 rounded">
            </div>
            <div class="in">
              <div class="comment-header">
                <h4 class="title">{{ comment.SenderStr }}</h4>
                <span class="time">{{ comment.SendDateStr }}</span>
              </div>
              <div class="text">
                {{ comment.Content }}
              </div>
              <div class="comment-footer">
                <a href="#" class="comment-button">
                  <ion-icon name="heart-outline"></ion-icon>
                  پسند (523)
                </a>
                <a href="#" class="comment-button">
                  <ion-icon name="chatbubble-outline"></ion-icon>
                  پاسخ
                </a>
              </div>
              <ul class="list-unstyled" v-if="comment.ResponseText">
                <li class="media mt-4">
                  <div class="media-body">
                    <h5 class="mt-0">
                      <img src="../assets/admin_img.jpg" class="imaged w32 rounded mx-2" alt="User Avatar">
                      Admin
                    </h5>
                    <p>{{ comment.ResponseText }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- * item -->
        </div>
        <!-- * comment block -->

        <nav>
          <ul class="pagination mt-4">
            <li v-show="this.pageVal > 1" class="page-item"><button @click.prevent="prevPage"
                class="page-link">قبل</button>
            </li>

            <li v-for="(page, index) in pagination" :key="page" class="page-item">
              <option class="page-link" @click="selectOption(index + 1)" :value="index + 1">
                {{ index + 1 }}
              </option>
            </li>

            <li class="page-item"><button @click.prevent="nextPage" class="page-link">بعد</button></li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="divider mt-2 mb-3"></div>

    <div class="section mt-2">
      <h3 class="mb-0">یک دیدگاه بنویسید</h3>
      <div class="pt-2 pb-2">
        <vee-form @submit="AddComment" :validation-schema="commentSchema">

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <vee-field as="textarea" name="comment" rows="4" class="form-control" placeholder="دیدگاه"></vee-field>
              <ErrorMessage class="text-danger fs-6" name="comment" />
            </div>
          </div>

          <div class="mt-1">
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              ارسال
            </button>
          </div>

        </vee-form>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'AdvCntView',
  data() {
    return {
      commentSchema: {
        comment: 'required',
      },
      pageVal: 0,
      pagination: 0,

      itemId: this.$route.params.id,
      itemType: this.$route.params.type,
    };
  },
  methods: {
    async AddComment(value) {
      console.log(value);
      const adCmmtaskObj = {
        Type: this.$route.params.type,
        RelId: this.$route.params.id,
        Comment: value.comment,
      };
      await this.$store.dispatch('WS_AddComment', tikaUtils.serializeObject(adCmmtaskObj));

      const cmmTaskObj = {
        Type: this.$route.params.type,
        RelId: this.$route.params.id,
        CurrPage: '1',
        MaxNo: '3',
      };
      await this.$store.dispatch('WS_GetCommensList', tikaUtils.serializeObject(cmmTaskObj));
    },
    async callWS() {
      const cmmTaskObj = {
        Type: this.$route.params.type,
        RelId: this.$route.params.id,
        CurrPage: this.pageVal,
        MaxNo: '3',
      };
      await this.$store.dispatch('WS_GetCommensList', tikaUtils.serializeObject(cmmTaskObj));
    },
    async prevPage() {
      this.pageVal -= 1;
      console.log(this.pageVal);
      setTimeout(() => {
        this.callWS();
      }, 200);
    },
    async nextPage() {
      this.pageVal += 1;
      console.log(this.pageVal);
      setTimeout(() => {
        this.callWS();
      }, 200);
    },
    async selectOption(val) {
      this.pageVal = val;
      setTimeout(() => {
        this.callWS();
      }, 200);
    },
  },
  computed: {
    ...mapState(['AdvCntResult', 'AdvCommentResult', 'AdvCommentMeta']),
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      const cntTaskObj = {
        Type: vm.$route.params.type,
        Id: vm.$route.params.id,
      };
      await vm.$store.dispatch('WS_GetAdvCntList', tikaUtils.serializeObject(cntTaskObj));

      const cmmTaskObj = {
        Type: vm.$route.params.type,
        RelId: vm.$route.params.id,
        CurrPage: '1',
        MaxNo: '3',
      };
      await vm.$store.dispatch('WS_GetCommensList', tikaUtils.serializeObject(cmmTaskObj));
      // eslint-disable-next-line
      vm.pagination = Math.ceil(vm.AdvCommentMeta.total / vm.AdvCommentMeta.perpage);

      console.log(vm.pagination);

      await vm.$store.dispatch('headerTitle', {
        center: 'بلاگ',
        left: '<ion-icon name="share-outline"></ion-icon>',
      }).then(() => {
      });
    });
  },
};
</script>
