<template>
    <Form
        :resource="resource"
        :alert="alert"
        @onFormSumbit="handleCreate($event)"
    />
</template>

<script>
    import Form from "@/components/Form.vue";
    import { createResources } from "@/axios";
    import { reactive, toRefs, onBeforeUnmount } from "vue";
    import { useRouter } from "vue-router";
    export default {
        components: { Form },
        setup() {
            const router = useRouter()
            const data = reactive({
                resource: {
                    title: "",
                    description: "",
                    type: "video",
                    link: "",
                },
                alert: { success: null, error: null },
                timeOutId: null,
            });

            const initAlert = () => {
                return { success: null, error: null };
            };

            onBeforeUnmount(() => {
                clearAlertTimeout();
            });
            const clearAlertTimeout = () => {
                data.timeOutId && clearTimeout(data.timeOutId);
            };

            const setAlert = (type, message) => {
                data.alert = initAlert();
                data.alert[type] = message;

                data.timeOutId = setTimeout(() => {
                    data.alert = initAlert();
                    router.push({
                      name:"home"
                    })
                }, 2000);
            };

            const handleCreate = async (resource) => {
                try {
                    await createResources(resource.value);
                    setAlert("success", "Resource was created");
                } catch (errorMessage) {
                    setAlert("error", errorMessage);
                }
            };

            return { ...toRefs(data), handleCreate };
        },
    };
</script>

<style lang="sass" scoped>
</style>