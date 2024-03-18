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
                          <span v-if="object.distance_from_mkad.value">{{ object.distance_from_mkad.value + ' км' }}</span>
                        </div>
                        <p v-if="object.district_id.value">{{ object.district_id.value }}</p>
                        <p v-if="object.highway.value">{{`${object.highway.value}`}} ш.</p>
                        <p v-if="object.place.value">{{`${object.place.value}`}}</p>
                        <p class="opacity-[.6] mt-[1rem]">{{ object.id + ' | ' + object.date_create.date }}</p>
                    </div>
                </div>
                <div class=" flex flex-col gap-[.5rem] justify-center">
                    <p v-if="object.land_area.value">{{`${object.land_area.value} сот.`}}</p>
                    <p v-if="object.price.formated">от {{ object.price.currency + " " +  object.price.formated}}</p>
                </div>
                <div class=" flex justify-center">
                  <div class="m-auto">
                    <p v-if="object.open_water.value">{{`${object.open_water.name}`}}: {{`${object.open_water.value}`}}</p>
                    <p v-if="object.security.value">{{`${object.security.name}`}}: {{`${object.security.value}`}}</p>
                  </div>
                </div>
                <div class=" flex" >
                  <div class="my-auto" v-if="object.active == 'Y'">Опубликован</div>
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
