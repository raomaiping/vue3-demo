<template>
    <!-- {/* 搜索框 start */} -->
    <form class="card p-2">
        <div class="input-group">
            <input @keyup="$emit('onSearch',$event.target.value)" type="text" class="form-control" placeholder="写点啥..." />
            <div class="input-group-append">
                <button type="submit" class="btn btn-secondary">搜索</button>
            </div>
        </div>
    </form>
    <!-- {/* 搜索框 Ends */} -->
</template>

<script>
    export default {};
</script>

<style >
</style>