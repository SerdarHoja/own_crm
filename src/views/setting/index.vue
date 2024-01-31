<template>
  <div class=" px-[5rem] pt-[3.2rem] pb-[1rem] h-full relative flex-1" style="width: calc(100vh - 24rem);">
    <div class="flex gap-x-[3rem] mb-m-base">
      <div class="text-main-title font-bold">Настройки</div>
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
    </div>
    <div class="cards__arr --left w-[5rem] h-full absolute top-0 left-0"
         style="background: url(../../assets/img/icon-list-arr.svg) center center/3rem no-repeat;"></div>
    <div class="cards__arr --right w-[5rem] h-full absolute top-0 right-0"
         style="background: url(../../assets/img/icon-list-arr.svg) center center/3rem no-repeat;"></div>
    <div class="h-main-wrap">

    </div>

  </div>
</template>
<script setup>
import IconCell from "@/components/icons/IconCell.vue";
import IconLine from "@/components/icons/IconLine.vue";
import IconDeals from "@/components/icons/IconDeals.vue";
import IconDollar from "@/components/icons/IconDollar.vue";
import IconCardPerson from "@/components/icons/IconCardPerson.vue";
import IconCardMobile from "@/components/icons/IconCardMobile.vue";

import {computed, ref, watch} from 'vue';
import IconCian from "@/components/icons/IconCian.vue";
import IconDirectory from "@/components/icons/IconDirectory.vue";
import IconOwners from "@/components/icons/IconOwners.vue";
import IconSetting from "@/components/icons/IconSetting.vue";
import IconObjects from "@/components/icons/IconObjects.vue";
import IconVillages from "@/components/icons/IconVillages.vue";
import IconClients from "@/components/icons/IconClients.vue";
import IconTasks from "@/components/icons/IconTasks.vue";

function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

const inputValue = ref('111');
const formatValue = computed(() => {
  if (inputValue.value === '-') return '-';
  return formatNumber(inputValue.value);
});
const format = (val, preVal) => {
  const reg = /^-?\d*(\.\d*)?$/;
  if ((!isNaN(+val) && reg.test(val)) || val === '' || val === '-') {
    inputValue.value = val;
  } else {
    inputValue.value = preVal;
  }
};

// '.' at the end or only '-' in the input box.
const onBlur = () => {
  if (inputValue.value.charAt(inputValue.value.length - 1) === '.' || inputValue.value === '-') {
    format(inputValue.value.slice(0, -1), inputValue.value);
  }
};
watch(inputValue, (val, preVal) => {
  format(val, preVal);
});
</script>
<style scoped>

</style>
