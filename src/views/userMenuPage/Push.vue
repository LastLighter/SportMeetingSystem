<script setup lang="ts">
import type { RegisterDto } from '@/api/register/type';
import { reactive } from 'vue'
import CardsTable from '@/components/CardsTable.vue'
import { selNow, selUserPush, updUserPush } from '@/api/userApi'
import type { SportDto } from '@/api/sports/type';
import { useCommonStore } from '@/stores/common';
import crossIcon from '@/assets/svg/operation/cross.svg'
import { normalDate } from '@/utils/date'


let data: {
    pushTableData: RegisterDto[],
    processTableData: SportDto[],
    searchText: string,
} = reactive({
    pushTableData: [],
    processTableData: [],
    searchText: '',
})

let load = async () => {
    let sportRes: SportDto[] = (await selNow()).data
    if (sportRes) {
        data.processTableData = sportRes
    }
    let pushRes: RegisterDto[] = (await selUserPush(useCommonStore().loginData?.id || '')).data
    if (sportRes) {
        data.pushTableData = pushRes
    }
}
load()

let handleDeletePush = async(id:string) => {
    await updUserPush(id)
    load()
}
</script>

<template>
    <div id="push-container">
        <div class="reg-push-box push-box">
            <div class="top">
                <h2>报名推送</h2>
            </div>
            <div class="table">
                <CardsTable :list="data.pushTableData" :width="860" :bottom="60">
                    <template #header="scope">
                        <h3>{{ scope.data.sport }}</h3>
                    </template>
                    <template #body="scope">
                        <div class="body">
                            <span>分组： {{ scope.data.group }}</span>
                            <span>赛道： {{ scope.data.track }}</span>
                            <span>状态： {{ scope.data.status == '0' ? '初赛' : '复赛' }}</span>
                            <span>审核： {{ scope.data.review == '0' ? '未审核' : '通过' }}</span>
                            <span>标记： {{ scope.data.brand }}</span>
                        </div>
                    </template>
                    <template #footer="scope">
                        <div class="footer">
                            <div class="img-wrapper" @click="handleDeletePush(scope.data.id)">
                                <img :src="crossIcon" />
                            </div>
                        </div>
                    </template>
                </CardsTable>
            </div>
        </div>
        <div class="process-push-box push-box">
            <div class="top">
                <h2>赛程推送</h2>
            </div>
            <div class="table">
                <CardsTable :list="data.processTableData" :width="860" :bottom="60">
                    <template #header="scope">
                        <h3>{{ scope.data.name }}</h3>
                    </template>
                    <template #body="scope">
                        <div class="body">
                            <span>类型： {{ scope.data.type }}</span>
                            <span>时间： {{ normalDate(scope.data.time) }}</span>
                            <span>地点： {{ scope.data.place }}</span>
                            <span>裁判： {{ scope.data.referee }}</span>
                        </div>
                    </template>
                    <template #footer="scope">
                    </template>
                </CardsTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#push-container {
    .reg-push-box {
        border-bottom: 1px solid #e3e3e3;
    }

    .push-box {
        margin-bottom: 48px;

        .top {
            h2 {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 27px;
            }
        }

        .table {
            h3 {
                font-weight: bold;
            }

            .body {
                width: 320px;
                display: flex;
                flex-wrap: wrap;

                span {
                    width: 180px;
                    margin-bottom: 16px;
                }
            }

            .footer {
                display: flex;
                justify-content: right;

                .img-wrapper {
                    width: 14px;
                    height: 14px;
                    margin-right: 24px;
                    border: 2px solid #524137;
                    border-radius: 4px;
                    padding: 4px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .img-wrapper:hover {
                    border: 2px solid #00A2E8;

                    img {
                        filter: drop-shadow(#00A2E8 80px 0);
                    }
                }
            }
        }
    }
}
</style>