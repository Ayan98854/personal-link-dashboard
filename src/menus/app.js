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
    open_menus: [{
        "nome": "homepage",
        "titulo": "Homepage",
        "icone": "",
        "url": "homepage.html"
    }],
    iframeUrl: '',
    iframeHeight: 0,
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    abrirMenu: function (menu) {

        var els = this.open_menus.filter(function(el) {
            console.log(menu);
            return el.nome === menu.nome;
        });

        if (els.length == 0) {
            this.open_menus.push(menu);
            this.iframeHeight = (($(window).height() - $(".navbar-static-top").outerHeight()) );
        }

        Vue.nextTick(function () {
              $('.nav-tabs a[href="#' + menu.nome + '"]').tab('show');
        });
    },

    fecharMenu: function(menu) {
        var self = this;
        this.open_menus.map(function(el, index) {
            if (el.nome === menu.nome) {
                self.open_menus.splice(index, 1);
            }
        });
    }

  }

});
