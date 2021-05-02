<template>
    <form>
        <div v-if="alert?.success" class="alert alert-success">
            {{ alert.success }}
        </div>
        <div v-if="alert?.error" class="alert alert-danger">
            {{ alert.error }}
        </div>
        <div class="mb-3">
            <label htmlFor="firstName">标题</label>
            <input
                v-model="uResource.title"
                type="text"
                class="form-control"
                id="title"
                placeholder="标题...."
            />
        </div>
        <div class="mb-3">
            <label for="description">描述</label>
            <textarea
                v-model="uResource.description"
                class="form-control"
                id="description"
                placeholder="描述"
            ></textarea>
        </div>
        <div class="mb-3">
            <label htmlFor="type">类型</label>
            <select id="type" class="form-control" v-model="uResource.type">
                <option v-for="type in types" :key="type" :value="type">
                    {{ type }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label htmlFor="link">链接</label>
            <div class="input-group">
                <input
                    v-model="uResource.link"
                    type="text"
                    class="form-control"
                    id="link"
                    placeholder="链接...."
                />
            </div>
        </div>
        <hr class="mb-4" />
        <button
            @click="submitForm()"
            class="btn btn-primary btn-lg btn-block"
            type="button"
        >
            提交
        </button>
    </form>
</template>

<script>
    import { ref, watch } from "vue";
    export default {
        props: {
            resource: Object,
            alert: Object,
        },
        setup(props, context) {
            const uResource = ref(props.resource);
            const types = ["video", "music", "blog"];
            watch(
                () => props.resource,
                (resource, prevResource) => {
                    uResource.value = resource;
                }
            );
            const submitForm = () => {
                context.emit("onFormSumbit", uResource);
            };
            return { uResource, types, submitForm };
        },
    };
</script>

<style lang="scss" scoped>
</style>