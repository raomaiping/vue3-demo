<template>
    <!-- 数据详情 Starts  -->
    <div class="card" v-if="!resource?._id">
        <div class="card-body">No Resource is selected :(</div>
    </div>
    <div v-else class="card">
        <div class="card-header">{{ resource?.title }}</div>
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <p>{{ resource?.description }}</p>
                <footer class="text-muted mb-2">{{ resource?.type }}</footer>
            </blockquote>
            <a
                target="_blank"
                :href="resource.link"
                class="btn btn-outline-primary mr-2"
                >访问</a
            >
            <slot name="btnLink"></slot>
        </div>
    </div>
    <!-- 数据详情 Ends  -->
</template>

<script>
    export default {
        props: {
            resource: {
                validator: (prop) =>
                    typeof prop === "object" || typeof prop === "null",
                required: true,
            },
        },
    };
</script>

<style >
</style>