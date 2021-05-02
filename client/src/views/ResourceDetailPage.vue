<template>
    <Detail :resource="resource">
      <template #btnLink>
        <button @click="$router.go(-1)" class="btn btn-outline-success">返回</button>
      </template> 
    </Detail>
</template>

<script>
    import { useRoute } from "vue-router";
    import { toRefs, reactive, onMounted } from "vue";
    import { fetchResource } from "@/axios";
    import Detail from "@/components/Detail.vue";
    export default {
        components: {
            Detail,
        },
        setup() {
            const route = useRoute();
            const data = reactive({
                resource: null,
            });

            //生命周期钩子函数
            onMounted(async () => {
                data.resource = await fetchResource(route.params.id);
            });

            return { ...toRefs(data) };
        },
    };
</script>

<style scoped>
</style>