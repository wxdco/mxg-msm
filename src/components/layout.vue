<template>
    <div>
        <app-header></app-header>
        <app-aside></app-aside>
        <app-main></app-main>
    </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppAside from './AppAside'
import AppMain from './AppMain'

export default {
    components : {AppHeader,AppAside,AppMain}
}
</script>

<style scoped>
    .header {
        position: absolute;
        line-height: 50px;
        top: 0px;
        right: 0px;
        left: 0px;
        background-color: #2d3a4b
    }
    .aside {
        position: absolute;
        width: 230px;
        top: 50px;
        left: 0px;
        bottom: 0px;;
        overflow-y: auto;
        background-color: #545c64
    }
    .main {
        position: absolute;
        top: 50px;
        left: 230px;
        right: 0px;
        bottom: 0px;
        padding: 10px;
        overflow-y: auto;
    }
</style>