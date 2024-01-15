<template>
  <div class="w-full p-8" style="height: calc(100vh - 92px);">
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
        @change="onTableChange($event)"
        :columns="columns"
        :data-source="clients.data"
        :pagination="{
                pageSize: 10,
                total: clients.total,
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
    <a-modal v-model:open="open" :footer="null" :title="'ID: ' + clickedRow" width="80%" class="h-[80vh]"
             @ok="handleOk">
      <div class="flex w-full mt-20">
        <div class="w-1/2">
          
            <a-form
                name="basic"
            >
              <div v-for="row in Object.entries(selectedItemValue)" :key="row">
                <a-form-item
                    :label="row[0]"
                    :name="row[0]"
                >
                  <a-input
                      v-model:value="row[1]"
                      :default-value="row[1]"
                      @change="onEditInput"
                      class="!w-full"
                  />
                </a-form-item>
            </div>
          </a-form>
          <a-button @click="console.log(fields.map(item => {
                            const value = client[item.code];
                            return { name: item.name, value, type: item.type, options:item.options };
                        }))">test
          </a-button>
        </div>
        <div class="w-1/2 bg-stone-200"></div>
      </div>
    </a-modal>

    <!-- create modal -->
    <a-modal v-model:open="createModal" title="Новый клиент" width="30%" class="h-[80vh]" @ok="saveData">
      <div v-if="fields">
        <a-form
            :model="newItem"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            layout="vertical"
            class="flex flex-col gap-6"
        >
          <div v-for="row in fields" :key="row.code" class="flex flex-col gap-4">
            <div>
              <a-form
                  :model="newItem"
                  name="basic"
                  autocomplete="off"
                  @finish="onFinish"
                  @finishFailed="onFinishFailed"
                  class="flex flex-col gap-6"

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
                      class="!w-full"
                  />
                </a-form-item>

                <a-form-item
                    v-if="row.type === 'phone'"
                    :label="row.name"
                    :name="row.name"
                    :rules="[{ required: row.required }]"

                >
                  <a-input v-model:value="newData[row.code]" v-mask="'+# (###) ###-##-##'" type="tel" placeholder="+7"
                           class="!w-[200px]"/>
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
                      class="!w-full"
                  >
                    <a-select-option v-for="option in row.options" :key="option.id" :value="option.id">{{
                        option.value
                      }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </a-form>
      </div>
    </a-modal>

  </div>
</template>
<script setup>
import {reactive, onMounted, computed, ref} from 'vue';
import {useClientStore} from '@/stores/clients.module.js';
import {message} from 'ant-design-vue';
import {TrashIcon} from '@heroicons/vue/24/solid'


const myStore = useClientStore();
const loading = ref(false);

const open = ref(false);
const clickedRow = ref(null);
const createModal = ref(false)
const fields = ref(null);

const fetchClientFields = async () => {
  try {
    await myStore.getClientFields();
    fields.value = myStore.clientFields;
    console.log('res', data.value)
  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
}

const newData = ref({
  type: 1,
})

const showModal = async (record) => {
  open.value = true;
  clickedRow.value = record;
  fetchClientData(record);
};

const toggleModal = () => {
  createModal.value = !createModal.value;
};

const selectedItemValue = ref({})

const handleOk = (e) => {
  console.log(e);
  open.value = false;
};

const onEditInput = (e) => {
  console.log('e', e)
}

const onTableChange = (e) => {
  console.log('p', e)
}
// main function for sending data to backend
const saveData = async (e) => {
  const formData = new FormData();
  for (var key in newData.value) {
    if (newData.value.hasOwnProperty(key)) {
      formData.append(key, newData.value[key]);
    }
  }
  loading.value = true;
  await myStore.createNewClient(formData);
  await myStore.getClientsList();
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
  fetchClientFields()
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
            selectedItemValue.value = response.data.data;
          }
        }
    )
  } catch (error) {
    console.error('Error fetching data in component:', error);
  }
}


</script>
<style>
</style>
