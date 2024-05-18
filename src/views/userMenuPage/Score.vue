<script setup lang="ts">
import type { Score, ScoreDto } from '@/api/score/type';
import { reactive, ref } from 'vue';
import { selScBySport, selUserScore } from '@/api/userApi';
import { useCommonStore } from '@/stores/common';

let data: {
    tableData: ScoreDto[],
    searchText:string,
} = reactive({
    tableData: [],
    searchText:'',
})
let load = async () => {
    let scoreRes: ScoreDto[] = (await selUserScore(useCommonStore().loginData?.id||'')).data
    if (scoreRes) {
        data.tableData = scoreRes
    }
}
load()


let statusMap =(row:ScoreDto) => {
    return row.status == '0'?'预赛':'决赛'
}

let searchBySport =async () => {
    if(data.searchText == ''){
        load()
        return
    }
    let v1 = (await selScBySport(data.searchText)).data
    data.tableData = v1
}

</script>

<template>
    <div id="project-container">
        <div class="top">
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
                        <el-input v-model="data.searchText" size="small" placeholder="Type to search" @keyup.enter="searchBySport" />
                    </template>
                    <template #default="scope">
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