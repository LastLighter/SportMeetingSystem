<script setup lang="ts">
import { addManage, delManage, selAllManage, updateManage } from '@/api/manage'
import type { Manage } from '@/api/manage/type';
import { reactive, ref } from 'vue';
import EasyNotification from '@/components/custom/EasyNotification.vue'
import editIcon from '@/assets/svg/operation/edit.svg'
import addIcon from '@/assets/svg/operation/add.svg'
import type { FormInstance } from 'element-plus';
import type { EleOptions } from '@/api/component/type'
import { useCommonStore } from '@/stores/common';
import DeleteNoti from '@/components/custom/DeleteNoti.vue'

let data: {
    tableData: Manage[],
    notiShow: boolean,
    tempManage: Manage,
    notiIcon: string,
    notiTitle: string,
    notiState: number,//0表示新增，1表示编辑
    psRequired:boolean,
    typeOptions:EleOptions[],
    tempId:string,
} = reactive({
    tableData: [],
    notiShow: false,
    tempManage: {
        id: '',
        name: '',
        sex: '',
        phone: '',
        username: '',
        password: '',
    },
    notiIcon: '',
    notiTitle: '',
    notiState: 0,
    psRequired:false,
    typeOptions: [{label:'男', value:'男'}, {label:'女', value: '女'}],
    tempId:'',
})
let load = async () => {
    let manageRes: Manage[] = (await selAllManage()).data
    console.log(manageRes);
    if (manageRes) {
        data.tableData = manageRes
    }
}
load()

let handleEdit = (row: Manage) => {
    data.tempManage = {...row}
    data.tempManage.password = ''
    data.notiTitle = '编辑管理员'
    data.notiIcon = editIcon
    data.notiState = 1
    data.psRequired = false
    data.notiShow = true
}

let handleAdd = () => {
    data.tempManage = {
        id: '',
        name: '',
        sex: '',
        phone: '',
        username: '',
        password: '',
    },
        data.notiTitle = '新增管理员'
    data.notiIcon = addIcon
    data.notiState = 0
    data.psRequired = true
    data.notiShow = true
}

let handleDelete = (row: Manage) => {
    useCommonStore().notiShow = true
    data.tempId = row.id
    load()
}

let doDelete = async() => {
    await delManage(data.tempId)
    useCommonStore().notiShow = false
    load()
}

let formRef = ref<FormInstance>();
let submitEdit = async (formEle: FormInstance | null) => {
    if (!formEle) return
    formEle.validate((valid) => {
        if (valid) {
            if (data.notiState == 0) {
                addManage(data.tempManage)
                load()
            } else {
                if(data.tempManage.password == ''){
                    data.tempManage.password = null
                }
                updateManage(data.tempManage)
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
                <el-table-column label="姓名" prop="name" />
                <el-table-column label="性别" prop="sex" />
                <el-table-column label="手机号" prop="phone" />
                <el-table-column label="昵称" prop="username" />
                <el-table-column label="密码" prop="password" />
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
                <el-form ref="formRef" style="max-width: 600px" :model="data.tempManage" label-width="auto">
                    <el-form-item label="姓名" prop="name" :rules="[
                { required: true, message: 'name is required' },
            ]">
                        <el-input v-model.number="data.tempManage.name" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" :rules="[
                { required: true, message: 'number is required' },
            ]">
                        <el-select v-model="data.tempManage.sex" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in data.typeOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone" :rules="[
                { required: true, message: 'phone is required' },
            ]">
                        <el-input v-model.number="data.tempManage.phone" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="用户名" prop="username" :rules="[
                { required: true, message: 'username is required' },
            ]">
                        <el-input v-model.number="data.tempManage.username" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :rules="[
                { required: data.psRequired, message: 'password is required' },
            ]">
                        <el-input v-model.number="data.tempManage.password" type="password" autocomplete="off" />
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