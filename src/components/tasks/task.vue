<template>
    <div>
      <a-card>
        <div class="flex gap-5">
          <div class="w-1/6 flex gap-4">
            <div class="text-2xl text-slate-900">{{ taskItemData.id }}</div>
          </div>
          <div class="w-1/6 flex gap-4">
            <div class="text-2xl text-slate-900">{{ taskItemData.type_task.value }}</div>
          </div>
          <div class="w-1/5 flex gap-4">
            <div class="text-2xl text-slate-900">{{ taskItemData.date }}</div>
          </div>
          <div class="w-1/6 flex gap-4">
            <div class="text-2xl text-slate-900">{{ taskItemData.client.value.name }}</div>
          </div>
          <div class="w-1/6 flex gap-4">
            <div class="text-2xl text-slate-900">{{ taskItemData.client.value.phone }}</div>
          </div>
          <div class="w-1/6 flex gap-4">
            <div class="text-2xl text-slate-900">{{ taskItemData.status.value }}</div>
          </div>
          <div class="w-1/6 flex gap-4">
            <div class="text-2xl text-slate-900">
              <img :src="taskItemData.broker.picture" alt="">
              {{ taskItemData.broker.fio }}
            </div>
          </div>
          <div class="w-1/6 flex gap-4">
            <div class="text-2xl text-slate-900">{{ taskItemData.deal.value }}</div>
          </div>
          <div class="w-1/6 flex gap-4 flex-wrap">
            <div class="text-2xl text-slate-900 flex gap-4">
              <a href="##" v-for="object in taskItemData.object.value" :key="object">{{ object }} </a>
            </div>
          </div>
        </div>
      </a-card>
    </div>
</template>
<script setup>
import {computed, ref, watch} from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    const router = useRouter();
    const route = useRoute();

    const props = defineProps({
      taskItemData: Object,
    })

    const open = ref(false);

    const showModal = () => {
        open.value = true;
    };

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