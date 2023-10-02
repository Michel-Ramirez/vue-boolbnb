<script>
export default {
    props: {
        evHouse: Object
    }
}
</script>

<template>
    <div class="card">
        <img :src="evHouse.photo" class="card-img-top" alt="jumbo">
        <div class="card-body">
            <h6>{{ evHouse.name }}</h6>
            <div class="evidence-services m-0 mb-3">
                <span>stanze {{ evHouse.total_rooms }}</span> |
                <span>letti {{ evHouse.total_beds }}</span> |
                <span>nagni {{ evHouse.total_bath }}</span> |
                <span>mq {{ evHouse.mq }}</span>
            </div>
            <p class="address m-0">{{ evHouse.address.home_address }}</p>
            <div><strong>{{ evHouse.night_price }} /Notte</strong></div>
        </div>
    </div>
</template>

<style lang="scss" scoped> .card {
     width: 25rem;

     .card-img-top {
         height: 350px;
         object-fit: cover;
     }

     .evidence-services {
         font-size: 0.6rem;
         font-weight: 600;
     }

 }

 @media screen and (min-width: 996px) {
     .card {
         width: 25rem;
     }
 }
</style>