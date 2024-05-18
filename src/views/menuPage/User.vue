<script setup lang="ts">
import type { EleOptions } from '@/api/component/type';
import EasyNotification from '@/components/custom/EasyNotification.vue'
import editIcon from '@/assets/svg/operation/edit.svg'
import addIcon from '@/assets/svg/operation/add.svg'
import { selKeyUser, selAllUser, delUser, updateUser } from '@/api/user'
import type { FormInstance } from 'element-plus';
import type { User, UserDto } from '@/api/user/type'
import { reactive, ref } from 'vue';
import type { College } from '@/api/college/type';
import { selAllCollege } from '@/api/college';
import type { PageInfo } from "@/api/common/type"
import PageSelector from '@/components/PageSelector.vue'
import DeleteNoti from '@/components/custom/DeleteNoti.vue'
import { useCommonStore } from '@/stores/common';

const PageSize = 10
let data: {
    tableData: UserDto[],
    searchText: string,
    notiShow: boolean,
    tempUser: User,
    notiIcon: string,
    notiTitle: string,
    notiState: number,//0表示新增，1表示编辑
    collegeOptions: EleOptions[],
    curPage:number,
    totalSize:number,
    tempSearchData:UserDto[],
    pageStatus:number,//0表示全部检索，1表示检索模糊查询的temp数据
    tempId:string,
} = reactive({
    tableData: [],
    searchText: '',
    notiShow: false,
    tempUser: {
        id: '',
        username: '',
        name: '',
        password: '',
        sex: '',
        collegeId: '',
        avatar: '',
    },
    notiIcon: '',
    notiTitle: '',
    notiState: 0,
    collegeOptions: [],
    curPage:0,
    totalSize:0,
    tempSearchData:[],
    pageStatus:0,
    tempId:'',
})
let load = async () => {
    let pageInfoRes:PageInfo<UserDto> = (await selAllUser(data.curPage, PageSize)).data
    data.totalSize = pageInfoRes.total
    let userRes: UserDto[] = pageInfoRes.list
    console.log(userRes);
    if (userRes) {
        data.tableData = userRes
    }
    let collegeRes: College[] = (await selAllCollege()).data
    if (collegeRes) {
        data.collegeOptions = []
        collegeRes.forEach((item) => {
            data.collegeOptions.push({value:item.id, label:item.name})
        })
    }
}
load()

let handleEdit = (row: User) => {
    data.tempUser = row
    data.notiTitle = '编辑项目'
    data.notiIcon = editIcon
    data.notiState = 1
    data.notiShow = true
}


let handleDelete = (row: User) => {
    useCommonStore().notiShow = true
    data.tempId = row.id
    load()
}

let doDelete = async() => {
    await delUser(data.tempId)
    useCommonStore().notiShow = false
    load()
}

let formRef = ref<FormInstance>();
let submitEdit = async (formEle: FormInstance | null) => {
    if (!formEle) return
    formEle.validate((valid) => {
        if (valid) {
            if (data.notiState == 1) {
                updateUser(data.tempUser)
                load()
            }
            data.notiShow = false
        } else {
            return false
        }
    })
}

let searchByNameOrTypeOrPlace = async () => {
    if (data.searchText == '') {
        data.pageStatus = 1
        load()
        return
    }
    let v1 = (await selKeyUser(data.searchText, null, null)).data
    let v2 = (await selKeyUser(null, data.searchText, null)).data
    let v3 = (await selKeyUser(null, null, data.searchText)).data
    data.tableData = []
    if(v1?.length||0 + v2?.length||0 + v3?.length||0 < PageSize){
        if(v1)
        data.tableData.push(...v1)
        if(v2)
        data.tableData.push(...v2)
        if(v3)
        data.tableData.push(...v3)
    }else {
        data.pageStatus = 1
        data.tempSearchData.push(...v1)
        data.tempSearchData.push(...v2)
        data.tempSearchData.push(...v3)
        data.tableData.push(...data.tempSearchData.slice(0,PageSize))
    }
}

let pageUpdate = (pageNum:number) => {
    data.curPage = pageNum
    if(data.curPage == 0){
        load()
    }else if(data.curPage == 1){
        data.tableData = []
        data.tableData.push(...data.tempSearchData.slice((data.curPage - 1)*PageSize,data.curPage*PageSize))
    }
}
</script>

<template>
    <div id="user-container">
        <div class="top">
        </div>
        <div class="table">
            <el-table :data="data.tableData">
                <el-table-column label="Id" prop="id" />
                <el-table-column label="姓名" prop="name" />
                <el-table-column label="昵称" prop="username" />
                <el-table-column label="密码" prop="password" />
                <el-table-column label="性别" prop="sex" />
                <el-table-column label="学院" prop="college" />
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="data.searchText" size="small" placeholder="Type to search"
                            @keyup.enter="searchByNameOrTypeOrPlace" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-selector">
            <PageSelector :page="data.curPage" :pageSize="PageSize" :total="data.totalSize" :pageUpdate="pageUpdate"></PageSelector>
        </div>
    </div>

    <EasyNotification v-if="data.notiShow">
        <template #header>
            <div class="noti-header">
                <img :src="data.notiIcon" id="noti-img" />
                <h2>{{ data.notiTitle }}</h2>
            </div>
        </template>
        <template #content>
            <div class="noti-content">
                <el-form ref="formRef" style="max-width: 600px" :model="data.tempUser" label-width="auto">
                    <el-form-item label="名称" prop="name" :rules="[
                { required: true, message: 'name is required' },
            ]">
                        <el-input v-model.number="data.tempUser.name" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="昵称" prop="username" :rules="[
                { required: true, message: 'number is required' },
            ]">
                        <el-input v-model.number="data.tempUser.username" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" :rules="[
                { required: true, message: 'type is required' },
            ]">
                        <el-input v-model.number="data.tempUser.sex" type="text" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="学院" prop="collegeId" :rules="[
            ]">
                        <el-select v-model="data.tempUser.collegeId" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in data.collegeOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <div class="form-operation-box">
                            <el-button type="success" @click="submitEdit(formRef)">确认</el-button>
                            <el-button type="info" @click="data.notiShow = false">取消</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </template>
    </EasyNotification>

    <DeleteNoti :handler="doDelete"></DeleteNoti>
</template>

<style scoped lang="scss">
#user-container {
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
    .page-selector{
        margin-top: 25px;
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