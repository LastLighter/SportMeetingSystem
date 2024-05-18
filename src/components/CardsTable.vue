<script setup lang="ts">

let props = defineProps<{ list: any[], width:number, bottom:number }>()
</script>

<template>
    <div id="card-table-container" :style="'width:' + props.width +'px;'">
        <div class="card" v-for="item in props.list" :style="'margin-bottom:' + props.bottom + 'px;'">
            <el-card style="max-width: 480px">
                <template #header>
                    <slot name="header" :data="item"></slot>
                </template>
                <slot name="body" :data="item"></slot>
                <template #footer>
                    <slot name="footer" :data="item"></slot>
                </template>
            </el-card>
        </div>
    </div>
</template>

<style scoped lang="scss">
#card-table-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .card{
        
    }
}
</style>