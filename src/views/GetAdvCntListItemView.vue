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
        <h3 class="mb-0">دیدگاه ها (3)</h3>
      </div>
      <div class="pt-2 pb-2">
        <!-- comment block -->
        <div class="comment-block">
          <!--item -->
          <div class="item">
            <div class="avatar">
              <img src="assets/img/sample/avatar/avatar1.jpg" alt="avatar" class="imaged w32 rounded">
            </div>
            <div class="in">
              <div class="comment-header">
                <h4 class="title">دیگو موراتا</h4>
                <span class="time">الان</span>
              </div>
              <div class="text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت.
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
            </div>
          </div>
          <!-- * item -->
          <!--item -->
          <div class="item">
            <div class="avatar">
              <img src="assets/img/sample/avatar/avatar3.jpg" alt="avatar" class="imaged w32 rounded">
            </div>
            <div class="in">
              <div class="comment-header">
                <h4 class="title">هنری ایتوندو</h4>
                <span class="time">05:50 PM</span>
              </div>
              <div class="text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت.
              </div>
              <div class="comment-footer">
                <a href="#" class="comment-button">
                  <ion-icon name="heart" class="text-danger"></ion-icon>
                  پسند (4)
                </a>
                <a href="#" class="comment-button">
                  <ion-icon name="chatbubble-outline"></ion-icon>
                  پاسخ
                </a>
              </div>
            </div>
          </div>
          <!-- * item -->
          <!--item -->
          <div class="item">
            <div class="avatar">
              <img src="assets/img/sample/avatar/avatar4.jpg" alt="avatar" class="imaged w32 rounded">
            </div>
            <div class="in">
              <div class="comment-header">
                <h4 class="title">چارملیتا مارشام</h4>
                <span class="time">20 مرداد 1401</span>
              </div>
              <div class="text">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت. لورم ایپسوم متن ساختگی با تولید سادگی
                نامفهوم از صنعت.
              </div>
              <div class="comment-footer">
                <a href="#" class="comment-button">
                  <ion-icon name="heart-outline"></ion-icon>
                  پسند (5)
                </a>
                <a href="#" class="comment-button">
                  <ion-icon name="chatbubble-outline"></ion-icon>
                  پاسخ
                </a>
              </div>
            </div>
          </div>
          <!-- * item -->
        </div>
        <!-- * comment block -->
      </div>
    </div>

    <div class="divider mt-2 mb-3"></div>

    <div class="section mt-2">
      <h3 class="mb-0">یک دیدگاه بنویسید</h3>
      <div class="pt-2 pb-2">
        <form>
          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <input type="text" class="form-control" id="name5" placeholder="نام">
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <input type="email" class="form-control" id="email5" placeholder="ایمیل">
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
            </div>
          </div>

          <div class="form-group boxed">
            <div class="input-wrapper">
              <label for="number" class="d-none"></label>
              <textarea id="comment" rows="4" class="form-control" placeholder="دیدگاه"></textarea>
              <i class="clear-input">
                <ion-icon name="close-circle"></ion-icon>
              </i>
            </div>
          </div>

          <div class="mt-1">
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              ارسال
            </button>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'GetAdvCntListItemView',
  data() {
    return {
      itemId: this.$route.params.id,
      itemType: this.$route.params.type,
    };
  },
  computed: {
    ...mapState(['AdvCntResult']),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.dispatch('WS_GetAdvCntList', tikaUtils.serializeEntry(vm.itemType, vm.itemId));

      vm.$store.dispatch('headerTitle', {
        center: 'بلاگ',
        left: '<ion-icon name="share-outline"></ion-icon>',
      }).then(() => {
      });
    });
  },
};
</script>
