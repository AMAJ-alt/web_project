<template>
    <div class="appHeader bg-secondary">
        <div class="left">
            <router-link :to="{ name: 'home' }" class="headerButton">
                <ion-icon name="chevron-back-outline" class="text-white"></ion-icon>
            </router-link>
        </div>
        <div class="pageTitle">Logo</div>
        <div class="right">
            <router-link :to="{ name: 'auth' }" class="headerButton text-white">
                ورود/ ثبت نام
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: 'AppHeader',
};
</script>
