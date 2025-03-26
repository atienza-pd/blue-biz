<template>
  <Alert v-if="show" :show="show" :type="type" :message="message" @close="show = false" />
</template>

<script setup lang="ts">
import Alert from '@/components/Alert/TheAlert.vue';
import { useEventBus } from '@/shared/event-bus/event-bus';
import { ref } from 'vue';

const show = ref(false);
const type = ref<'success' | 'error' | 'warning' | 'info'>('success');
const message = ref('');

const { on } = useEventBus();

on('alert', (payload: unknown) => {
  const alertPayload = payload as { type: 'success' | 'error' | 'warning' | 'info'; message: string };
  type.value = alertPayload.type;
  message.value = alertPayload.message;
  show.value = true;

  setTimeout(() => {
    show.value = false;
  }, 3000);
});
</script>
