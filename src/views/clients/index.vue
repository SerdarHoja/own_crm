<template>
  <div class=" px-[5rem] pt-[3.2rem] pb-[1rem] h-full relative flex-1" style="width: calc(100vh - 24rem);">
    <div class="flex gap-x-[3rem] mb-m-base">
      <div class="text-main-title font-bold">Собственники</div>
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
             {{ selectedItemValue }}
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
    <a-modal v-model:open="createModal" title="Новый клиент" width="40%" @ok="saveData">
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
          <div v-for="row in fields" :key="row.code" class="flex flex-wrap gap-4">
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
