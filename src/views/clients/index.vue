<template>
    <div class="mt-[95px] p-8" style="height: calc(100vh - 92px);">
        <a-page-header
            class="demo-page-header"
            style="border: 1px solid rgb(235, 237, 240)"
            @back="() => $router.go(-1)"
        >
            <template #extra>
                <a-button @click="toggleModal" key="1" type="primary">
                    Добавить клиента 
                </a-button>
            </template>
        </a-page-header>
        <a-table
            :columns="columns"
            :data-source="clients"
            :pagination="{ pageSize: 50 }"
            :custom-row="
                (record) => {
                if (record.id) {
                    return {
                        onClick : (event) => showModal(record.id),
                    };
                }
                }
            "
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <a-popconfirm
                        title="Действительно удалить?"
                        ok-text="Да"
                        cancel-text="Нет"
                        @confirm="handleDelete($event, record.id)"
                        @cancel="cancel"
                    >
                        <TrashIcon @click="deleteConfirm($event)" class="w-10 h-10 cursor-pointer"/>
                    </a-popconfirm> 
                </template>
            </template>
        </a-table>

        <!-- edit modal -->
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

        <!-- create modal -->
        <a-modal v-model:open="createModal" title="Новый клиент"  width="80%" class="h-[80vh]" @ok="saveData">
            <a-form
                :model="newItem"
                name="basic"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    label="Ф.И.О"
                    name="Ф.И.О"
                >
                    <a-input v-model:value="newItem.fio" />
                </a-form-item>
                <a-form-item
                    label="Телефон"
                    name="Телефон"
                >
                    <a-input v-model:value="newItem.phone"  v-mask="'+# (###) ###-##-##'"  type="tel" placeholder="+7"/>
                </a-form-item>
                <a-form-item
                    label="Еmail"
                    name="Еmail"
                >
                    <a-input v-model:value="newItem.email" />
                </a-form-item>
                <a-form-item
                    label="O клиенте"
                    name="O клиенте"
                >
                    <a-input v-model:value="newItem.about" />
                </a-form-item>
                <a-form-item
                    label="Номер авто"
                    name="Номер авто"
                >
                    <a-input v-model:value="newItem.number_auto" />
                </a-form-item>
            </a-form>
        </a-modal>
        
    </div>
</template>
<script setup>
import { reactive, onMounted, computed, ref } from 'vue';
import { useClientStore } from '@/stores/clients.module.js';
import { message } from 'ant-design-vue';
import { TrashIcon } from '@heroicons/vue/24/solid'


const myStore = useClientStore();
const loading = ref(false);

const open = ref(false);
const clickedRow = ref(null);
const createModal = ref(false)

const newItem = reactive({
    "fio": '', 
    "phone": '', 
    "email": '', 
    "about": '', 
    "number_auto": '', 
    "type": 1
})

const showModal = (record) => {
    open.value = true;
    clickedRow.value = record;
    fetchClientData(record);
};

const toggleModal = () => {
    createModal.value = !createModal.value;
};

const handleOk = (e) => {
  console.log(e);
  open.value = false;
};

 // main function for sending data to backend
 const saveData = async (e) => {
    loading.value = true;
    await myStore.createNewClient(newItem);
    await myStore.getClientsList();
    loading.value = false;
    createModal.value = false;
    // Clear the data properties
    Object.keys(newItem.data).forEach((key) => {
        newItem.data[key] = '';
    });
};

const deleteConfirm = (e) => {
    e.preventDefault();
    e.stopPropagation();
}
const handleDelete = async (e, id) => {
    loading.value = true;
    const data = {
        id,
    }
    await myStore.deleteClient(data);
    loading.value = true;
    fetchData();
}

const columns = [
    {
        title: 'id',
        key: 'id',
        dataIndex: 'id',
        width: 50,
    },
    {
        title: "Клиент",
        dataIndex: "fio",
        key: 'fio',
    },
    {
        title: "Телефон",
        dataIndex: "phone_format",
        key: 'phone',
    },
    {
        title: "Email",
        dataIndex: "email",
        key: 'email',
    },
    {
        title: "O клиенте",
        dataIndex: "about",
        key: 'about',
    },
    {
        title: "Действие",
        key: 'action',
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