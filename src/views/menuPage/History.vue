<script setup lang="ts">
import EasyNotification from '@/components/custom/EasyNotification.vue'
import { reactive, ref } from 'vue';
import editIcon from '@/assets/svg/operation/edit.svg'
import { delHistory, selAllHistory, selKeyHistory, updateHistory } from '@/api/history'
import type { HistoryDto, History } from '@/api/history/type';
import type { FormInstance } from 'element-plus';

let data: {
    tableData: HistoryDto[],
    searchText: string,
    notiIcon: string,
    notiTitle: string,
    notiState: number,//0表示新增，1表示编辑
    notiShow: boolean,
    tempHistory: History,
} = reactive({
    tableData: [],
    searchText: '',
    notiIcon: '',
    notiTitle: '',
    notiState: 0,
    notiShow: false,
    tempHistory: {
        id: '',
        userId: '',
        sportId: '',
        grade: '',
        createTime: '',
    }
})
let load = async () => {
    let historyRes: HistoryDto[] = (await selAllHistory()).data
    console.log(historyRes);
    if (historyRes) {
        data.tableData = historyRes
    }
}
load()


let handleEdit = (row: History) => {
    data.tempHistory.grade = row.grade
    data.tempHistory.id = row.id
    data.notiTitle = '编辑历史'
    data.notiIcon = editIcon
    data.notiState = 1
    data.notiShow = true
    data.tempHistory.sportId = null
    data.tempHistory.createTime = null
}

let formRef = ref<FormInstance>();
let submitEdit = async (formEle: FormInstance | null) => {
    if (!formEle) return
    formEle.validate((valid) => {
        if (valid) {
            if (data.notiState == 1) {
                if(data.tempHistory.userId == ''){
                    data.tempHistory.userId = null
                }
                updateHistory(data.tempHistory)
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
        load()
        return
    }
    let v1 = (await selKeyHistory(data.searchText)).data
    data.tableData = []
    if(v1)
        data.tableData.push(...v1)
}

let handleDelete = (row: History) => {
    delHistory(row.id)
    load()
}
</script>

<template>
    <div id="user-container">
        <div class="top">
        </div>
        <div class="table">
            <el-table :data="data.tableData">
                <el-table-column label="Id" prop="id" />
                <el-table-column label="用户" prop="user" />
                <el-table-column label="运动" prop="sport" />
                <el-table-column label="成绩" prop="grade" />
                <el-table-column label="时间" prop="createTime" />
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
                <el-form ref="formRef" style="max-width: 600px" :model="data.tempHistory" label-width="auto">
                    <el-form-item label="用户Id" prop="userId" :rules="[
            ]">
                        <el-input v-model.number="data.tempHistory.userId" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="成绩" prop="grade" :rules="[
                { required: true, message: 'number is required' },
            ]">
                        <el-input v-model="data.tempHistory.grade" type="text" autocomplete="off" />
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