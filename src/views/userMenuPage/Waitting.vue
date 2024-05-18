<script setup lang="ts">
import { delRegister } from '@/api/register';
import type { RegisterDto } from '@/api/register/type';
import { delUserReg, selUserReg } from '@/api/userApi';
import { useCommonStore } from '@/stores/common';
import { reactive } from 'vue';


let data: {
    tableData: RegisterDto[],
    searchText: string,
} = reactive({
    tableData: [],
    searchText: '',
})
let load = async () => {
    let registerRes: RegisterDto[] = (await selUserReg(useCommonStore().loginData?.id || '')).data
    if (registerRes) {
        data.tableData = registerRes
    }
}
load()


let statusMap = (row: RegisterDto) => {
    return row.status == '0' ? '预赛' : '决赛'
}
let reviewMap = (row: RegisterDto) => {
    return row.review == '0' ? '未审核' : '通过'
}

let handleDelete = async(row: RegisterDto) => {
    let res = await delUserReg(row.id)
    load()
    if(res && res.code == '200')
    ElMessage({
        type: 'success',
        message: '取消报名成功'
    })
}
</script>

<template>
    <div id="watting-container">
        <el-table :data="data.tableData">
            <el-table-column label="Id" prop="id" />
            <el-table-column label="用户" prop="user" />
            <el-table-column label="项目" prop="sport" />
            <el-table-column label="分组" prop="groups" />
            <el-table-column label="赛道" prop="track" />
            <el-table-column label="状态" prop="status" :formatter="statusMap" />
            <el-table-column label="审核" prop="review" :formatter="reviewMap" />
            <el-table-column label="标记" prop="brand" />
            <el-table-column align="right">
                <template #header>
                    <h2>操作</h2>
                </template>
                <template #default="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                        取消报名
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped lang="scss"></style>