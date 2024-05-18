<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue'
import userHomeMenu from '@/views/userHomeMenu'
import UserSystemHeader from '@/components/UserSystemHeader.vue'
</script>

<template>
  <div id="home-container">
    <div class="top-entry">
      <UserSystemHeader></UserSystemHeader>
    </div>
    <div class="content">
      <div class="left-entry">
        <MenuBar :menu-list="userHomeMenu"></MenuBar>
      </div>
      <div class="right-entry">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#home-container{
  .top-entry{
    margin-bottom: 20px;
  }
  .content{
    display: flex;
    .left-entry{
      width: 240px;
    }
    .right-entry{
      padding: 21px 32px;
      flex-grow: 1;
    }
  }
}
</style>
