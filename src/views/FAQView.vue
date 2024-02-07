<template>
  <div id="appCapsule">
    <div class="section full mt-2">
      <div class="section-title">سوالات متداول</div>

      <div class="accordion" id="accordionExample1">
        <div class="accordion-item" v-for="sample in AdvCntSmp" :key="sample.Id">
          <h2 class="accordion-header">
            <button v-html="sample.Title" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              :data-bs-target="`#samp${sample.Id}`">
            </button>
          </h2>
          <div :id="`samp${sample.Id}`" class="accordion-collapse collapse" data-bs-parent="#accordionExample1">
            <div class="accordion-body" v-html="sample.Brief">
            </div>
          </div>
        </div>
      </div><br>
      <div class="section full mt-2" id="askUs">
        <div class="section-title">سوالتان را بپرسید *</div>
        <div class="wide-block pt-2 pb-2">
          <vee-form @submit="addFAQ" :validation-schema="faqSchema" id="AddFAQForm">
            <div class="form-group boxed">
              <div class="input-wrapper">
                <label for="" class="d-none"></label>
                <vee-field type="text" class="form-control" name="Subject" placeholder="موضوع" />
                <ErrorMessage class="text-danger fs-6" name="Subject" />
              </div>
            </div>

            <div class="form-group boxed">
              <div class="input-wrapper">
                <label for="" class="d-none"></label>
                <vee-field type="email" class="form-control" name="Email" placeholder="ایمیل" />
                <ErrorMessage class="text-danger fs-6" name="Email" />
              </div>
            </div>

            <div class="form-group boxed">
              <div class="input-wrapper">
                <label for="" class="d-none"></label>
                <vee-field name="Comment" rows="4" class="form-control" placeholder="پیام"></vee-field>
                <ErrorMessage class="text-danger fs-6" name="Comment" />
              </div>
            </div>

            <div class="form-group boxed d-none">
              <div class="input-wrapper">
                <label for="" class="d-none"></label>
                <vee-field type="text" class="form-control" name="CategoryId" placeholder="ایمیل" />
                <ErrorMessage class="text-danger fs-6" name="CategoryId" />
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

      <!-- <ul class="listview image-listview">
      <li v-for="HLink in HLinkListResult" :key="HLink.GUID">
        <a href="#" class="d-flex justify-content-between">
          <div class="col-auto">
            <img :src="HLink.ImageUrl" alt="Your Image" class="custom-img">
          </div>
          <div class="col-auto">
            <button class="btn btn-primary custom-button">{{ HLink.Title }}</button>
          </div>
        </a>
      </li>
    </ul> -->
      <!-- <div class="section full  mb-2">
    <div class="accordion" id="contact-acor">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button @click.prevent="contactsmp" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#accordionContact">
            چگونه می توانم با شما تماس بگیرم؟
          </button>
        </h2>
        <div id="accordionContact" class="accordion-collapse collapse" data-bs-parent="#contact-acor">
          <div class="accordion-body">
            {{ AdvCntSmp.Content }}
          </div>
        </div>
      </div>
    </div> -->
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import tikaUtils from '../assets/js/tikaUtils';

export default {
  name: 'FAQView',
  data() {
    return {
      faqSchema: {
        Subject: 'min:3|max:100',
        Comment: 'required|min:3|max:100',
        Email: 'email',
        CategoryId: '',
      },
      Type: 'FAQ',
      Param_SimpleMode: 'false',
      Param_ContentWithHTML: 'true',
    };
  },
  computed: {
    ...mapState(['AdvCntSmp', 'HLinkListResult']),
  },
  methods: {
    async addFAQ() {
      await this.$store.dispatch('WS_AddFAQ', tikaUtils.serializeForm('AddFAQForm'));

      const smpTaskObj = {
        Type: 'FAQ',
        Param_SimpleMode: 'false',
        Param_ContentWithHTML: 'true',
      };
      this.$store.dispatch('WS_GetSmpCntList', tikaUtils.serializeObject(smpTaskObj));
    },
    contactsmp() {
      // this.Type = 'ContactUsText';
      // this.$store.dispatch('WS_GetSmpCntList', tikaUtils.serializeSmpCnt(this.Type, this.Param_SimpleMode, this.Param_ContentWithHTML));
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (navigator.onLine) {
        const smpTaskObj = {
          Type: 'FAQ',
          Param_SimpleMode: 'false',
          Param_ContentWithHTML: 'true',
        };
        vm.$store.dispatch('WS_GetSmpCntList', tikaUtils.serializeObject(smpTaskObj));

        const hLinkTaskObj = {
          Type: 'certificate',
        };
        vm.$store.dispatch('WS_GetHLinkList', tikaUtils.serializeObject(hLinkTaskObj));
      } else {
        const data = JSON.parse(localStorage.getItem('smp'));
        vm.$store.dispatch('changeValue', {
          data,
          property: 'AdvCntSmp',
        });
      }

      vm.$store.dispatch('headerTitle', {
        center: 'سوالات متداول',
        // left: '<ion-icon name="mail-outline" role="img" class="md hydrated" aria-label="mail outline"></ion-icon>',
        // to: '',
        right: 'goBack',
      }).then(() => {
      });
    });
  },
};
</script>

<style>
.custom-img {
  width: 55px;
}

.custom-button {
  width: 170px;
}
</style>
