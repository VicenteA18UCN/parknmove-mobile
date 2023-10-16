<template>
    <ion-page>
      <!-- Navbar -->
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Reserva</ion-title>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button @click="goToCuenta">Cuenta</ion-button>
            <ion-button @click="goToReserva" color="light">Reserva</ion-button>
            <ion-button @click="goToHistorial">Historial</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <!-- Content -->
      <ion-content>
        <ion-card v-for="estacionamiento in estacionamientos" :key="estacionamiento.id">
          <ion-card-header>
            {{ estacionamiento.name }}
          </ion-card-header>
          <ion-card-content>
            <!-- Mostrar otros datos del estacionamiento aquí -->
            <p>Dirección: {{ estacionamiento.address }}</p>
            <p>Precio Base: {{ estacionamiento.base_price }}</p>
            <p>Pisos: {{ estacionamiento.floor_count }}</p>
            <p>Plazas por Piso: {{ estacionamiento.places_per_floor }}</p>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonRouterOutlet,
} from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Si estás utilizando Vue Router
  export default {
    data() {
      return {
        estacionamientos: [],
      };
    },
    methods: {
      async loadEstacionamientos() {
        try {
          const response = await fetch('http://localhost:4000/parking');
          if (response.ok) {
            const data = await response.json();
            this.estacionamientos = data;
          } else {
            console.error('Error al cargar datos de estacionamientos:', response.statusText);
          }
        } catch (error) {
          console.error('Error al cargar datos de estacionamientos:', error);
        }
      },
      goToCuenta() {
        this.$router.push('/cuenta'); // Ajusta la ruta según tus necesidades
      },
      goToReserva() {
        // Ya estamos en la página de Reserva
      },
      goToHistorial() {
        this.$router.push('/historial'); // Ajusta la ruta según tus necesidades
      },
    },
    mounted() {
      this.loadEstacionamientos();
    },
  };
  </script>
  