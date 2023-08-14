<script setup>
import { ref, onMounted } from 'vue';
import Modal from '../Components/Modal.vue';
import IdCodeModal from "@/Components/IdCodeModal.vue";

const isModalVisible = ref(false);
const modalContent = ref('');

const isIdCodeModalVisible = ref(false);


const toggleIdCodeModal = () => {
    isIdCodeModalVisible.value = !isIdCodeModalVisible.value;
}

const prescriptions = ref([]);

const loadPrescriptions = async () => {
    try {
        const response = await fetch('/api/prescriptions');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        prescriptions.value = result.data; // Update this line to account for the data property
        console.log(result.data);
    } catch (error) {
        console.error('Error loading prescriptions:', error);
    }
};

onMounted(loadPrescriptions);

const showPrescription = async (id) => {
    try {
        const response = await fetch(`/api/prescriptions/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        modalContent.value = JSON.stringify(result.data.content);
        isModalVisible.value = true;
    } catch (error) {
        console.error('Error loading prescription:', error);
    }
};



</script>

<template>

    <div id="body">
        <h1>Prescriptions</h1>

<div id="prescriptions-button">
    <button id="toggleIdCodeModalButton" @click="toggleIdCodeModal">Show ID Validation</button>
</div>
        <div id="prescriptions">

            <ul>
                <li id="pres-val" v-for="(prescription, index) in prescriptions" :key="index">
                    <div id="prescriptions-li-item" @click="showPrescription(prescription.id)">
                        <div id="presc-name">{{ prescription.prescription_name }}</div>
                        <div id="presc-desc">{{ prescription.prescription_description }}</div>
                    </div>
                </li>
            </ul>
        </div>
        <Modal :visible="isModalVisible" @close="isModalVisible = false">
            {{ modalContent }}
        </Modal>

        <IdCodeModal :visible="isIdCodeModalVisible" @close="isIdCodeModalVisible = false">
        </IdCodeModal>
    </div>
</template>

<style scoped>

h1 {
    font-size: 2em;
    text-align: center;
    margin-bottom: 50px;
    color: #2e6e9e;
}
#body {
    max-width: 800px;
    align-content: center;
    margin: 50px auto;
    background: rgba(255, 255, 255, 0.5);
    padding: 20px;
    border-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

#prescriptions-li-item {
    list-style-type: none;
    margin: 5px;
    padding: 15px;
    overflow: hidden;
    border: 1px solid #e7e7e7;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
}

#toggleIdCodeModalButton {
    margin-bottom: 20px;
    background: #fff;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    padding: 10px;
    align-content: center;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
}

#prescriptions-button {
    margin: 0 auto;
    padding: 0;
    width: 100%;
    max-width: 800px;
    align-content: center;
    text-align: center;
}

#presc-desc {
    font-size: 0.8em;
    color: #2e6e9e;
}

#presc-name {
    font-size: 1.2em;
    color: #042133;
}


</style>
