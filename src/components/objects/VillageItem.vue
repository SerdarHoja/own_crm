<template>
    <div class="cards-objects">
        <a-card :extra="extra" style="width: 100%;" @click="goToDetails">
            <div class="grid grid-col-cast gap-5">
                <div class=" flex">
                    <img
                        class="w-[15rem] h-[10rem] rounded-[.4rem] mr-[1.6rem]"
                        :src="object.picture"
                        alt=""
                    />
                    <div class="flex flex-col justify-center">
                        <div class="font-bold" v-if="object.name">
                          {{ object.name }},
                          <span v-if="object.distance_from_mkad.value">
                            {{ object.distance_from_mkad.value + ' км' }}
                          </span>
                        </div>
                        <p v-if="object.district_id.value">{{ object.district_id.value }}</p>
                        <p v-if="object.highway.value">{{`${object.highway.value}`}} ш.</p>
                        <p v-if="object.place.value">{{`${object.place.value}`}}</p>
                        <p class="opacity-[.6] mt-[1rem]">{{ object.id + ' | ' + object.date_create.date }}</p>
                    </div>
                </div>
                <div class=" flex flex-col gap-[.5rem] justify-center">
                    <p v-if="object.land_area.value">{{`${object.land_area.value} м2`}}</p>
                    <p v-if="object.deal_view">{{`${ object.deal_view.value}` }}</p>
                    <p v-if="object.price.formated">{{ object.price.currency + " " +  object.price.formated}}</p>
                    <div class="flex gap-4 items-center" v-if="object.broker.fio">
                        <img :src="object.broker.picture" class="w-[1.8rem] h-[1.8rem] rounded-full" alt="">
                        <p class="text-xl text-slate-600">{{ object.broker.fio }}</p>
                    </div>
                    <div class="!border border-solid !border-slate-900 !text-slate-900 py-[.6rem] px-[1.2rem] w-max" v-if="object.actual_date">{{ object.actual_date.value }}</div>
                </div>
                <div class=" flex justify-center">
                  <div class="m-auto">
                    <span v-if="object.flat_area">{{ object.flat_area.name }} : {{ object.flat_area.value }} |</span>
                  </div>
                </div>
                <div class=" flex flex-col justify-center gap-[.5rem]">
                    <p class="flex gap-[.5rem]">
                      <IconContPerson/>
                      {{ object.owners[0] ? object.owners[0].fio : '' }}
                    </p>
                    <p class="flex gap-[.5rem]">
                      <IconContPhone/>
                      {{ object.owners[0] ? object.owners[0].phone : '' }}
                    </p>
                    <p>{{ object.owners[0] ? object.owners[0].email : '' }}</p>
                </div>
                <div class="" v-if="object.status">
                    {{ object.status.value }}
                </div>
            </div>
        </a-card>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import IconContPerson from "@/components/icons/IconContPerson.vue";
import IconContPhone from "@/components/icons/IconContPhone.vue";
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
  router.push("/villages/" + props.object.id);
};
</script>

<style scoped>
.cards-villages{
  color: #253858!important;
  font-size: 1.4rem!important;
}
</style>
