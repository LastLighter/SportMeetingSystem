<script setup lang="ts">
import { ref, reactive } from 'vue'
import mainIcon from '@/assets/img/main.jpg'
import userIcon from '@/assets/svg/user.svg'
import psIcon from '@/assets/svg/password.svg'
import editIcon from '@/assets/svg/operation/edit.svg'
import collegeIcon from '@/assets/svg/menu/college.svg'
import { useCommonStore } from '@/stores/common'
import router from '@/router';
import returnIcon from '@/assets/svg/operation/return.svg'
import { userLogin, userLogon } from '@/api/userApi'
import type { User } from '@/api/user/type'
import type { EleOptions } from '@/api/component/type'
import { selAllCollege } from '@/api/college'
import type { College } from '@/api/college/type'

//用于在登录和注册之间切换，0表示登录，1表示注册,2表示重置密码
let status = ref<number>(0)

let title = ref<string>('用户登录')
let data: {
    user: User,
    collegeOptions: EleOptions[],
} = reactive({
    user: {
        id: '',
        name: '',
        username: '',
        password: '',
        collegeId: '',
        avatar: '',
        sex: '',
    },
    collegeOptions: []
})

let login = async () => {
    let loginRes = (await userLogin(data.user.username, data.user.password)).data
    if (loginRes) {
        console.log(loginRes);

        useCommonStore().loginData = loginRes
        localStorage.setItem('userInfo', JSON.stringify(loginRes))
        ElMessage({
            type: 'success',
            message: '登陆成功'
        })
        console.log('111');
        
        router.push('/user')
        return
    }
    ElMessage({
        type: 'error',
        message: '登陆失败，请检查账号密码错误'
    })
}

let userRegister = () => {
    userLogon(data.user)
    status.value = 0
}

let load = async () => {
    //load referee
    let collegeRes: College[] = (await selAllCollege()).data
    if (collegeRes) {
        collegeRes.forEach((item) => {
            data.collegeOptions.push({ value: item.id, label: item.name })
        })
    }
}
load()
</script>

<template>
    <div class="root">
        <img class="background" :src="mainIcon" />
        <div class="login-component">
            <div class="header-box">
                <div class="return-box" @click="status = 0" v-if="status == 1">
                    <img :src="returnIcon" />
                </div>
            </div>

            <form class="form" @submit.prevent="login">
                <div class="title-box">
                    <h1 class="title">{{ title }}</h1>
                </div>
                <div class="nick-name-box input-box">
                    <label class="label-text" for="nick-name-input">
                        <img :src="userIcon" class="input-icon" />
                    </label>
                    <input type="text" autocomplete="current-nickName" class="text-input" id="nick-name-input"
                        v-model="data.user.username" placeholder="请输入学号" />
                </div>
                <div class="ps-box input-box">
                    <label class="label-text" for="ps-input">
                        <img :src="psIcon" class="input-icon" />
                    </label>
                    <input type="password" autocomplete="current-password" class="text-input" id="ps-input"
                        v-model="data.user.password" placeholder="请输入密码" />
                </div>

                <div class="input-box" v-if="status == 1">
                    <label class="label-text" for="college-input">
                        <img :src="collegeIcon" class="input-icon" />
                    </label>

                    <el-select v-model="data.user.collegeId" placeholder="Select" id="college-input" style="width: 240px">
                        <el-option v-for="item in data.collegeOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>

                <div class="input-box" v-if="status == 1">
                    <label class="label-text" for="name-input">
                        <img :src="editIcon" class="input-icon" />
                    </label>
                    <input type="text" class="text-input" id="name-input" v-model="data.user.name"
                        placeholder="请输入真实姓名" />
                </div>

                <div id="radio-box" v-if="status == 1">
                    <h2>
                        性别
                    </h2>

                    <input type="radio" id="male" name="gender" value="男" v-model="data.user.sex">
                    <label for="male">男</label>

                    <input type="radio" id="female" name="gender" value="女" v-model="data.user.sex">
                    <label for="female">女</label>
                </div>

                <div class="submit-box login-box" v-if="status == 0">
                    <button type="submit" class="form-button">登录</button>
                </div>
                <div class="register-box submit-box" v-if="status == 0">
                    <a class="form-button" @click="status = 1">用户注册</a>
                </div>
                <div class="register-box submit-box" v-if="status == 1">
                    <a class="form-button" @click="userRegister">注册</a>
                </div>
            </form>

        </div>
    </div>
