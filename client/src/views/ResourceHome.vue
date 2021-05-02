<template>
    <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">数据</span>
                <span class="badge badge-secondary badge-pill">{{
                    getResourcesLength
                }}</span>
            </h4>
            <Search @onSearch="handleSearch($event)" />
            <List
                :resources="resources"
                @handleItemClick="selectResources"
                :activeId="selectedResource?._id"
            />
            <!-- 添加按钮 -->
            <!-- <button @click="addResource" class="btn btn-sm btn-primary">
                    添加数据
                </button> -->
        </div>
        <!-- 更新数据 Starts  -->
        <div class="col-md-8 order-md-1">
            <h4 class="mb-3">
                数据{{ selectedResource?._id }}
                <template v-if="getResourcesLength">
                    <button
                        :class="`btn btn-sm ${toggleBtnClass} mr-2`"
                        @click="isDetailView = !isDetailView"
                    >
                        {{ isDetailView ? "更新" : "详情" }}
                    </button>
                    <!-- 删除 -->
                    <Delete
                        :activeId="selectedResource?._id"
                        @onResourceDelete="handleResourceDelete"
                    />
                </template>
            </h4>
            <Update
                v-if="!isDetailView"
                :resource="selectedResource"
                @onUpdateResource="handleOnUpdateResource($event)"
            />
            <Detail :resource="selectedResource" v-else>
                <template #btnLink>
                    <router-link
                        class="btn btn-outline-success"
                        :to="{
                            name: 'detail',
                            params: { id: selectedResource._id },
                        }"
                        >详情</router-link
                    >
                </template>
            </Detail>
        </div>
        <!-- 更新数据 Ends -->
    </div>
</template>

<script>
    import { toRefs, reactive, computed, ref, onMounted } from "vue";

    import Search from "@/components/Search.vue";
    import List from "@/components/List.vue";
    import Update from "@/components/Update.vue";
    import Detail from "@/components/Detail.vue";
    import Delete from "@/components/Delete.vue";
    import { fetchResources, searchResource } from "@/axios";
    export default {
        name: "ResoureHome",
        components: {
            Search,
            List,
            Update,
            Detail,
            Delete,
        },
        setup() {
            const data = reactive({
                resources: [],
            });

            const isDetailView = ref(true);
            const selectedResource = ref({});

            //生命周期钩子函数
            onMounted(() => {
                getResources();
            });

            //computed
            const getResourcesLength = computed(() => {
                return data.resources.length;
            });

            const toggleBtnClass = computed(() => {
                return !isDetailView.value ? "btn-primary" : "btn-warning";
            });

            // method
            const addResource = () => {
                const _id = "_" + Math.random().toString(36).slice(2);
                const type = ["book", "blog", "video"][
                    Math.floor(Math.random() * 3)
                ];
                const newResource = {
                    _id,
                    title: `${_id} title`,
                    description: `${_id} description`,
                    link: "",
                    type,
                };

                data.resources.unshift(newResource);
            };

            const selectResources = (resource) => {
                selectedResource.value = resource;
            };

            const handleOnUpdateResource = (newResource) => {
                const index = data.resources.findIndex(
                    (resource) => resource._id === newResource._id
                );
                data.resources[index] = newResource;
                selectResources(newResource);
            };

            const handleResourceDelete = (newResource) => {
                const index = data.resources.findIndex(
                    (resource) => resource._id === newResource._id
                );
                data.resources.splice(index, 1);
                selectResources(data.resources[0] || {});
            };

            const getResources = async () => {
                const resources = await fetchResources();
                data.resources = resources;
            };

            const handleSearch = async (title) => {
                if (!title) {
                    getResources();
                    return;
                }

                data.resources = await searchResource(title);
                selectResources.value = null;
            };

            return {
                ...toRefs(data),
                getResourcesLength,
                isDetailView,
                addResource,
                toggleBtnClass,
                selectResources,
                selectedResource,
                handleOnUpdateResource,
                handleResourceDelete,
                handleSearch,
            };
        },
    };
</script>

<style>
</style>