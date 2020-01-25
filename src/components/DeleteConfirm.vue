<template>
  <div style="display: inline">
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Deseja remover esse item?"
      md-confirm-text="Sim"
      md-cancel-text="Não"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />

    <md-button class="md-icon-button md-default" @click="(e) => { e.stopPropagation(); active = true }" >
      <md-icon>delete</md-icon>
    </md-button> 
  </div>
</template>

<script>
  export default {
    name: 'DeleteConfirm',
    data: () => ({
      active: false,
      value: null
    }),
    props: {
      item: Object,
      remove: Function
    },
    methods: {
      onConfirm (e) {
        this.remove(this.item.id);
        this.active = false;
      },
      onCancel () {
        this.active = false;
      }
    }
  }
</script>