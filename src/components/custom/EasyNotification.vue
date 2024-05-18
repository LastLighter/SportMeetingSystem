<script setup lang="ts">
import Notification from '@/components/Notification.vue'

</script>

<template>
<Notification>
    <template #body>
        <div class="noti-window">
                <div class="header">
                    <slot name="header"></slot>
                </div>
                <div class="content">
                    <slot name="content"></slot>
                </div>
            </div>
    </template>
</Notification>
</template>

<style scoped lang="scss">
.noti-window {
        border-radius: 12px;
        background-color: #f3f3f3;
        box-shadow: 4px 6px 9px #52413750;
        padding: 15px 24px;

        .header {
            border-bottom: 1px solid #e3e3e3;
            min-height: 50px;
            display:flex;
            align-item:center;
        }
    }
</style>