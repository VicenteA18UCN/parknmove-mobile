<template>
  <ion-app>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>ParknMove</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goToCuenta">Cuenta</ion-button>
          <ion-button @click="goToReserva">Reserva</ion-button>
          <ion-button @click="goToHistorial">Historial</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script setup>
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonRouterOutlet,
} from '@ionic/vue';
import { ref } from 'vue';

const goToCuenta = () => {
  // Agrega aquí la lógica para redireccionar a la página de "Cuenta"
  console.log('Redirige a Cuenta');
};

const goToReserva = () => {
  // Redirige a la página de "Reserva"
  router.push('/reserva');
};

const goToHistorial = () => {
  // Agrega aquí la lógica para redireccionar a la página de "Historial"
  console.log('Redirige a Historial');
};

</script>
