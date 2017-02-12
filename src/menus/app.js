import * as Vue from 'vue/dist/vue.common.js';

export var vue_app = new Vue({
  data: {
    menus: [{
        "nome": "owncloud",
        "titulo": "Owncloud",
        "icone": "",
        "url": "http://owncloud.org"
    },{
        "nome": "gdrive",
        "titulo": "Google Drive",
        "icone": "",
        "url": "http://drive.google.com"
    }],
    iframeUrl: '',
    visibility: 'all'
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    abrirMenu: function (menu) {
        console.log(menu.url);
        this.iframeUrl = menu.url;
    },

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, value) {
      if (value) {
        el.focus()
      }
    }
  }
})
