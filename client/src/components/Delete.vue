<template>
    <button class="btn btn-sm btn-danger" @click="handleDeleteResource()">
        删除
    </button>
</template>

<script>
    import { deleteResources } from "@/axios";
    export default {
        props: {
            activeId: String,
        },
        setup(props, context) {
            const handleDeleteResource = async () => {
                const deleteResource = await deleteResources(props.activeId);
                context.emit("onResourceDelete",deleteResource)
            };

            return { handleDeleteResource };
        },
    };
</script>

<style lang="scss" scoped>
</style>