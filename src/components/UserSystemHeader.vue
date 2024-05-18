<script setup lang="ts">
import { useCommonStore } from '@/stores/common'
import { reactive } from 'vue';
import editIcon from '@/assets/svg/operation/edit.svg'
import menus from '@/views/userDropdownMenus'
import DropDown from './DropDown.vue';
import { userUpd } from '@/api/userApi'
import type { LoginData } from '@/api/manage/type';

let data = reactive({
    dropDownShow: false,
    inputValue: '',
    notiIcon: editIcon,
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

// let handleRenameUser = async () => {
//     let res = (await userUpd({ username: data.inputValue })).data
//     try {
//         (useCommonStore().loginData as LoginData).username = res.username
//             (useCommonStore().loginData as LoginData).avatar = res.avatar
//     } catch (e) {
//         console.log(e);

//     }
//     useCommonStore().notiShow = false
//     ElMessage({
//         type: 'success',
//         message: '修改昵称成功'
//     })
// }

let handleResetPs = async () => {
    let res = (await userUpd({ password: data.inputValue })).data
    try {
        if (useCommonStore().loginData) {
            let loginData = useCommonStore().loginData||{} as LoginData
            loginData.username = res.username
            loginData.avatar = res.avatar
            useCommonStore().loginData = loginData
        }
    } catch (e) {
        console.log(e);

    }
    useCommonStore().notiShow = false
    ElMessage({
        type: 'success',
        message: '修改密码成功'
    })
}
</script>

<template>
    <div id="header-container">
        <div class="left-entry">
            <h1>校运会报名系统</h1>
        </div>
        <div class="right-entry" @mouseenter="handleEnter" @mouseleave="handleLeave">
            <div class="avatar-box">
                <img :src="useCommonStore().loginData?.avatar || ''" />
            </div>
            <div id="name-entry">
                <h2>{{ useCommonStore().loginData?.username || '123' }}</h2>
            </div>
            <div class="dropdown-box" :dropdownShow="data.dropDownShow">
                <div id="inner">
                    <DropDown :menus="menus" v-if="data.dropDownShow" :updateShow="dropDownUpdate"></DropDown>
                </div>
            </div>
        </div>
    </div>
    <EasyNotification v-if="useCommonStore().notiShow">
        <template #header>
            <div class="noti-header">
                <img :src="data.notiIcon" id="noti-img" />
                <h2>{{ useCommonStore().notiTitle }}</h2>
            </div>
        </template>
        <template #content>
            <div class="noti-content">
                <div id="name-input">
                    <label for="name-box">{{ useCommonStore().labelValue }}</label>
                    <el-input v-model.number="data.inputValue" type="text" id="name-box" />
                </div>
                <div class="button-bar">
                    <button @click="handleResetPs">确认</button>
                    <button @click="useCommonStore().notiShow = false">取消</button>
                </div>
            </div>
        </template>
    </EasyNotification>
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
    padding: 15px 32px;

    #name-input {
        display: flex;
        align-items: center;
        margin-bottom: 36px;

        label {
            margin-right: 24px;
            width: 60px;
        }
    }

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