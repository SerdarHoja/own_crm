<template>
  <div class=" px-[5rem] pt-[3.2rem] pb-[1rem] h-full relative flex-1" style="width: calc(100vh - 24rem);">
    <div class="flex items-center gap-x-[3rem]">
      <div class="mb-m-base text-main-title font-bold">Сделки</div>
      <div class="mb-m-base">
        <a-tabs v-model:activeKey="activeKey" @change="onTabsChange" type="card" class="h-[4rem] text-inherit">
          <a-tab-pane key="1" tab="Мои" class="h-[4rem] text-inherit">
          </a-tab-pane>
          <a-tab-pane key="2" tab="Все" class="h-[4rem]">
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class=" flex flex-wrap mb-m-base/2">
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
            style="width: 28rem; margin-right: 1.6rem; margin-bottom: 1.6rem"
            @blur="onBlur"
        />
      </a-tooltip>
      <a-select
          v-model:value="value"
          mode="tags"
          style="width: 28rem; margin-right: 1.6rem; margin-bottom: 1.6rem"
          placeholder="Ответственный брокер"
          :options="options"
          @change="handleChange"
      ></a-select>
      <a-select
          v-model:value="value"
          mode="tags"
          style="width: 28rem; margin-right: 1.6rem; margin-bottom: 1.6rem"
          placeholder="Тип сделки"
          :options="options"
          @change="handleChange"
      ></a-select>
      <a-select
          v-model:value="value"
          mode="tags"
          style="width: 28rem; margin-right: 1.6rem; margin-bottom: 1.6rem"
          placeholder="Статус"
          :options="options"
          @change="handleChange"
      ></a-select>
      <a-select
          v-model:value="value"
          mode="tags"
          style="width: 28rem; margin-right: 1.6rem; margin-bottom: 1.6rem"
          placeholder="Статус"
          :options="options"
          @change="handleChange"
      ></a-select>

    </div>
    <div class="cards__arr --left w-[5rem] h-full absolute top-0 left-0"
         style="background: url(../../assets/img/icon-list-arr.svg) center center/3rem no-repeat;"></div>
    <div class="cards__arr --right w-[5rem] h-full absolute top-0 right-0"
         style="background: url(../../assets/img/icon-list-arr.svg) center center/3rem no-repeat;"></div>
    <div class="h-main-wrap">
      <div class="flex h-full items-start pb-1 overflow-x-auto relative">
        <div class="flex-flexCard bg-[#f4f5f7] rounded-[.8rem] mr-[1.6rem]">
          <div class="flex items-center justify-between p-[1.6rem]">
            <div>Лид - <span>3</span></div>
            <div class="flex justify-between items-center gap-[1.6rem]">
              <div class="flex items-center">
                <IconDeals class="w-[2rem] h-[2rem]"/>
                4
              </div>
              <div class="flex items-center">
                <IconDollar class="w-[2rem] h-[2rem]"/>
                4
              </div>
            </div>
          </div>
          <div>
            <a href="#"
               class="block min-h-[22.7rem] p-6 mr-[1.6rem] mb-[1.6rem] ml-[1.6rem] bg-[#ffffff] rounded-[.8rem]">
              <div class="cards__head flex justify-between mb-m-base">
                <div class="cards__head-item opacity-60">09.09.2021</div>
                <div class="cards__head-item opacity-60">ID: 3213</div>
              </div>
              <div class="cards__info flex justify-between mb-m-base/2">
                <div class="cards__info-item font-bold">Продажа</div>
                <div class="cards__info-item font-bold">$ 5 500 000</div>
              </div>
              <div class="u-client mb-m-base">
                <div class="u-client__item flex items-center mb-m-base/4">
                  <IconCardPerson/>
                  Роман
                </div>
                <div class="u-client__item flex items-center">
                  <IconCardMobile/>
                  +7 (915) 212 23 12
                </div>
              </div>
              <div class="cards__bot flex justify-between">
                <div class="cards__tasks flex justify-between4 items-center gap-3">
                  Задачи
                  <div
                      class="cards__tasks-progress rounded-[.4rem] border-[.1rem] border-solid border-[#42526e] px-[.6rem] py-[.4rem]">
                    1/4
                  </div>
                </div>
                <div class="cards__responsible flex justify-between items-center gap-3">
                  Менеджер
                  <img src="../../assets/img/icon-avatar.svg" alt="person" class="person-img">
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="flex-flexCard bg-[#f4f5f7] rounded-[.8rem] mr-[1.6rem]">
          <div class="flex justify-between p-[1.6rem]">
            <div>Лид - <span>3</span></div>
            <div class="flex justify-between">
              <div>4</div>
              <div>4</div>
            </div>
          </div>
          <div>
            <a href="#"
               class="block min-h-[22.7rem] p-6 mr-[1.6rem] mb-[1.6rem] ml-[1.6rem] bg-[#ffffff] rounded-[.8rem]">
              <div class="cards__head flex justify-between">
                <div class="cards__head-item">09.09.2021</div>
                <div class="cards__head-item">ID: 3213</div>
              </div>
              <div class="cards__info flex justify-between">
                <div class="cards__info-item">Продажа</div>
                <div class="cards__info-item">$ 5 500 000</div>
              </div>
              <div class="u-client">
                <div class="u-client__item flex items-center">
                  <IconCardPerson/>
                  Роман
                </div>
                <div class="u-client__item flex items-center">
                  <IconCardMobile/>
                  +7 (915) 212 23 12
                </div>
              </div>
              <div class="cards__bot flex justify-between">
                <div class="cards__tasks flex justify-between4 items-center gap-3">
                  Задачи
                  <div
                      class="cards__tasks-progress rounded-[.4rem] border-[.1rem] border-solid border-[#42526e] px-[.6rem] py-[.4rem]">
                    1/4
                  </div>
                </div>
                <div class="cards__responsible flex justify-between items-center gap-3">
                  Менеджер
                  <img src="../../assets/img/icon-avatar.svg" alt="person" class="person-img">
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="flex-flexCard bg-[#f4f5f7] rounded-[.8rem] mr-[1.6rem]">
          <div class="flex justify-between p-[1.6rem]">
            <div>Лид - <span>3</span></div>
            <div class="flex justify-between">
              <div>4</div>
              <div>4</div>
            </div>
          </div>
          <div>
            <a href="#"
               class="block min-h-[22.7rem] p-6 mr-[1.6rem] mb-[1.6rem] ml-[1.6rem] bg-[#ffffff] rounded-[.8rem]">
              <div class="cards__head flex justify-between">
                <div class="cards__head-item">09.09.2021</div>
                <div class="cards__head-item">ID: 3213</div>
              </div>
              <div class="cards__info flex justify-between">
                <div class="cards__info-item">Продажа</div>
                <div class="cards__info-item">$ 5 500 000</div>
              </div>
              <div class="u-client">
                <div class="u-client__item flex items-center">
                  <IconCardPerson/>
                  Роман
                </div>
                <div class="u-client__item flex items-center">
                  <IconCardMobile/>
                  +7 (915) 212 23 12
                </div>
              </div>
              <div class="cards__bot flex justify-between">
                <div class="cards__tasks flex justify-between4 items-center gap-3">
                  Задачи
                  <div
                      class="cards__tasks-progress rounded-[.4rem] border-[.1rem] border-solid border-[#42526e] px-[.6rem] py-[.4rem]">
                    1/4
                  </div>
                </div>
                <div class="cards__responsible flex justify-between items-center gap-3">
                  Менеджер
                  <img src="../../assets/img/icon-avatar.svg" alt="person" class="person-img">
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="flex-flexCard bg-[#f4f5f7] rounded-[.8rem] mr-[1.6rem]">
          <div class="flex justify-between p-[1.6rem]">
            <div>Лид - <span>3</span></div>
            <div class="flex justify-between">
              <div>4</div>
              <div>4</div>
            </div>
          </div>
          <div>
            <a href="#"
               class="block min-h-[22.7rem] p-6 mr-[1.6rem] mb-[1.6rem] ml-[1.6rem] bg-[#ffffff] rounded-[.8rem]">
              <div class="cards__head flex justify-between">
                <div class="cards__head-item">09.09.2021</div>
                <div class="cards__head-item">ID: 3213</div>
              </div>
              <div class="cards__info flex justify-between">
                <div class="cards__info-item">Продажа</div>
                <div class="cards__info-item">$ 5 500 000</div>
              </div>
              <div class="u-client">
                <div class="u-client__item flex items-center">
                  <IconCardPerson/>
                  Роман
                </div>
                <div class="u-client__item flex items-center">
                  <IconCardMobile/>
                  +7 (915) 212 23 12
                </div>
              </div>
              <div class="cards__bot flex justify-between">
                <div class="cards__tasks flex justify-between4 items-center gap-3">
                  Задачи
                  <div
                      class="cards__tasks-progress rounded-[.4rem] border-[.1rem] border-solid border-[#42526e] px-[.6rem] py-[.4rem]">
                    1/4
                  </div>
                </div>
                <div class="cards__responsible flex justify-between items-center gap-3">
                  Менеджер
                  <img src="../../assets/img/icon-avatar.svg" alt="person" class="person-img">
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="flex-flexCard bg-[#f4f5f7] rounded-[.8rem] mr-[1.6rem]">
          <div class="flex justify-between p-[1.6rem]">
            <div>Лид - <span>3</span></div>
            <div class="flex justify-between">
              <div>4</div>
              <div>4</div>
            </div>
          </div>
          <div>
            <a href="#"
               class="block min-h-[22.7rem] p-6 mr-[1.6rem] mb-[1.6rem] ml-[1.6rem] bg-[#ffffff] rounded-[.8rem]">
              <div class="cards__head flex justify-between">
                <div class="cards__head-item">09.09.2021</div>
                <div class="cards__head-item">ID: 3213</div>
              </div>
              <div class="cards__info flex justify-between">
                <div class="cards__info-item">Продажа</div>
                <div class="cards__info-item">$ 5 500 000</div>
              </div>
              <div class="u-client">
                <div class="u-client__item flex items-center">
                  <IconCardPerson/>
                  Роман
                </div>
                <div class="u-client__item flex items-center">
                  <IconCardMobile/>
                  +7 (915) 212 23 12
                </div>
              </div>
              <div class="cards__bot flex justify-between">
                <div class="cards__tasks flex justify-between4 items-center gap-3">
                  Задачи
                  <div
                      class="cards__tasks-progress rounded-[.4rem] border-[.1rem] border-solid border-[#42526e] px-[.6rem] py-[.4rem]">
                    1/4
                  </div>
                </div>
                <div class="cards__responsible flex justify-between items-center gap-3">
                  Менеджер
                  <img src="../../assets/img/icon-avatar.svg" alt="person" class="person-img">
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="flex-flexCard bg-[#f4f5f7] rounded-[.8rem] mr-[1.6rem]">
          <div class="flex justify-between p-[1.6rem]">
            <div>Лид - <span>3</span></div>
            <div class="flex justify-between">
              <div>4</div>
              <div>4</div>
            </div>
          </div>
          <div>
            <a href="#"
               class="block min-h-[22.7rem] p-6 mr-[1.6rem] mb-[1.6rem] ml-[1.6rem] bg-[#ffffff] rounded-[.8rem]">
              <div class="cards__head flex justify-between">
                <div class="cards__head-item">09.09.2021</div>
                <div class="cards__head-item">ID: 3213</div>
              </div>
              <div class="cards__info flex justify-between">
                <div class="cards__info-item">Продажа</div>
                <div class="cards__info-item">$ 5 500 000</div>
              </div>
              <div class="u-client">
                <div class="u-client__item flex items-center">
                  <IconCardPerson/>
                  Роман
                </div>
                <div class="u-client__item flex items-center">
                  <IconCardMobile/>
                  +7 (915) 212 23 12
                </div>
              </div>
              <div class="cards__bot flex justify-between">
                <div class="cards__tasks flex justify-between4 items-center gap-3">
                  Задачи
                  <div
                      class="cards__tasks-progress rounded-[.4rem] border-[.1rem] border-solid border-[#42526e] px-[.6rem] py-[.4rem]">
                    1/4
                  </div>
                </div>
                <div class="cards__responsible flex justify-between items-center gap-3">
                  Менеджер
                  <img src="../../assets/img/icon-avatar.svg" alt="person" class="person-img">
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="flex-flexCard bg-[#f4f5f7] rounded-[.8rem] mr-[1.6rem]">
          <div class="flex justify-between p-[1.6rem]">
            <div>Лид - <span>3</span></div>
            <div class="flex justify-between">
              <div>4</div>
              <div>4</div>
            </div>
          </div>
          <div>
            <a href="#"
               class="block min-h-[22.7rem] p-6 mr-[1.6rem] mb-[1.6rem] ml-[1.6rem] bg-[#ffffff] rounded-[.8rem]">
              <div class="cards__head flex justify-between">
                <div class="cards__head-item">09.09.2021</div>
                <div class="cards__head-item">ID: 3213</div>
              </div>
              <div class="cards__info flex justify-between">
                <div class="cards__info-item">Продажа</div>
                <div class="cards__info-item">$ 5 500 000</div>
              </div>
              <div class="u-client">
                <div class="u-client__item flex items-center">
                  <IconCardPerson/>
                  Роман
                </div>
                <div class="u-client__item flex items-center">
                  <IconCardMobile/>
                  +7 (915) 212 23 12
                </div>
              </div>
              <div class="cards__bot flex justify-between">
                <div class="cards__tasks flex justify-between4 items-center gap-3">
                  Задачи
                  <div
                      class="cards__tasks-progress rounded-[.4rem] border-[.1rem] border-solid border-[#42526e] px-[.6rem] py-[.4rem]">
                    1/4
                  </div>
                </div>
                <div class="cards__responsible flex justify-between items-center gap-3">
                  Менеджер
                  <img src="../../assets/img/icon-avatar.svg" alt="person" class="person-img">
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
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
<style>


</style>
