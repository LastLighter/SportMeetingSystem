<script setup lang="ts">
import type { Sport, SportDto } from '@/api/sports/type';
import { reactive, ref } from 'vue';
import { selUserSport } from '@/api/userApi';
import { userRegister, selUserKeySport } from '@/api/userApi';
import { useCommonStore } from '@/stores/common';

let data: {
    tableData: SportDto[],
    searchText: string,
} = reactive({
    tableData: [],
    searchText: '',
})
let load = async () => {
    let sportRes: SportDto[] = (await selUserSport()).data
    console.log(sportRes);
    if (sportRes) {
        data.tableData = sportRes
    }
}
load()

let handleRegister = async(row: SportDto) => {
    let res = await userRegister(row.id, useCommonStore().loginData?.id || '')
    if(res && res.code == '200')
    ElMessage({
        type: 'success',
        message: '报名成功'
    })
}

let selByName = async() => {
    if(data.searchText == ''){
        load()
    }
    let res = (await selUserKeySport(data.searchText)).data
    data.tableData = res
}
</script>

<template>
    <div id="project-container">
        <div class="table">
            <el-table :data="data.tableData">
                <el-table-column label="Id" prop="id" />
                <el-table-column label="姓名" prop="name" />
                <el-table-column label="报名上限" prop="number" />
                <el-table-column label="性别" prop="type" />
                <el-table-column label="时间" prop="time" />
                <el-table-column label="地点" prop="place" />
                <el-table-column label="裁判" prop="referee" />
                <el-table-column label="结束时间" prop="endTime" />
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="data.searchText" size="small" placeholder="Type to search" @keyup.enter="selByName"/>
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="handleRegister(scope.row)">
                            报名
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>

<style scoped lang="scss">
#project-container {
    width: 100%;

    .top {
        margin-bottom: 15px;

        #add-button {
            .img-wrapper {
                margin-right: 18px;

                #add-icon {
                    width: 21px;
                }
            }
        }

        #add-button:hover {
            .img-wrapper {
                #add-icon {
                    filter: drop-shadow(#52413750 80px 0);
                }
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
    width: 300px;
    padding: 21px 32px;

    .form-operation-box {
        width: 100%;
        display: flex;
        justify-content: center;

        button:first-child {
            margin-right: 50px;
        }
    }
}
</style>