</template>

<style scoped lang="scss">
.background {
    z-index: -1;
    position: absolute;
    width: 100vw;
}

.login-component {
    position: absolute;
    left: 40vw;
    top: 200px;
    background-color: #B97A57;
    width: 500px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 15px;
    border: 6px solid #fff;
    box-shadow: 2px 2px 12px #535353;
    padding: 50px 20px;

    .header-box {
        height: 30px;
        width: 100%;
        display: flex;
        justify-content: left;

        .return-box {
            height: 26px;
            width: 26px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            background-color: #f3f3f3;
            border: 2px solid #f3f3f3;

            img {
                width: 21px;
                cursor: pointer;
                position: relative;
                left: -80px;
                filter: drop-shadow(#524641 80px 0);
            }
        }

        .return-box:hover {
            background-color: #524641;

            img {
                filter: drop-shadow(#f3f3f3 80px 0);
            }
        }
    }

    .title-box {
        display: flex;
        justify-content: center;
        margin-bottom: 40px;

        .title {
            font-size: 1.6rem;
            font-weight: 650;
            color: #333333;
            cursor: default;
        }
    }


    .input-box {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        border-radius: 15px;
        border: 3px solid #535353;
        height: 50px;
        width: 320px;
        padding: 0px 30px;
        background-color: #f3f3f3;
        color: #524641;
        transition: all 0.3s ease;

        .label-text {
            margin-right: 20px;
            overflow: hidden;
            min-width: 30px;

            .input-icon {
                width: 20px;
            }
        }

        .text-input {
            height: 30px;
            flex-grow: 1;
            font-size: 15px;
            font-weight: 620;
            background-color: transparent !important;
            border: none;
            color: inherit;
        }

        #code-input {
            width: 100px;
        }

        .check-icon {
            width: 100px;
            height: 50px;

            img {
                width: 100px;
            }
        }

        .send-check-code {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            width: 100px;
            height: 40px;
            border: 3px solid #524641;
            border-radius: 5px;
            background-color: #f3f3f3;
            color: #333333;
            cursor: pointer;
        }
    }

    #radio-box {
        display: flex;

        h2 {
            margin-right: 36px;
        }

        input {
            transform: scale(1.8);
            margin-right: 12px;
        }

        label {
            margin-right: 42px;
        }
    }

    #code-box {
        margin-bottom: 10px;
    }

    .contract-check-box {
        display: flex;
        align-items: center;

        .contract-box {
            width: 20px;
            height: 20px;
            border: 4px solid #524641;
            border-radius: 4px;
        }

        .contract-name {
            color: #1C84FF;
        }
    }

    .input-box:hover {
        border: 3px solid #f3f3f3;
        background-color: #333333;
        color: #f3f3f3;

        .input-icon {
            position: relative;
            left: -80px;
            filter: drop-shadow(#00A2E8 80px 0);
        }

        .text-input {
            color: #f3f3f3;
        }

        .send-check-code {
            border: 3px solid #f3f3f3;
            background-color: #524641;
            color: #f3f3f3;
        }
    }

    .login-box {
        margin-top: 40px;
    }

    .reset-box {
        margin-top: 40px;
    }

    i {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .submit-box {
        display: flex;
        justify-content: center;
        width: 100%;

        .form-button {
            font-weight: 620;
            cursor: pointer;
            width: 100%;
            border: 3px solid #535353;
            border-radius: 10px;
            height: 52px;
            box-sizing: border-box;
            background-color: #f3f3f3;
            transition: all 0.3s ease;
        }

        .form-button:hover {
            border: 3px solid #f3f3f3;
            background-color: #333333;
            color: #f3f3f3;
        }

        a{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }
    }

    .register-box {
        margin-top: 35px;
    }

    .retrieve-box {
        margin-top: 30px;
        color: #524641;
        cursor: pointer;
        font-weight: 620;
    }

    .retrieve-box:hover {
        text-decoration: underline;
        color: #f3f3f3;
    }
}
</style>