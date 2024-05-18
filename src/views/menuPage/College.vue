<script setup lang="ts">
import { addCollege, delCollege, selAllCollege, updateCollege } from '@/api/college'
import type { College } from '@/api/college/type';
import { reactive, ref } from 'vue';
import EasyNotification from '@/components/custom/EasyNotification.vue'
import editIcon from '@/assets/svg/operation/edit.svg'
import addIcon from '@/assets/svg/operation/add.svg'
import type { FormInstance } from 'element-plus';
import { useCommonStore } from '@/stores/common';

let data: {
    tableData: College[],
    notiShow: boolean,
    tempCollege: College,
    notiIcon: string,
    notiTitle: string,
    notiState: number,//0表示新增，1表示编辑
    psRequired: boolean,
    tempId:string,
} = reactive({
    tableData: [],
    notiShow: false,
    tempCollege: {
        id: '',
        name: '',
        bonus: '',
    },
    notiIcon: '',
    notiTitle: '',
    notiState: 0,
    psRequired: false,
    tempId:'',
})
let load = async () => {
    let collegeRes: College[] = (await selAllCollege()).data
    console.log(collegeRes);
    if (collegeRes) {
        data.tableData = collegeRes
    }
}
load()

let handleEdit = (row: College) => {
    data.tempCollege = { ...row }
    data.notiTitle = '编辑项目'
    data.notiIcon = editIcon
    data.notiState = 1
    data.psRequired = false
    data.notiShow = true
}

let handleAdd = () => {
    data.tempCollege = {
        id: '',
        name: '',
        bonus: '',
    }
    data.notiTitle = '新增学院'
    data.notiIcon = addIcon
    data.notiState = 0
    data.psRequired = true
    data.notiShow = true
}

let handleDelete = (row: College) => {
    useCommonStore().notiShow = true
    data.tempId = row.id
}

let doDelete = async() => {
    await delCollege(data.tempId)
    useCommonStore().notiShow = false
    load()
}

let formRef = ref<FormInstance>();
let submitEdit = async (formEle: FormInstance | null) => {
    if (!formEle) return
    formEle.validate((valid) => {
        if (valid) {
            data.tempCollege.bonus = null
            if (data.notiState == 0) {
                addCollege(data.tempCollege)
                load()
            } else {
                updateCollege(data.tempCollege)
                load()
            }
            data.notiShow = false
        } else {
            return false
        }
    })
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
                <el-table-column label="名称" prop="name" />
                <el-table-column label="积分" prop="bonus" />
                <el-table-column align="right">
                    <template #header>
                        <h2>操作</h2>
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
                <el-form ref="formRef" style="max-width: 600px" :model="data.tempCollege" label-width="auto">
                    <el-form-item label="名称" prop="name" :rules="[
                { required: true, message: 'name is required' },
            ]">
                        <el-input v-model.number="data.tempCollege.name" type="text" autocomplete="off" />
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