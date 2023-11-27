<template>
    <div class="mt-[95px] p-8" style="height: calc(100vh - 92px);">
        <a-page-header
            class="demo-page-header"
            style="border: 1px solid rgb(235, 237, 240)"
            @back="() => $router.go(-1)"
        >
            <template #extra>
                <!-- <a-button @click="toggleModal" key="1" type="primary">
                    Добавить собственника 
                </a-button> -->
            </template>
        </a-page-header>
        <!-- {{ objects }} -->
    </div>
</template>