<script setup lang="ts">
import MenuBar from '@/components/MenuBar.vue'
import homeMenu from '@/views/homeMenu'
import SystemHeader from '@/components/SystemHeader.vue'
</script>

<template>
  <div id="home-container">
    <div class="top-entry">
      <SystemHeader></SystemHeader>
    </div>
    <div class="content">
      <div class="left-entry">
        <MenuBar :menu-list="homeMenu"></MenuBar>
      </div>
      <div class="right-entry">
        <RouterView></RouterView>
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
