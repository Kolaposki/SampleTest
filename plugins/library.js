import Vue from 'vue'
import Select2MultipleControl from 'v-select2-multiple-component';
import Select2 from 'v-select2-component';
import Vueditor from 'vueditor'
import vueMultiSelect from 'vue-multi-select';
import 'vueditor/dist/style/vueditor.min.css'
import 'vue-multi-select/dist/lib/vue-multi-select.css'
import VueGraph from 'vue-graph'
import GraphLine3D from 'vue-graph/src/components/line3d.js'
import NoteWidget from 'vue-graph/src/widgets/note.js'
import LegendWidget from 'vue-graph/src/widgets/legends.js'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import VueClipboard from 'vue-clipboard2'
import JsonExcel from "vue-json-excel";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueIntro from 'vue-introjs'
import 'intro.js/introjs.css';
import Vuetify from 'vuetify';
import VueBarcodeScanner from 'vue-barcode-scanner'
import 'chart.js'
import 'hchs-vue-charts'

Vue.use(window.VueCharts);
 

let config = {
	toolbar: [
		'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
		'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
		'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
		'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView'
	],
	fontName: [
		{val: 'arial black'},
		{val: 'times new roman'},
		{val: 'Courier New'}
	],
	fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
	uploadUrl: ''
};


Vue.use(VueGraph)
Vue.use(VueClipboard)
Vue.component('Select2MultipleControl', Select2MultipleControl);
Vue.component('Select2', Select2);
Vue.use(Vueditor, config);
Vue.component('vueMultiSelect', vueMultiSelect)
Vue.component(GraphLine3D.name, GraphLine3D);
Vue.component(NoteWidget.name, NoteWidget);
Vue.component(LegendWidget.name, LegendWidget);
Vue.component('VueGoogleAutocomplete', VueGoogleAutocomplete)
Vue.component("downloadExcel", JsonExcel);
Vue.component("DatePicker", DatePicker);
// Vue.component("DatePicker", VueCtkDateTimePicker);
Vue.component('overlay-scrollbars', OverlayScrollbarsComponent);
Vue.use(VueIntro);
Vue.use(Vuetify);

Vue.prototype.slugify = function (separator = "-") {
    return this
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separator);
};
 
// inject vue barcode scanner
Vue.use(VueBarcodeScanner)