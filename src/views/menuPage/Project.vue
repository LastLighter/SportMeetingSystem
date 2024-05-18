<script setup lang="ts">
import { addSport, delSport, getAllSports, updateSport } from '@/api/sports'
import type { Sport, SportDto } from '@/api/sports/type';
import { reactive, ref } from 'vue';
import EasyNotification from '@/components/custom/EasyNotification.vue'
import editIcon from '@/assets/svg/operation/edit.svg'
import addIcon from '@/assets/svg/operation/add.svg'
import type { FormInstance } from 'element-plus';
import type { EleOptions } from '@/api/component/type'
import type { Referee } from '@/api/referee/type';
import { selAllReferee } from '@/api/referee';
import { selKeySport } from '@/api/sports';
import { useCommonStore } from '@/stores/common';
import DeleteNoti from '@/components/custom/DeleteNoti.vue'

let data: {
    tableData: SportDto[],
    searchText: string,
    notiShow: boolean,
    tempSport: Sport,
    notiIcon: string,
    notiTitle: string,
    notiState: number,//0表示新增，1表示编辑
    refereeOptions: EleOptions[],
    typeOptions: EleOptions[],
    tempId:string,
} = reactive({
    tableData: [],
    searchText: '',
    notiShow: false,
    tempSport: {
        id: '',
        name: '',
        number: 0,
        type: '',
        time: '',
        place: '',
        refereeId: '',
        endTime: '',
    },
    notiIcon: '',
    notiTitle: '',
    notiState: 0,
    refereeOptions: [],
    typeOptions: [{label:'男', value:'男'}, {label:'女', value: '女'}],
    tempId:'',
})
let load = async () => {
    let sportRes: SportDto[] = (await getAllSports()).data
    console.log(sportRes);
    if (sportRes) {
        data.tableData = sportRes
    }
    //load referee
    let refereeRes: Referee[] = (await selAllReferee()).data
    if (refereeRes) {
        data.refereeOptions = []
        refereeRes.forEach((item) => {
            data.refereeOptions.push({ value: item.id, label: item.name })
        })
    }
}
load()

let handleEdit = (row: Sport) => {
    data.tempSport = row
    data.notiTitle = '编辑项目'
    data.notiIcon = editIcon
    data.notiState = 1
    data.notiShow = true
}

let handleAdd = () => {
    data.tempSport = {
        id: '',
        name: '',
        number: 0,
        type: '',
        time: '',
        place: '',
        refereeId: '',
        endTime: '',
    },
        data.notiTitle = '新增项目'
    data.notiIcon = addIcon
    data.notiState = 0
    data.notiShow = true
}

let handleDelete = (row: Sport) => {
    data.tempId = row.id
    useCommonStore().notiShow = true
}

let doDelete = async() => {
    await delSport(data.tempId)
    useCommonStore().notiShow = false
    load()
}

let formRef = ref<FormInstance>();
let submitEdit = async (formEle: FormInstance | null) => {
    if (!formEle) return
    formEle.validate(async(valid) => {
        if (valid) {
            if (data.notiState == 0) {
                let res = await addSport(data.tempSport)
                if(res && res.code == '200')
                    data.notiShow = false
                load()
            } else {
                let res = await updateSport(data.tempSport)
                if(res && res.code == '200')
                    data.notiShow = false
                load()
            }
        } else {
            return false
        }
    })
}

let searchByNameOrTypeOrPlace = async () => {
    if (data.searchText == '') {
        load()
        return
    }
    let v1 = (await selKeySport(data.searchText, null, null)).data
    let v2 = (await selKeySport(null, data.searchText, null)).data
    let v3 = (await selKeySport(null, null, data.searchText)).data
    data.tableData = []
    data.tableData.push(...v1)
    data.tableData.push(...v2)
    data.tableData.push(...v3)
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
                <el-table-column label="姓名" prop="name" />
                <el-table-column label="报名上限" prop="number" />
                <el-table-column label="性别" prop="type" />
                <el-table-column label="时间" prop="time" />
                <el-table-column label="地点" prop="place" />
                <el-table-column label="裁判" prop="referee" />
                <el-table-column label="结束时间" prop="endTime" />
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
                <el-form ref="formRef" style="max-width: 600px" :model="data.tempSport" label-width="auto">
                    <el-form-item label="名称" prop="name" :rules="[
                { required: true, message: 'name is required' },
            ]">
                        <el-input v-model="data.tempSport.name" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="报名上限" prop="number" :rules="[
                { required: true, message: 'number is required' },
                { type: 'number', message: 'number must be a number' },
            ]">
                        <el-input v-model.number="data.tempSport.number" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="性别" prop="type" :rules="[
                { required: true, message: 'type is required' },
            ]">
                        <el-select v-model="data.tempSport.type" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in data.typeOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间" prop="time" :rules="[
                { required: true, message: 'time is required' },
            ]">
                        <el-date-picker v-model="data.tempSport.time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Select date and time" />
                    </el-form-item>
                    <el-form-item label="地点" prop="place" :rules="[
                { required: true, message: 'place is required' },
            ]">
                        <el-input v-model.number="data.tempSport.place" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="结束时间" prop="endTime" :rules="[
                { required: true, message: 'endTime is required' },
            ]">
                        <el-date-picker v-model="data.tempSport.endTime" type="datetime"
                            value-format="YYYY-MM-DD HH:mm:ss" placeholder="Select date and time" />
                    </el-form-item>

                    <el-form-item label="裁判" prop="refereeId" :rules="[
                { required: data.notiState == 0, message: 'referee is required' },
            ]">
                        <el-select v-model="data.tempSport.refereeId" placeholder="裁判选择" style="width: 240px">
                            <el-option v-for="item in data.refereeOptions" :key="item.value" :label="item.label"
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