<template>
  <div>
    <md-dialog
      :md-active.sync="visible"
    >
    <md-dialog-title>Registro</md-dialog-title>
      <Form :contact="contact" @handle="setContact" />
      <md-dialog-actions>
        <md-button class="md-primary" @click="close">Cancelar</md-button>
        <md-button class="md-primary" @click="saveContact">Salvar</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
 import Form from './Form';

  export default {
    name: 'DialogPrompt',    
    data: () => ({
      newContact: { ...this.contact },
    }),
    props: {
      visible: Boolean,
      contact: Object,
      close: Function,
    },
    methods: {
      setContact(newContact) {
        this.newContact = newContact;
      },
      saveContact () {
        const { id, name, phone } = this.newContact;
        const nameSplitted = (name || "").split(" ");
        const phoneSanitize = phone.replace(/\(/gi, "").replace(/\)/gi, "").replace(/\-/gi, "").replace(/ /gi, "");
        
        if (nameSplitted.length > 1 && nameSplitted[0].length > 2 && phoneSanitize.length === 11) {
          this.$emit('save', { id, name, phone: phoneSanitize });
          this.newContact = { ...this.contact };
          this.close();
        }
      }
    },
    components: {
      Form
    }
  }
</script>
