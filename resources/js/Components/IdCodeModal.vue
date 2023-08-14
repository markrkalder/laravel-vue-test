<template xmlns="http://www.w3.org/1999/html">
    <div v-if="visible" class="modal-overlay">
        <div class="modal">
            <button @click="close">Close</button>
            <div class="modal-content">

                <text-input
                    class="idCodeInput"
                    placeholder="Enter Id Code"
                    label="ID Code"
                    v-model="idCode" />
                <button @click="validateIdCode" class="validateIdCodeButton">
                    Validate ID Code
                </button>
                <div id="idCodeValidationResult">
                    {{ idCodeValidationResult }} <br>
                    {{ idCodeDerived  }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from "../../../vendor/laravel/breeze/stubs/inertia-vue-ts/resources/js/Components/TextInput.vue";

import {isValidEstonianID} from "../Scripts/idCode.js";

export default {
    components: {TextInput},
    data() {
        return {
            idCode: '',
            idCodeValidationResult: '',
            idCodeDerived: ''
        }
    },
    props: ['visible'],
    methods: {
        close() {
            this.$emit('close');
        },
        validateIdCode() {
            const isValid = isValidEstonianID(this.idCode);
            if (!isValid) {
                this.idCodeValidationResult = 'Invalid ID Code';
                this.idCodeDerived = '';
                return;
            }
            this.idCodeValidationResult = 'Valid ID Code';
            this.idCodeDerived = isValid;
    }}

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
}

.modal-content button {
    margin-bottom: 20px;
    background: #f5f5f5;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    padding: 10px;
}

.modal-content button:hover {
    background: #e7e7e7;
}

.idCodeInput {
    margin: 20px;
    background: #ffffff;
}

#idCodeValidationResult {
    margin: 20px;
    align-content: center;
    text-align: center;
}

</style>
