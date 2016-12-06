/**
 * Created by oguzhankaracullu on 01/12/2016.
 */



var app = new Vue();

Vue.component('sendlp-option', {
    props: {
        value: {required: false},
        icon: {required: false},

    },
    template: '<li @click="setSelect()">' +
    '<i :class="[\'fa fa-\' + icon + \' fa-2x\']"></i>' +
    '<slot></slot>' +
    '</li>',
    methods: {
        setSelect(){
            json = {
                label: this.$slots.default[0].text,
                icon: this.icon,
                value: this.value
            };
            app.$emit('updateSelect', json);

        }
    }
});

Vue.component('sendlp-select', {
    template: '<div><div class="btn-group sendlp-btn-group" style="width: 100%">' +
    '<button type="button" class="btn btn-default sendlp-first"><span><i :class="value && value.icon ? [\'fa fa-\' + value.icon + \' fa-2x\'] : icon ? [\'fa fa-\' + icon + \' fa-2x\'] : \'\'"></i>' +
    '</span><label>{{ value && value.label ? value.label : label ? label : \'\' }}</label></button>' +
    '<button class="btn btn-default dropdown-toggle sendlp-second" type="button" data-toggle="dropdown" ' +
    'aria-haspopup="true" aria-expanded="false" @click="getData(dataSourceUrl)">' +
    '<i class="fa fa-angle-down fa-2x"></i></button>' +
    '<ul class="dropdown-menu">' +
    '<li v-show="searchFromServer">' +
    '<div class="progress">' +
    '<div class="progress-bar-info progress-bar progress-bar-striped active" role="progressbar"' +
    'aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:100%">Loading' +
    '</div></div>' +
    '</li>' +
    '<li v-show="remoteOptions.length == 0  && dataSourceUrl != undefined && !serverError">{{blankText}}</li>' +
    '<li v-show="!searchFromServer && !serverError" v-for="option in remoteOptions" @click="select(option)">' +
    '<i :class="[\'fa fa-\' + option.icon + \' fa-2x\']"></i>' +
    '<label>{{ option.label }}</label>' +
    '</li>' +
    '<li v-show="serverError" style="height: auto">' +
    '<div class="panel panel-default">' +
    '<div class="panel-heading">' +
    '<h4 class="panel-title"><span><i class="fa fa-exclamation-triangle"></i>{{errorText}}</span></h4>' +
    '</div>' +
    '<div class="panel-body">' +
    '<button @click="getData(dataSourceUrl)">{{blankRetryText}}</button></div></div></li>' +
    '<slot v-show="this.$children.length > 0"></slot>' +
    '</ul></div></div>',
    props: {

        blankText: [String],
        blankRetryText: [String],
        dataSourceUrl: {
            type: String
        },
        label: [String],
        icon: [String],
        action: {
            type: [String, Function]
        },
        actionLabel: [String],
        actionIcon: [String],
        errorText: [String],
    },
    data(){
        return {
            remoteOptions: [],
            searchFromServer: false,
            serverError: false,
            selectionsOpened: false,
            value: {
                twoWay: true
            }
        };
    },
    mounted(){

        app.$on('updateSelect', function (option) {
            console.log(this.value);
            this.value = option;

        });
    },
    watch: {
        "value": function (newVal, oldVal) {
            console.log(oldVal + " has been changed to " + newVal);

        }

    },
    methods: {
        select(option) {
            this.value = option
        },
        getData(dataSourceUrl){

            if ((dataSourceUrl !== undefined) && (dataSourceUrl !== '') && (dataSourceUrl !== null)) {
                this.searchFromServer = true;

                this.$http.get(dataSourceUrl + '/posts').then((response) => {
                    this.searchFromServer = false;
                    //TODO:this.remoteOptions = response.body; //but here I use fake json
                    this.remoteOptions = [
                        {label: "Option #1", icon: "bluetooth"},
                        {label: "Option #2", icon: "book"}
                    ];

                    //TODO:can simulate blank data with that:
                    //this.remoteOptions = [];

                    //TODO:this.remoteOptions.push({label: this.label, icon: this.icon}); //if needed we can add default value to list

                }, (response) => {
                    this.serverError = true;
                    this.searchFromServer = false;
                });

            }
        }
    }

})
;


new Vue({
    el: '#select'
});





