<script setup lang="ts">
import { useCommonStore } from '@/stores/common'
import alertIcon from '@/assets/svg/alert.svg'
import EasyNotification from '@/components/custom/EasyNotification.vue'

let props = defineProps<{handler: () => void}>()
</script>

<template>
    <EasyNotification v-if="useCommonStore().notiShow">
        <template #header>
            <div class="noti-header">
                <img :src="alertIcon" id="noti-img" />
                <h2>{{ '删除' }}</h2>
            </div>
        </template>
        <template #content>
            <div class="noti-content">
                <div class="button-bar">
                    <button @click="props.handler">确认</button>
                    <button @click="useCommonStore().notiShow = false">取消</button>
                </div>
            </div>
        </template>
    </EasyNotification>

</template>

<style scoped lang="scss">
.noti-header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    img {
        width: 21px;
        margin-right: 15px;
    }

    h2 {
        font-size: 18px;
    }
}


.noti-content {
    display: flex;
    flex-direction: column;
    padding: 30px 50px;
    width: 320px;

    .button-bar {
        display: flex;
        align-items: center;
        justify-content: space-around;

        button {
            width: 100px;
        }
    }

}
</style>