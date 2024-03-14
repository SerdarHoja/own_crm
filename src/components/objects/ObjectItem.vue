<template>
  <div class="cards-objects">
    <a-card
        :extra="extra"
        style="width:
        100%" @click="goToDetails"
    >

      <div class="flex gap-5">
        <div class="w-1/5 flex">
          <img
              class="w-[15rem] h-[10rem] rounded-[.4rem] mr-[1.6rem]"
              :src="object.picture"
              alt=""
          />
          <div class="flex flex-col justify-center">
            <div class="font-bold" v-if="object.name">
              {{ object.name }},
              <span v-if="object.distance_from_mkad.value != 'null'">
                {{object.distance_from_mkad.value + " км" }}
              </span>
            </div>
            <p v-if="object.district_id">
              {{ object.district_id.value }}
            </p>
            <p class="opacity-[.6]">
              {{ object.id + " | " + object.date_create.date }}
            </p>
          </div>
        </div>
        <div class="w-1/6 flex flex-col gap-[.5rem] justify-center">
          <p v-if="object.deal_view && object.deal_view.value">
            {{ object.deal_view.value }}
          </p>
          <p v-if="object.price && object.price.currency && object.price.formated">
            {{ object.price.currency + " " + object.price.formated }}
          </p>
          <div class="flex gap-4 items-center" v-if="object.broker">
            <img
              :src="object.broker.picture"
              class="w-[1.8rem] h-[1.8rem] rounded-full"
              alt=""
              v-if="object.broker.picture"
            />
            <p v-if="object.broker.fio">{{ object.broker.fio }}</p>
          </div>
          <div
              class="!border border-solid !border-[#2884ff] py-[.6rem] px-[1.2rem] w-max text-[#007aff] rounded-[.4rem]"
              v-if="object.actual_date && object.actual_date.value"
          >
            {{ object.actual_date.value }}
          </div>
        </div>
        <div class="w-1/6 flex justify-center">
          <div class="m-auto">
            <span v-if="object.house_number.value"
            >{{ object.house_number.name }}:
            {{ object.house_number.value }} |</span
            >
            <span v-if="object.flat_area.value"
            >{{ object.flat_area.name }} : {{ object.flat_area.value }} м<sup>2</sup> |</span
            >
            <span v-if="object.floors_count.value"
            >{{ object.floors_count.name }}:
            {{ object.floors_count.value }} | </span
            >
            <span v-if="object.rooms_count.value"
            >{{ object.rooms_count.name }}: {{ object.rooms_count.value }}</span
            >
          </div>
        </div>
        <div class="w-1/6 flex flex-col justify-center">
          <p >
            {{ object.owners[0] ? object.owners[0].fio : "" }}
          </p>
          <p >
            {{ object.owners[0] ? object.owners[0].phone : "" }}
          </p>
          <p >
            {{ object.owners[0] ? object.owners[0].email : "" }}
          </p>
        </div>
        <div class="w-1/6 flex flex-col justify-center" v-if="object.status.value">
          {{ object.status.value }}
        </div>
        <div class="w-1/6">
          <div class="flex gap-5 items-center">
            <p v-if="object.upload_avito && object.upload_avito.value === 'Да'">
              <img
                class="w-10 h-10"
                src="/src/assets/img/sprite.svg#icon-avito"
                alt=""
              />
            </p>
            <p
              v-if="
                object.upload_domclick && object.upload_domclick.value === 'Да'
              "
            >
              <img
                class="w-10 h-10"
                src="/src/assets/img/sprite.svg#icon-domclick"
                alt=""
              />
            </p>
            <p
              v-if="object.upload_yandex && object.upload_yandex.value === 'Да'"
            >
              <img
                class="w-10 h-10"
                src="/src/assets/img/sprite.svg#icon-yandex"
                alt=""
              />
            </p>
            <p v-if="object.upload_cian && object.upload_cian.value === 'да'">
              <img
                class="w-10 h-10"
                src="/src/assets/img/sprite.svg#icon-cian"
                alt=""
              />
            </p>
              >
                <img
                    class="w-10 h-10"
                    src="http://level-crm.deus.team//img/sprite.svg#icon-domclick"
                    alt=""
                />
              </p>
              <p
                  v-if="object.upload_yandex && object.upload_yandex.value === 'Да'"
              >
                <img
                    class="w-10 h-10"
                    src="http://level-crm.deus.team//img/sprite.svg#icon-yandex"
                    alt=""
                />
              </p>
              <p v-if="object.upload_cian && object.upload_cian.value === 'да'">
                <img
                    class="w-10 h-10"
                    src="http://level-crm.deus.team//img/sprite.svg#icon-cian"
                    alt=""
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>
<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  object: Object,
});

const open = ref(false);

const showModal = () => {
  open.value = true;
};

const goToDetails = () => {
  router.push("/objects/" + props.object.id);
};
</script>

<style scoped>
.cards-objects {
  color: #253858 !important;
  font-size: 1.4rem !important;
}
</style>
