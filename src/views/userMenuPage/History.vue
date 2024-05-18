<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { HistoryDto, History } from '@/api/history/type';
import { selUserHistory } from '@/api/userApi';

let data: {
    tableData: HistoryDto[],
    searchText: string,
} = reactive({
    tableData: [],
    searchText: '',
})
let load = async () => {
    let historyRes: HistoryDto[] = (await selUserHistory()).data
    console.log(historyRes);
    if (historyRes) {
        data.tableData = historyRes
    }
}
load()

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
            </el-table>
        </div>
    </div>
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