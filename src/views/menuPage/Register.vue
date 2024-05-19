<script setup lang="ts">
import { delRegister, selAllRegister, updateRegister, selKeyRegister } from '@/api/register'
import type { Register, RegisterDto } from '@/api/register/type';
import { reactive, ref } from 'vue';
import EasyNotification from '@/components/custom/EasyNotification.vue'
import editIcon from '@/assets/svg/operation/edit.svg'
import type { FormInstance } from 'element-plus';
import type { EleOptions } from '@/api/component/type'
import { getAllSports } from '@/api/sports';
import type { SportDto } from '@/api/sports/type';
import type { PageInfo } from "@/api/common/type";
import PageSelector from '@/components/PageSelector.vue';

const PageSize = 10
let data: {
    tableData: RegisterDto[],
    notiShow: boolean,
    tempRegister: Register,
    notiIcon: string,
    notiTitle: string,
    notiState: number,//0表示新增，1表示编辑
    psRequired: boolean,
    sportOptions: EleOptions[],
    statusOptions: EleOptions[],
    reviewOptions: EleOptions[],
    curPage:number,
    totalSize:number,
    tempSearchData:RegisterDto[],
    pageStatus:number,//0表示全部检索，1表示检索模糊查询的temp数据
    searchText:string,
} = reactive({
    tableData: [],
    notiShow: false,
    tempRegister: {
        id: '',
        userId: '',
        sportId: '',
        push: '',//是否推送过
        groups: null,//分组
        track: null,//赛道
        status: '',//出复赛
        review: '',//审核
        brand: null,//标记，不能添加
    },
    notiIcon: '',
    notiTitle: '',
    notiState: 0,
    psRequired: false,
    sportOptions:[],
    statusOptions: [{label:'预赛', value:'0'}, {label:'决赛', value:'1'}],
    reviewOptions: [{label:'未通过', value:'0'}, {label:'通过', value:'1'}],
    curPage:1,
    totalSize:0,
    tempSearchData:[],
    pageStatus:0,
    searchText:'',
})
let load = async () => {
    let pageInfoRes: PageInfo<RegisterDto> = (await selAllRegister(data.curPage, PageSize)).data
    let registerRes: RegisterDto[] = pageInfoRes.list
    data.totalSize = pageInfoRes.total
    console.log(registerRes);
    if (registerRes) {
        data.tableData = registerRes
    }
    //load sport
    let sportRes: SportDto[] = (await getAllSports()).data
    if (sportRes) {
        sportRes.forEach((item) => {
            data.sportOptions.push({value:item.id, label:item.name})
        })
    }
}
load()

let handleEdit = (row: Register) => {
    data.tempRegister = { ...row }
    data.notiTitle = '编辑项目'
    data.notiIcon = editIcon
    data.notiState = 1
    data.psRequired = false
    data.notiShow = true
}


let handleDelete = (row: Register) => {
    delRegister(row.id)
    load()
}

let formRef = ref<FormInstance>();
let submitEdit = async (formEle: FormInstance | null) => {
    if (!formEle) return
    formEle.validate((valid) => {
        if (valid) {
            updateRegister(data.tempRegister)
            load()
            data.notiShow = false
        } else {
            return false
        }
    })
}

let statusMap =(row:RegisterDto) => {
    return row.status == '0'?'预赛':'决赛'
}
let reviewMap =(row:RegisterDto) => {
    return row.review == '0'?'未审核':'通过'
}

let searchByUserOrSportName =async () => {
    if(data.searchText == ''){
        data.pageStatus = 0
        load()
        return
    }
    let v1 = (await selKeyRegister(data.searchText, null)).data
    let v2 = (await selKeyRegister(null, data.searchText)).data
    data.tableData = []
    if(v1?.length||0 + v2?.length||0 < PageSize){
        if(v1)
            data.tableData.push(...v1)
        if(v2)
            data.tableData.push(...v2)
    }else {
        data.pageStatus = 1
        data.tempSearchData.push(...v1)
        data.tempSearchData.push(...v2)
        data.tableData.push(...data.tempSearchData.slice(0,PageSize))
    }
}

let pageUpdate = (pageNum:number) => {
    data.curPage = pageNum
    if(data.pageStatus == 0){
        load()
    }else if(data.pageStatus == 1){
        data.tableData = []
        data.tableData.push(...data.tempSearchData.slice((data.curPage - 1)*PageSize,data.curPage*PageSize))
    }
}
</script>

<template>
    <div id="project-container">
        <div class="top">
        </div>
        <div class="table">
            <el-table :data="data.tableData">
                <el-table-column label="Id" prop="id" />
                <el-table-column label="用户" prop="user" />
                <el-table-column label="项目" prop="sport" />
                <el-table-column label="分组" prop="groups" />
                <el-table-column label="赛道" prop="track" />
                <el-table-column label="状态" prop="status" :formatter="statusMap"/>
                <el-table-column label="审核" prop="review" :formatter="reviewMap"/>
                <el-table-column label="标记" prop="brand"/>
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="data.searchText" size="small" placeholder="Type to search" @keyup.enter="searchByUserOrSportName" />
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
            <PageSelector :page="data.curPage" :pageSize="PageSize" :total="data.totalSize" @pageUpdate="pageUpdate"></PageSelector>
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
                <el-form ref="formRef" style="max-width: 600px" :model="data.tempRegister" label-width="auto">
                    <el-form-item label="项目" prop="sportId" :rules="[
            ]">
                        <el-select v-model="data.tempRegister.sportId" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in data.sportOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="status" :rules="[
                { required: true, message: 'status is required' },
            ]">
                        <el-select v-model="data.tempRegister.status" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in data.statusOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核" prop="review" :rules="[
                { required: true, message: 'review is required' },
            ]">
                        <el-select v-model="data.tempRegister.review" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in data.reviewOptions" :key="item.value" :label="item.label"
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