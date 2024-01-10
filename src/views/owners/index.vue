<template>
    <div class=" p-8" style="height: calc(100vh - 92px);">
        <a-page-header
            class="demo-page-header"
            style="border: 1px solid rgb(235, 237, 240)"
            @back="() => $router.go(-1)"
        >
            <template #extra>
                <a-button @click="toggleModal" key="1" type="primary">
                    Добавить собственника
                </a-button>
            </template>
        </a-page-header>
        {{ owners }}
        <a-table
            @change="onTableChange($event)"
            :columns="columns"
            :data-source="owners"
            :pagination="{
                pageSize: 10,
                total: owners.total,
            }"
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
                            <div class="w-1/2">{{ owner.fio }}</div>

                        </li>
                        <li class="flex mb-10">
                            <div class="w-[100px]">Телефон</div>
                            <div class="w-1/2">{{ owner.phone_format }}</div>
                        </li>
                        <li class="flex mb-10">
                            <div class="w-[100px]">Email</div>
                            <div class="w-1/2">{{ owner.email }}</div>
                        </li>
                        <li class="flex mb-10">
                            <div class="w-[100px]">O клиенте</div>
                            <div class="w-1/2">{{ owner.about }}</div>
                        </li>

                    </ul>
                </div>
                <div class="w-1/2 bg-stone-200">ddd</div>
            </div>
        </a-modal>

        <!-- create modal -->
        <a-modal v-model:open="createModal" title="Новый собственник"  width="80%" class="h-[80vh]" @ok="saveData">
            <div v-if="fields">
                <div v-for="row in fields" :key="row.code">
                    <a-form
                        :model="newItem"
                        name="basic"
                        autocomplete="off"
                        @finish="onFinish"
                        @finishFailed="onFinishFailed"
                    >
                        <a-form-item
                            v-if="row.type === 'text' || row.type === 'email' ||  row.type === 'textarea'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required }]"
                        >
                            <a-input
                                v-model:value="newData[row.code]"
                                :ref="row.code"
                                :type="row.html"
                                @change="onChangeInput"
                                class="!w-[200px]"
                            />
                        </a-form-item>

                        <a-form-item
                            v-if="row.type === 'phone'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required }]"
                        >
                            <a-input v-model:value="newData[row.code]"  v-mask="'+# (###) ###-##-##'"  type="tel" placeholder="+7"/>
                        </a-form-item>

                        <a-form-item
                            v-if="row.type == 'select'"
                            :label="row.name"
                            :name="row.name"
                            :rules="[{ required: row.required, message: 'Required' }]"
                        >
                            <a-select
                                v-model:value="newData[row.code]"
                                show-search
                                :filter-option="filterOption"
                                class="!w-[200px]"
                            >
                                <a-select-option v-for="option in row.options" :key="option.id" :value="option.id">{{ option.value }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </a-modal>

    </div>
</template>
<script setup>
import { reactive, onMounted, computed, ref } from 'vue';
import { useOwnerStore } from '@/stores/owners.module.js';
import { message } from 'ant-design-vue';
import { TrashIcon } from '@heroicons/vue/24/solid'


const myStore = useOwnerStore();
const loading = ref(false);

const open = ref(false);
const clickedRow = ref(null);
const createModal = ref(false)
const fields = ref(null);

const fetchOwnerFields = async () => {
    try {
        await myStore.getOwnerFields();
        fields.value = myStore.ownerFields;
        console.log('res', data.value)
    } catch (error) {
        console.error('Error fetching data in component:', error);
    }
}

const newData = ref({
    type: 1,
})

const onTableChange = (e) => {
    console.log('p', e)
}

const showModal = (record) => {
    open.value = true;
    clickedRow.value = record;
    fetchOwnerData(record);
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
    const formData = new FormData();
    for (var key in newData.value) {
        if (newData.value.hasOwnProperty(key)) {
            formData.append(key, newData.value[key]);
        }
    }
    loading.value = true;
    await myStore.createNewOwner(formData);
    await myStore.getOwnersList();
    loading.value = false;
    createModal.value = false;
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
    await myStore.deleteOwner(data);
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
  fetchOwnerFields()
})

const owners = computed(() => {
  return myStore.owners;
})

const owner = computed(() => {
    return myStore.owner;
})

const fetchData = async () => {
  loading.value = true;
  try {
    await myStore.getOwnersList().then(
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

const fetchOwnerData = async (id) => {
    loading.value = true;
    try {
    await myStore.getOwnerData(id).then(
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
