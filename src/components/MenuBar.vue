<script setup lang="ts">
import type { Menu } from '@/api/component/type'
import router from '@/router';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{ menuList: Menu[] }>()
const emit = defineEmits<{
    select: [index: number]
}>()
let curFocus = ref<number>(0)
let clickHandler = (num: number) => {
    curFocus.value = num
    if(props.menuList[num].menuRoute){
        router.push(props.menuList[num].menuRoute||'')
    }
    emit('select',num)
}

onMounted(() => {
    if(useRoute().meta.menuId){
        let count = 0
        props.menuList.forEach((item) => {
            if(item.menuId == useRoute().meta.menuId){
                curFocus.value = count
                emit('select',count)
            }
            ++count
        })
    }
})
</script>

<template>
    <div class="menu-bar">
        <div class="menu-box" v-for="(item, index) in props.menuList" @click="clickHandler(index)"
            :class="{ 'menu-active': curFocus == index }">
            <div class="img-wrapper">
                <img :src="item.menuIcon" />
            </div>
            <h4>{{ item.menuName }}</h4>
        </div>
    </div>
</template>

<style scoped lang="scss">
.menu-bar {
    padding: 40px 25px;
    border-right: 1px solid #e3e3e3;
    box-sizing: border-box;
    height: 100%;

    .menu-box {
        display: flex;
        align-items: center;
        padding: 14px 25px;
        cursor: pointer;
        border-radius: 7px;
        margin-bottom: 15px;

        // background-color: #e3e3e3;
        .img-wrapper {
            width: 21px;
            height: 21px;
            margin-right: 25px;

            img {
                width: 100%;
                position: relative;
                left: -80px;
                filter: drop-shadow(#524137 80px 0);
            }
        }

        h4 {
            font-size: 13px;
        }
    }

    .menu-box:hover {
        background-color: #52413718;
    }

    .menu-active {
        background-color: #52413712;
        h4 {
            color: #00A2E8;
        }

        .img-wrapper {
            img {
                filter: drop-shadow(#00A2E8 80px 0);
            }
        }
    }
}
</style>