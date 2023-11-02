<template>
    <div class="mt-[95px] p-8" style="height: calc(100vh - 92px);">
        <a-table
            :columns="columns"
            :data-source="clients"
            :pagination="{ pageSize: 50 }"
            :custom-row="
                (record) => {
                console.log(record.id);
                if (record.id) {
                    return {
                        onClick : (event) => showModal(record.id),
                    };
                }
                }
            "
        />

        <a-modal v-model:open="open" :footer="null" :title="'ID: ' + clickedRow"  width="80%" class="h-[80vh]" @ok="handleOk">
            <div class="flex w-full mt-20">
                <div class="w-1/2">
                    <ul>
                        <li class="flex mb-10">
                            <div class="w-[100px]">ФИО</div>
                            <div class="w-1/2">{{ client.fio }}</div>
                        </li>
                        <li class="flex mb-10">
                            <div class="w-[100px]">Телефон</div>
                            <div class="w-1/2">{{ client.phone_format }}</div>
                        </li>
                        <li class="flex mb-10">
                            <div class="w-[100px]">Email</div>
                            <div class="w-1/2">{{ client.email }}</div>
                        </li>
                        <li class="flex mb-10">
                            <div class="w-[100px]">O клиенте</div>
                            <div class="w-1/2">{{ client.about }}</div>
                        </li>

                    </ul>
                </div>
                <div class="w-1/2 bg-stone-200">ddd</div>
            </div>
        </a-modal>
    </div>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue';
import { useClientStore } from '../../stores/clients.module.js';
import { message } from 'ant-design-vue';

const myStore = useClientStore();
const loading = ref(false);

const open = ref(false);
const clickedRow = ref(null);

const showModal = (record) => {
    open.value = true;
    clickedRow.value = record;
    fetchClientData(record);
};

const handleOk = (e) => {
  console.log(e);
  open.value = false;
};

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        width: 50,
    },
    {
        title: "Клиент",
        dataIndex: "fio",
    },
    {
        title: "Телефон",
        dataIndex: "phone_format",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "O клиенте",
        dataIndex: "about",
    }
]

onMounted(() => {
  fetchData();
})

const clients = computed(() => {
  return myStore.clients;
})

const client = computed(() => {
    return myStore.client;
})

const fetchData = async () => {
  loading.value = true;
  try {
    await myStore.getClientsList().then(
      (response) => {
        if (response.data.result === 'error') {
            message.error(response.data.text)
            loading.value = false;
        } else {
            loading.value = false;
        }
      }
    )
  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
}

const fetchClientData = async (id) => {
    loading.value = true;
    try {
    await myStore.getClientData(id).then(
        (response) => {
            if (response.data.result === 'error') {
                message.error(response.data.text)
                loading.value = false;
            } else {
                loading.value = false;
            }
        }
        )
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
}

</script>