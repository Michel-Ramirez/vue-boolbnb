<script>
import axios from 'axios';
export default {
    data() {
        return {
            houseData: [],
        }
    },
    methods: {
        fetchData() {
            const endpoint = 'http://127.0.0.1:8000/api/houses/';
            const houseId = this.$route.params.id;
            axios.get(endpoint + houseId).then((res) => {
                this.houseData.push(res.data)
            }).catch().then()
        }
    },
    created() {
        this.fetchData();
    }

}
</script>
<template>
    <section>
        {{ houseData }}
    </section>
</template>
<style></style>