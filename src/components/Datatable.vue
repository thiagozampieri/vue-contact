<template>
  <div class="md-layout md-gutter">
    <Dialog :visible="status" :close="close" :contact="newContact" @save="saveContact" />
    <div class="md-layout-item md-size-100">
      <md-table 
        v-model="contacts" 
        md-card 
        @md-selected="onSelects" 
        md-sort="name" 
        md-sort-order="asc" 
        md-fixed-header
      >
        <md-table-toolbar class="md-contanier">
          <div class="md-layout">
            <div class="md-layout-item md-layout md-gutter">
              <img src="../assets/logo.png" class="md-layout-item md-size-15" width="50">
              <h1>Meus Contatos</h1>
            </div>
            <div class="md-layout-item md-layout md-alignment-center-right">              
              <md-button class="md-primary" @click="open">Novo Registro</md-button>              
            </div>
          </div>
        </md-table-toolbar>

        <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
          <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" @click="removeContacts">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </md-table-toolbar>

        <md-table-row :class="getClass(item)" slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
          <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Telefone" md-sort-by="phone">{{ item.phone | phone }}</md-table-cell>
          <md-table-cell md-label="Ações" width="250">
            <md-button class="md-icon-button md-default" @click="(e) => {
                e.stopPropagation(); 
                onSelect(item);
                status = true;
              }">
              <md-icon>edit</md-icon>
            </md-button>

            <DeleteConfirm :remove="removeContact" :item="item" />
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
  import Dialog from './Dialog';
  import DeleteConfirm from './DeleteConfirm';

  let index = 0;
  const backup = { id: null, name: '', phone: '' };

  export default {
    name: 'TableMultiple',
    data: () => ({
      status: false,
      visible: false,
      newContact: backup,
      selected: [],
      contacts: []
    }),
    methods: {
      onSelects (items) {
        this.selected = items
      },
      removeContacts () {
        const ids = this.selected.reverse();
        ids.forEach(item => {
          this.removeContact (item.id);
        })
      },
      getClass ({ phone }) {
        return phone.substring(0, 2) === '11' ? 'md-bg-blue' : 'md-default'
      },
      getAlternateLabel (count) {
        const plural = (count > 1) ? '' : 's';
        return `${count} contact${plural} selected`
      },
      saveContact (newContact) {
        const { id, name, phone } = newContact;
        if (!name || !phone) return;

        if (id) {          
          const foundIndex = this.contacts.findIndex(contact => contact.id === id);
          this.contacts.splice(foundIndex, 1, {
            id,
            name,
            phone 
          });
        } else {     
          const found = this.contacts.find(contact => contact.phone === phone);
          if (!found) {
            this.contacts.push({
              id: this.contacts.length + 1,
              name,
              phone 
            });
          }
        }

        this.newContact = backup;
      },
      onSelect(item) {        
        const { id, name, phone } = item;
        this.newContact = { id, name, phone };
      },
      removeContact (idToRemove) {
        this.contacts = this.contacts.filter(item => {
          return item.id !== idToRemove
        })
      },
      open() {
        this.status = true;
      },
      close () {
        this.status = false;
      }
    },
    components: {
      Dialog,
      DeleteConfirm
    }
  }
</script>

<style lang="scss" scoped>
  @import './src/variables.scss';

  .md-table + .md-table {
    margin-top: 16px
  }

  .md-bg-blue {
    background: $blue-color;
  }

  .md-contanier {
    display: flex;
  }
</style>