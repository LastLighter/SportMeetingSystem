<script setup lang="ts">
import { useCommonStore } from '@/stores/common'
import { reactive } from 'vue';
import menus from '@/views/dropdownMenus'

let data = reactive({
    dropDownShow: false,
})

//控制下拉菜单
let handleEnter = () => {
    data.dropDownShow = true
}
let handleLeave = () => {
    data.dropDownShow = false
}

let dropDownUpdate = (show: boolean) => {
    data.dropDownShow = show
}
</script>

<template>
    <div id="header-container">
        <div class="left-entry">
            <h1>校运会管理系统</h1>
        </div>
        <div class="right-entry" @mouseenter="handleEnter" @mouseleave="handleLeave">
            <div class="avatar-box">
                <img :src="useCommonStore().loginData?.avatar || ''" />
            </div>
            <div id="name-entry">
                <h2>{{ useCommonStore().loginData?.name || '123' }}</h2>
            </div>
            <div class="dropdown-box" :dropdownShow="data.dropDownShow">
                <div id="inner">
                    <DropDown :menus="menus" v-if="data.dropDownShow" :updateShow="dropDownUpdate"></DropDown>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#header-container {
    height: 80px;
    background-color: #B5E61D;
    color: #B97A57;
    border-bottom: 2px solid #e3e3e3;
    display: flex;
    justify-content: space-between;

    .left-entry {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 400px;

        h1 {
            font-size: 21px;
            font-weight: bold;
        }
    }

    .right-entry {
        margin-right: 120px;
        display: flex;
        align-items: center;
        cursor: default;

        .avatar-box {
            border-radius: 50%;
            // border: 2px solid #524152;
            height: 65px;
            width: 65px;
            overflow: hidden;
            display: flex;
            justify-content: center;

            img {
                width: auto;
                max-height: 100%;
            }
        }


        #name-entry {
            background-color: #e3e3e3;
            border-radius: 5px;
            padding: 8px 15px;
        }

        .dropdown-box {
            position: relative;

            #inner {
                position: absolute;
                z-index: 99;
                right: 0px;
                top: 18px;
            }
        }
    }
}
</style>