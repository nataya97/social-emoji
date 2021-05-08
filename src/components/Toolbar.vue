<template>
    <v-toolbar
            class="v-toolbar">
        <v-toolbar-title
                class="v-toolbar-title">
            {{this.toolbarTitle}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div
                class="v-toolbar-icons">
            <v-icon
                    class="v-icon"
                    v-on:click="changeRoute()">{{this.icon}}
            </v-icon>

            <!-- DIALOG DIALOG DIALOG -->
            <Dialog
                    class="v-icon"></Dialog>
            <v-icon
                    append-icon=mdi-checkbox-multiple-blank-circle
                    class="v-icon">
                mdi-bell-outline
            </v-icon>
        </div>

    </v-toolbar>
</template>

<script>
    import router from '../router'
    import Dialog from "./Dialog";

    export default {
        name: "Toolbar",
        components: {Dialog},
        data: () => ({
            toolbarTitle: '',
            icon: ''
        }),
        mounted() {
            this.changeToolbarTitle();
        },

        methods: {
            changeToolbarTitle() {
                if (router.currentRoute.path === '/discovery') {
                    this.toolbarTitle = 'Discovery Page';
                    this.icon = 'mdi-home-circle-outline';
                } else {
                    this.toolbarTitle = 'Username Feed';
                    this.icon = 'mdi-compass-outline';
                }
            },
            changeRoute() {
                if (router.currentRoute.path === '/discovery') {
                    router.push({name: 'Feed'});
                } else {
                    router.push({name: 'Discovery'});
                }
            }
        }
    }

</script>


<style lang="scss" scoped>

    .v-toolbar {
        margin-bottom: 35px;
        text-align: center;
        background-color: rgb(78, 73, 75) !important;
    }

    .v-toolbar-title {
        text-align: center;
        color: #BCA5AF;
        letter-spacing: 3px;
    }

    .v-toolbar-icons {
        display: flex;
    }

    .v-icon.v-icon {
        margin-right: 5px;
        margin-left: 5px;
        color: #BCA5AF;
    }

</style>
