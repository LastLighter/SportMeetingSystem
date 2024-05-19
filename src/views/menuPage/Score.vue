<script setup lang="ts">
import { addScore, delScore, selAllScore, updateScore } from '@/api/score'
import type { Score, ScoreDto } from '@/api/score/type';
import { reactive, ref } from 'vue';
import EasyNotification from '@/components/custom/EasyNotification.vue'
import editIcon from '@/assets/svg/operation/edit.svg'
import addIcon from '@/assets/svg/operation/add.svg'
import type { FormInstance } from 'element-plus';
import type { EleOptions } from '@/api/component/type';
import { getAllSports } from '@/api/sports';
import type { SportDto } from '@/api/sports/type';
import type { PageInfo } from '@/api/common/type';
import { selKeyScore } from '@/api/score'
import PageSelector from '@/components/PageSelector.vue'

const PageSize = 10
let data: {
    tableData: ScoreDto[],
    notiShow: boolean,
    tempScore: Score,
    notiIcon: string,
    notiTitle: string,
    notiState: number,//0表示新增，1表示编辑
    sportOptions: EleOptions[],
    statusOptions: EleOptions[],
    sportRequired: boolean,
    userRequired: boolean,
    curPage:number,
    totalSize:number,
    searchText:string,
    tempSearchData:ScoreDto[],
    pageStatus:number,//0表示全部检索，1表示检索模糊查询的temp数据
} = reactive({
    tableData: [],
    notiShow: false,
    tempScore: {
        id: '',
        userId: '',
        sportId: '',
        grade: '',
        bonus: '',
        ranking: '',
        status: '',
    },
    notiIcon: '',
    notiTitle: '',
    notiState: 0,
    sportOptions: [],
    statusOptions: [{label:'预赛', value:'0'}, {label:'决赛', value:'1'}],
    sportRequired: false,
    userRequired:false,
    curPage:1,
    totalSize:0,
    searchText:'',
    tempSearchData:[],
    pageStatus:0,
})
let load = async () => {
    let pageInfoRes: PageInfo<ScoreDto> = (await selAllScore(data.curPage, PageSize)).data
    let scoreRes: ScoreDto[] = pageInfoRes.list
    data.totalSize = pageInfoRes.total
    console.log(scoreRes);
    if (scoreRes) {
        data.tableData = scoreRes
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

let handleEdit = (row: Score) => {
    data.tempScore = {...row}
    data.notiTitle = '编辑项目'
    data.notiIcon = editIcon
    data.notiState = 1
    data.sportRequired = false
    data.userRequired = false
    data.notiShow = true
}

let handleAdd = () => {
    data.tempScore = {
        id: '',
        userId: '',
        sportId: '',
        grade: '',
        bonus: '',
        ranking: '',
        status: '',
    },
        data.notiTitle = '新增项目'
    data.notiIcon = addIcon
    data.notiState = 0
    data.sportRequired = true
    data.userRequired = true
    data.notiShow = true
}

let handleDelete = (row: Score) => {
    delScore(row.id)
    load()
}

let formRef = ref<FormInstance>();
let submitEdit = async (formEle: FormInstance | null) => {
    if (!formEle) return
    formEle.validate((valid) => {
        if (valid) {
            if (data.notiState == 0) {
                addScore(data.tempScore)
                load()
            } else {
                updateScore(data.tempScore)
                load()
            }
            data.notiShow = false
        } else {
            return false
        }
    })
}

let statusMap =(row:ScoreDto) => {
    return row.status == '0'?'预赛':'决赛'
}

let searchByUserOrSportName =async () => {
    if(data.searchText == ''){
        data.pageStatus = 0
        load()
        return
    }
    let v1 = (await selKeyScore(data.searchText, null)).data
    let v2 = (await selKeyScore(null, data.searchText)).data
    data.tableData = []
    if(v1?.length||0 + v2?.length||0 < PageSize){
        if(v1)
            data.tableData.push(...v1)
        if(v2)
            data.tableData.push(...v2)
        console.log(data.tableData);
        
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
            <el-button size="large" type="success" @click="handleAdd" id="add-button">
                <div class="img-wrapper">
                    <img :src="addIcon" id="add-icon" />
                </div>
                新增
            </el-button>
        </div>
        <div class="table">
            <el-table :data="data.tableData">
                <el-table-column label="Id" prop="id" />
                <el-table-column label="用户名" prop="user" />
                <el-table-column label="项目" prop="sport" />
                <el-table-column label="成绩" prop="grade" />
                <el-table-column label="积分" prop="bonus" />
                <el-table-column label="排名" prop="ranking" />
                <el-table-column label="状态" prop="status" :formatter="statusMap"/>
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
                <el-form ref="formRef" style="max-width: 600px" :model="data.tempScore" label-width="auto">
                    <el-form-item label="userId" prop="userId" :rules="[
                        { required: data.userRequired, message: 'grade is required' },
            ]">
                        <el-input v-model.number="data.tempScore.userId" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="项目" prop="sportId" :rules="[
                        { required: data.sportRequired, message: 'grade is required' },
            ]">
                        <el-select v-model="data.tempScore.sportId" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in data.sportOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="成绩" prop="grade" :rules="[
                { required: true, message: 'grade is required' },
            ]">
                        <el-input v-model="data.tempScore.grade" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="积分" prop="bonus" :rules="[
                { required: true, message: 'bonus is required' },
            ]">
                        <el-input v-model="data.tempScore.bonus" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="排名" prop="ranking" :rules="[
                { required: true, message: 'ranking is required' },
            ]">
                        <el-input v-model="data.tempScore.ranking" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="状态" prop="status" :rules="[
                { required: true, message: 'status is required' },
            ]">
                        <el-select v-model="data.tempScore.status" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in data.statusOptions" :key="item.value" :label="item.label"
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