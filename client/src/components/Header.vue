<template>
    <!-- header starts -->
    <div class="py-5 text-center">
        <img height="150" src="http://q1.qlogo.cn/g?b=qq&nk=2582395486&s=100&t=" alt="" />
        <h2>前端小菜鸟吖</h2>
        <p class="lead">前端小菜鸟的vue3练习之旅!</p>
        <router-link :to="{name:'home'}" class="btn btn-outline-primary mr-2">首页</router-link>
        <router-link :to="{name:'new'}" class="btn btn-outline-primary">添加</router-link>
    </div>
    <!-- header ends -->
</template>

<script>
    export default {};
</script>

<style >
</style>