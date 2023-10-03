<script>
export default {
    name: 'ComponentSearchbar',
    data() {
        return {
            searchCity: "",
        }
    }
}
</script>

<template>
    <div class="search-bar">
        <input v-model.trim="searchCity" type="text" class="form-control"
            placeholder="Cerca una città o indirizzo completo">
        <button class="btn btn-search bg-white " type="button">
            <i class="fa-solid fa-magnifying-glass-location"></i>
        </button>
    </div>
</template>

<style lang="scss">
.search-bar {
    position: absolute;
    top: 70%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    width: 300px;
    box-shadow: 0px 0px 49px 10px rgba(37, 221, 133, 0.7);

    .form-control {
        border: 0;
        font-size: 0.7rem;
        position: relative;
    }

    .btn-search {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .fa-magnifying-glass-location {
            color: #25dd85;
        }
    }

    .form-control:focus {
        box-shadow: none;
        border-color: white;
    }

    .btn-search:active {
        border-color: white;
    }
}
</style>