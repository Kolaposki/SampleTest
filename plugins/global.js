import Vue from 'vue';

Vue.mixin({
    data: () => ({
        showTimePanel: false,
        showTimeRangePanel: false,
    }),
    computed: {
        user() {
            let data = {};
            Object.assign(data, this.$store.getters['authenticate/getUserData']);
            if (Object.entries(data).length > 0) {
                if (data.role != undefined && (data.role.toLowerCase().includes('administrator') || data.role.toLowerCase().includes('business_owner'))) {
                    data.id = data.merchID
                }

                // if (data.branchID  != undefined) {
                // 	data.branchID = JSON.stringify(data.branchID)
                // }

                return data
            } else {
                this.setToken()
                let data = JSON.parse(localStorage.getItem('user'))

                if (data.role != undefined && (data.role.toLowerCase().includes('administrator') || data.role.toLowerCase().includes('business_owner'))) {
                    data.id = data.merchID
                }

                return data
            }
        },
        showing() {

            // console.log(Number(this.headers.pagenum) - 1);
            let total = this.headers.total != undefined ? Number(this.headers.total) : 0;
            let Count = this.headers.Count != undefined ? Number(this.headers.Count) : 0;

            let from = (this.headers.pagenum != null) && Number(this.headers.pagenum) - 1 > 1 ? (((Number(this.headers.pagenum) - 1) * 10) - 10) : 1;
            // console.log('checking page num ' + from)
            let to = from == 1 ? total : from + total;
            from = from > 1 ? from + 1 : from

            // console.log(this.$route.name)


            if (this.$route.name.includes('rider') || this.$route.name.includes('reports-branch-sales')) {
                this.headers.last = this.headers.pagenum != null && this.headers.pagenum != "" ? Math.ceil(Count / 10) == (Number(this.headers.pagenum) - 1) : true;
            } else {
                this.headers.last = this.headers.pagenum != null && this.headers.pagenum != "" ? Math.ceil(Count / 10) == (Number(this.headers.pagenum) - 1) : true;
            }
            // this.headers.last = ((Number(this.headers.pagenum) - 1) * 10) >= Count;
            if (Count == 0) {
                from = 0
            }

            // console.log(this.headers.last)

            if (this.headers.last != undefined && this.headers.last) {

                return (Count - total) + 1 + ' - ' + Count
            }
            return from + ' - ' + to;
        },
        isMerchant() {
            return this.user.role == undefined;
        },
        isSupervisor() {
            let result = this.user.role != undefined ? this.user.role.toLowerCase().includes('administrator') : false;

            // if (result && this.formData != undefined) {
            // 	this.formData.branchID = this.user.branchID
            // }else if(!result && this.formData != undefined){
            // 	this.formData.branchID = ''
            // }
            // if (result && this.editData != undefined) {
            // 	this.editData.branchID = this.user.branchID
            // } else if(!result && this.editData != undefined){
            // 	this.editData.branchID = ''
            // }

            // if (result && this.get != undefined) {
            // 	this.get.branchID = this.user.branchID
            // } else if(!result && this.get != undefined){
            // 	this.get.branchID = ''
            // }
            return result;

        },
        // permission(){
        //     let result = this.user.rolepermission.filter(permission => permission.dashboard.toLowerCase().includes('viewdashboard'))
        //     console.log("result", result)
        // },
        new_data() {
            // let res = JSON.stringify(this.user.branchID)
            let result = {}
            if (this.listProductData != undefined) {
                result = Object.assign({}, this.listProductData)
            } else {
                result = Object.assign({}, this.formData)
            }
            if (this.isSupervisor && result.branchID == '') {
                result.branchID = JSON.stringify(this.user.branchID)
            }
            return result
        }
    },
    methods: {
        is401(x) {
            if (x == '401') {
                localStorage.clear();
                location.href = '/?sessionexpire=' + true;
            }
            if (x == '500') {
                this.$swal.fire('Error', 'Server error, please contact Admin.', 'error')
            }
        },
        range(start, stop, step) {
            return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
        },
        toggleTimePanel() {
            this.showTimePanel = !this.showTimePanel;
        },
        toggleTimeRangePanel() {
            this.showTimeRangePanel = !this.showTimeRangePanel;
            if (this.showTimeRangePanel) {
                // document.querySelector('.mx-table.mx-table-date thead').style.display = 'none'
                document.querySelectorAll('.mx-table.mx-table-date').forEach(el => {
                    el.style.display = 'none'
                });
            } else {
                // document.querySelector('.mx-table.mx-table-date thead').style.display = 'none'
                document.querySelectorAll('.mx-table.mx-table-date').forEach(el => {
                    el.style.display = ''
                });
            }


        },
        handleOpenChange() {
            this.showTimePanel = false;
        },
        handleRangeClose() {
            this.showTimeRangePanel = false;
            const all = document.querySelectorAll('.mx-table.mx-table-date')
            if (all != null) {
                // all.style.display = 'none'
                all.forEach(el => {
                    el.style.display = ''
                });
            }
        },
        toggleDropdown(e) {
            const parent = e.currentTarget.parentElement;
            parent.querySelector('[data-drop-down]').classList.toggle('active')
        },
        togglePassword(elementId, type, counterpart) {
            if (type.includes('off')) {
                document.getElementById(elementId).type = 'password'
                document.getElementById(type).style.display = 'none'
                document.getElementById(counterpart).style.display = 'block'
            } else {
                document.getElementById(type).style.display = 'none'
                document.getElementById(counterpart).style.display = 'block'
                document.getElementById(elementId).type = 'text'
            }
        },
        startDownload() {
            let btn = document.getElementById('download')
            btn.textContent = 'Loading...'
            btn.disabled = true


        },
        finishDownload() {
            let btn = document.getElementById('download')
            btn.textContent = 'Export'
            btn.disabled = false
        },
        async fetchData() {
            if (this.date !== '' && this.date[0] != null) {
                this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD')
                this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD')
            } else {
                this.formData.startdate = ''
                this.formData.enddate = ''
            }
            this.formData.export = true
            const response = await this.$store.dispatch(this.api, this.formData)
                // axios.get('https://holidayapi.com/v1/holidays?key=a4b2083b-1577-4acd-9408-6e529996b129&country=US&year=2017&month=09');
            // console.log(('hello'))
            // console.log(response);
            // if (response.data.data.data != undefined) {
            //     return response.data.data.data;
            // } else if (response.data.data != undefined) {
            //     return response.data.data;
            // } else 
            if (response.data != undefined) {
                return response.data;
            } else {
                // location.href = '/?sessionexpire=' + true;
                return []
            }
        },

        formatPrice(price) {
            price = Number(price).toFixed(2);
            var str = price.toString().split(".");
            if (str[0].length >= 3) {
                str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
            }
            // if (!str[1]) {
            //   str[1] = "00";
            // }
            return str.join(".");
        },
        formNumber(number) {
            var nf = new Intl.NumberFormat()
            return (nf.format(Number(number).toFixed(2)));
        },
        removeFloat(number) {
            return Math.trunc(number)
        },
        setToken() {
            this.$store.dispatch('authenticate/setUserData', JSON.parse(localStorage.getItem('user')))
        },
        setData(data) {
            localStorage.removeItem('user')
            this.$store.dispatch('authenticate/clearUserData')
            localStorage.setItem('user', JSON.stringify(data))
            this.$store.dispatch('authenticate/setUserData', data)
        },
        headerName() {
            let names = this.$route.name
            let string = names.split('-')
            return string[0]
        },
        toggleNav() {

            let mainHeader = document.querySelector('#main-header')
            let closeBtn = document.querySelector('.close-btn')
            let navEl = document.querySelector('#mainbar')
            let toggler = document.querySelector('[data-nav-toggler]')
            let menuBtn = document.querySelector('#menu-btn')
            let closeNavDrawer = document.querySelector('.close-nav-drawer')

            if (menuBtn != undefined) {
                menuBtn.addEventListener('click', function(e) {
                    if (e.target.matches('[data-nav-toggler]')) {
                        navEl.classList.contains('is-active') ? navEl.classList.remove('is-active') : navEl.classList.add('is-active');
                        e.target.classList.contains('is-clicked') ? e.target.classList.remove('is-clicked') : e.target.classList.add('is-clicked');
                    } else {
                        navEl.classList.remove('is-active');
                        toggler.classList.remove('is-clicked');
                    }
                }, false);
            }
            if (document.querySelector('.close-nav-drawer') != undefined) {
                if (document.querySelector('.close-nav-drawer')) {
                    closeNavDrawer.addEventListener('click', function(e) {
                        navEl.classList.remove('is-active');
                        toggler.classList.remove('is-clicked');
                    });
                };
            }
        },
        getParamNameSalesReport() {
            let names = this.$route.name
            let string = names.split('-')
            if (string[0].localeCompare('Reports')) {
                let page = window.location.pathname
                if (page === '/reports/sales-report/walkin') {
                    return ' -  Order Status '
                } else if (page === '/reports/sales-report/online') {
                    return ' - Online Order Status '
                }
                else if (page === '/reports/all-sales/') {
                    return ' - Total Order Status '
                }else if (page=='/reports/product-sales/'){
                    return ' - Daily Sales Report '
                }else if (page.includes('reports/')) {
                    // console.log(page)
                    page = page.split('/');
                    let title = page.pop();
                    if (title == '') {
                        title = page.pop();
                    }
                    return '- ' + title.charAt(0).toUpperCase() + title.substr(1, title.length).replace('-', ' ');
                } else {
                    return ''
                }
            }
            return ''
        },
        formatNotificationData(number) {
            return Math.abs(number)
        },
        checkAuthentication() {
            if (localStorage.getItem('token') === '') {
                this.$router.push('/')
            }
        },
        generateRefNumber(len) {
            let arr = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let ans = '';
            for (let i = len; i > 0; i--) {
                ans += arr[Math.floor(Math.random() * arr.length)];
            }
            return ans;
        },
        setHeadersData() {

        },
        setHeaders(data, headers) {
            this.headers.Next = headers.Next
            this.headers.Prev = headers.Prev
            this.headers.Count = headers.Count
            this.headers.total = data.length

            const urlParams = new URLSearchParams(this.headers.Next.substring(this.headers.Next.lastIndexOf('/')));
            this.headers.pagenum = urlParams.get('page') != undefined ? urlParams.get('page') : urlParams.get('pagenum')

            if (this.headers.pagenum !== '') {
                // console.log('we are not')
                this.headers.last = false

            } else {
                this.headers.last = true
                    // this.headers.pagenum = 1
            }

            // console.log(this.headers)
        },
        slugify(text, separator = "-") {
            return text
                .toString()
                .normalize('NFD') // split an accented letter in the base letter and the acent
                .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
                .replace(/\s+/g, separator);
        }
    },
    mounted() {
        this.checkAuthentication()
    }
});