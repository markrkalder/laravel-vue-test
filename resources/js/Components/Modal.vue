<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal">
            <button @click="close">Close</button>
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['visible'],
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(142, 156, 148, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 80%;
    overflow: auto;
}

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}
</style>
