<script setup lang="ts">

</script>

<template>
    <Teleport to="body">
        <div class="bg">
            <slot name="body"></slot>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: #52413750;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}
</style>