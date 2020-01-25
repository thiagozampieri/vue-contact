<template>
  <div>
    <input
      id="id"
      type="hidden"
      class="input"
      v-model="newContact.id"
      @change="someHandler"
    >

    <md-content>
      <label for="name">Nome</label>
      <input
        id="name"
        type="text"
        class="input"
        v-model="newContact.name"
        required
        @change="someHandler"
      >
    </md-content>

    <md-content>
      <label for="phone">Telefone</label>
      <input
        id="phone"
        type="text"
        class="input"
        v-mask="['(##) #####-####']"
        v-model="newContact.phone"
        required
        @change="someHandler"
      >
    </md-content>
  </div>
</template>

<script>

import { mask } from 'vue-the-mask';

export default {
  props: {
    contact: Object,
  },
  data: ({ contact }) => ({
    newContact: { ...contact }
  }),
  directives: { mask },  
  methods: {
    someHandler (event) {
      this.newContact[event.target.id] = event.target.value;
      this.$emit('handle', this.newContact);    
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.input {
  width: 100%;
  padding: 8px 10px;
}

.md-content {
  display: flexbox;
  justify-content: left;
  align-items: left;
  width: 100%;
  padding: 10px 20px; 
}
</style>
