<template>
  <div class=" px-[5rem] pt-[3.2rem] pb-[1rem] h-full relative flex-1" style="width: calc(100vh - 24rem);">
    <div class="flex gap-x-[3rem] mb-m-base">
      <div class="text-main-title font-bold">Задачи</div>
      <div>
        <a-tabs v-model:activeKey="activeKey" @change="onTabsChange" type="card" class="h-[4rem] text-inherit">
          <a-tab-pane key="1" tab="Мои" class="h-[4rem] text-inherit">
          </a-tab-pane>
          <a-tab-pane key="2" tab="Все" class="h-[4rem]">
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="flex flex-col mb-m-base">
      <div class=" flex flex-wrap mb-m-base gap-[1.6rem]">
        <a-tooltip :trigger="['focus']" placement="topLeft" overlay-class-name="numeric-input">
          <template v-if="inputValue" #title>
      <span class="numeric-input-title">
        {{ formatValue }}
      </span>
          </template>

          <a-input
              v-model:value="inputValue"
              placeholder="Input a number"
              :max-length="30"
              style="width: 28rem;"
              @blur="onBlur"
          />
        </a-tooltip>
        <a-select
            v-model:value="value"
            mode="tags"
            style="width: 28rem;"
            placeholder="Ответственный брокер"
            :options="options"
            @change="handleChange"
        ></a-select>
        <a-select
            v-model:value="value"
            mode="tags"
            style="width: 28rem;"
            placeholder="Тип сделки"
            :options="options"
            @change="handleChange"
        ></a-select>
        <a-select
            v-model:value="value"
            mode="tags"
            style="width: 28rem;"
            placeholder="Статус"
            :options="options"
            @change="handleChange"
        ></a-select>
        <a-select
            v-model:value="value"
            mode="tags"
            style="width: 28rem;"
            placeholder="Статус"
            :options="options"
            @change="handleChange"
        ></a-select>
      </div>
      <div class="flex gap-x-[3rem] items-center">
        <div>
          Найдено: <span>5</span>
        </div>
        <a-space class="mr-12">
          <a-button size="middle" class="flex items-center gap-1">
            Сбросить всё
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18 11.5C18 15.366 14.866 18.5 11 18.5C7.13401 18.5 4 15.366 4 11.5C4 7.63401 7.13401 4.5 11 4.5C14.866 4.5 18 7.63401 18 11.5ZM11 12.2071L8.35355 14.8536L7.64645 14.1464L10.2929 11.5L7.64645 8.85355L8.35355 8.14645L11 10.7929L13.6464 8.14645L14.3536 8.85355L11.7071 11.5L14.3536 14.1464L13.6464 14.8536L11 12.2071Z" fill="#4064BF"/>
            </svg>
          </a-button>
        </a-space>


      </div>
    </div>
  </div>
</template>
<script setup>

import IconLine from "@/components/icons/IconLine.vue";
import IconDeals from "@/components/icons/IconDeals.vue";
import IconCell from "@/components/icons/IconCell.vue";
import IconDollar from "@/components/icons/IconDollar.vue";
import IconCardPerson from "@/components/icons/IconCardPerson.vue";
import IconCardMobile from "@/components/icons/IconCardMobile.vue";
</script>

