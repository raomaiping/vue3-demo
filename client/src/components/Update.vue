<template>
    <Form
        :resource="resource"
        :alert="alert"
        @onFormSumbit="handleUpdate($event)"
    />
</template>

<script>
    import Form from "@/components/Form.vue";
    import { watch, reactive, toRefs, onBeforeUnmount } from "vue";
    import { updateResources } from "@/axios";
    export default {
        props: {
            resource: {
                type: Object,
                required: true,
            },
        },
        components: { Form },
        setup(props, context) {
            const data = reactive({
                alert: { success: null, error: null },
                timeOutId: null,
            });

            watch(
                () => props.resource,
                (resource, prevResource) => {
                    if (resource && resource._id !== prevResource._id) {
                        clearAlertTimeout();
                        data.alert = initAlert();
                    }
                }
            );

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
                }, 3000);
            };
            const handleUpdate = async (uResource) => {
                try {
                    const updateResource = await updateResources(
                        uResource.value._id,
                        uResource.value
                    );
                    context.emit("onUpdateResource", updateResource);
                    setAlert("success", "Resource was updated");
                } catch (errorMessage) {
                    setAlert("error", errorMessage);
                }
            };

            return { ...toRefs(data), handleUpdate };
        },
    };
</script>

<style >
</style>