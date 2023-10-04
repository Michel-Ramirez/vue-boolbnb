<script>
export default {
    data() {
        return {
            datiModulo: {
                room_number: '',
                beds_number: '',
                distance_number: '',
                services: {
                    wifi: false,
                    tv: false,
                    air_condition: false,
                    double_bed: false,
                    fire_place: false,
                    dryer: false,
                    washer: false,
                    kitchen: false,
                    breakfast: false,
                    parking: false,
                    swimming_pool: false,
                    sauna: false,
                    gym: false,
                    seafront: false,
                    animal_permissing: false,
                },
            },
        };
    }
}
</script>
<template>
    <section class="container-sm container-xxl ">
        <div class="row">
            <div class="col-4 sidebar">
                <h4>FILTRI</h4>
            </div>
            <div class="col-8 search-result">
                <h2>CARDS</h2>
                <HouseCard v-if="searchResult.length" />
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.offcanvas.offcanvas-start {
    width: 100%;
}
</style>