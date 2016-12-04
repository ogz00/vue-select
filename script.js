/**
 * Created by oguzhankaracullu on 01/12/2016.
 */
Vue.component('task', {
    template: '<li><slot></slot></li>'
});

Vue.component('task-list', {
    template: '<div> ' +
    '<task v-for="task in tasks">{{task.desc}}</task> ' +
    '</div>',
    data() {
        return {
            tasks: [
                {desc: 'Vegetables', complete: 'false'},
                {desc: 'Cheese', complete: 'false'},
                {desc: 'Tomatoes Juice', complete: 'false'},
                {desc: 'Whatever else humans are supposed to eat', complete: 'false'}
            ]
        }
    }
});

Vue.component('sendloop-message', {
    props: ['title', 'body'],
    data(){
        return {
            isVisible: true
        };
    },
    template: '<article class="message"> ' +
    '<div class="message-header">' +
    '{{title}} ' +
    '<a class="button is-small" @click="hideMessage">' +
    '<span class="icon">' +
    '<i class="fa fa-caret-square-o-down" aria-hidden="true"></i> </span>' +
    '</a></div>' +
    '<div v-show="isVisible" class="message-body">' +
    '{{body}}' +
    '</div>' +
    '</article>',
    methods: {
        hideMessage() {
            this.isVisible = !this.isVisible;
        }
    }
});
Vue.component('sendloop-message-list', {
    props: ['message'],
    template: '<div>' +
    '<sendloop-message v-for="message in messages" :title="message.title" :body="message.body">' +
    '</sendloop-message>' +
    '</div>',
    data(){
        return {
            messages: [
                {title: "title 1", body: "body 1"},
                {title: "title 2", body: "body 2"}
            ]
        }
    }
});

Vue.component('sendloop-modal', {
    template: '<div class="modal is-active">' +
    '<div class="modal-background"></div>' +
    '<div class="modal-content">' +
    '<div class="box">  <slot></slot></div>' +
    '</div>' +
    '<button class="modal-close" @click="$emit(\'close\')"></button></div>'
});

new Vue({
    el: '#root',
    data: {
        showModal: false
    }
});


Vue.component('sendloop-tabs', {
    template: '<div>' +
    '<div class="tabs">' +
    '<ul>' +
    '<li v-for="tab in tabs" :class="{\'is-active\': tab.isActive}">' +
    '<a :href="tab.href" @click="selectTab(tab)">{{tab.name}}</a></li>' +
    '</ul>' +
    '</div>' +
    '<div class="tabs-details">' +
    '<slot></slot>' +
    '</div> </div>',
    data(){
        return {tabs: []};
    },
    created(){
        this.tabs = this.$children;
    },
    methods: {
        selectTab(selectedTab){
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    }
});

Vue.component('sendloop-tab', {
    props: {
        name: {required: true},
        selected: {default: false}
    },
    template: '<div v-show="isActive"><slot></slot></div>',
    data() {
        return {isActive: false}
    },
    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, "-");
        }
    },
    mounted() {
        this.isActive = this.selected
    }
});

new Vue({
    el: '#tab'
});

Vue.component('sndlp-option', {
    template: '<i :class="[\'fa fa-\' + option.icon + \' fa-2x\']"></i>' +
    '<label>{{ option.label }}</label>',
    props: {
        label: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        }
    }

});


Vue.component('sendlp-select', {
    template: '<div class="btn-group sendlp-btn-group" style="width: 100%">' +
    '<button type="button" class="btn btn-default sendlp-first"><span><i :class="value && value.icon ? [\'fa fa-\' + value.icon + \' fa-2x\'] : icon ? [\'fa fa-\' + icon + \' fa-2x\'] : \'\'"></i>' +
    '</span><label>{{ value && value.label ? value.label : label ? label : \'\' }}</label></button>' +
    '<button class="btn btn-default dropdown-toggle sendlp-second" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    '<i class="fa fa-angle-down fa-2x"></i></button>' +
    '<ul class="dropdown-menu">' +
    '<li v-for="option in options" @click="select(option)">' +
    '<i :class="[\'fa fa-\' + option.icon + \' fa-2x\']"></i>' +
    '<label>{{ option.label }}</label>' +
    '</li>' +
    '</ul></div>',
    props: {
        searchFromServer: Boolean,
        value: {
            twoWay: true
        },
        label: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        options: {
            type: Array,
            required: false,
            default: []
        },
        action: {
            type: [String, Function]
        },
        actionLabel: {
            type: String
        },
        actionIcon: [String]
    },
    methods: {
        select(option) {
            this.value = option
        },
        doAction(func){
            () => {
                func;
            }
        }
    },
    mounted() {
        this.options.push({label: this.label, icon: this.icon});
    }
    /*data(){
     return {
     options: [
     {label: "title 1", icon: "fa fa-bluetooth"},
     {label: "title 2", icon: "fa fa-bluetooth"}
     ]
     }
     }*/

});





