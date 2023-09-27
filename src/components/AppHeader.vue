<script>
export default {

}
</script>

<template>
    <header class="d-flex justify-content-between align-items-center container-xxl my-3">
        <div>
            <a href="/"><img class="img-fluid" src="../../public/img/logo_navbar.png" alt=""></a>
        </div>
        <div>
            <a class="user" href=""><i class="fa-solid fa-circle-user fa-2xl"></i></a>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    height: 100px;

    div {

        a {
            display: block;
            height: 100px;


            img {
                height: 100%;
            }
        }

        i {
            color: #25dd85;

            &:hover {
                color: black;
                cursor: pointer;
            }
        }

        .user {
            height: 100%;
        }
    }
}
</style>