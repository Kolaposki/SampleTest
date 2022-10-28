<template>
<div>
    <ul v-if="loading">
        <li>
            <div class="gifts-card">
            <div class="gifts-card__extra">
            </div>
            <div class="gifts-card__title">
                Loading...please wait
            </div>
            </div>
        </li>
    </ul>
    <ul v-if="!loading && permissions.length < 1">
        <li>
            <div class="gifts-card">
            <div class="gifts-card__extra">
            </div>
            <div class="gifts-card__title">
                No record at the moment
            </div>
            </div>
        </li>
    </ul>
    <ul v-if="!loading && permissions.length > 0">
        <form @submit.prevent="savePermissions">
            <overlay-scrollbars class="modal-body" uk-overflow-auto>
                <div class="flex-width-1-1 less-gp">
                <label  class="form-input" v-for="(permission , index) in permissions " :key="index" >
                    <span class="form-input__label">{{permission.description}}</span>
                    
                    <label>
                        <input v-model="permission.active" type="checkbox" >
                    </label>
                </label>
                </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
                <button type="submit" id="savePermissions" class="btn btn--primary ml-1">
                + Save Permissions
                </button>
            </div>
        </form>
    </ul>
 </div>
</template>
<script>
export default {
	layout: 'main',
    data: () => ({
		permissions: [],
        permission_data: [],
        user_id : '',
        loading: true
    }),
	methods: {
		listPermissions(id) {
            this.user_id = id;
            let request = {
                url : '/user_permissions',
                method: 'get',
                params: {
                    id: this.user_id 
                }
            }
			this.$store.dispatch('api/makeAPICall', request)
				.then((res) =>{
                    this.loading = false
                    this.permissions = res.data.data
                    // this.permissions.forEach(permission => {
                    //     this.permission_data[permission.id] = permission.active
                    // })
				})
        },
        reset() {
            this.permissions = []
            this.permission_data = []
            this.user_id = ''
        },
        savePermissions() {
            this.permissions.forEach(permission => {
                if (permission.active){
                    this.permission_data.push(permission.id)
                }
            })

            let request = {
                url : '/user_permissions',
                method: 'post',
                params: {
                    id : this.user_id,
                },
                data: {
                    permissions: JSON.stringify(this.permission_data)
                } 
            }
			
			$("#savePermissions").attr('disabled', true).html('Saving...please wait')
			this.$store.dispatch('api/makeAPICall', request)
				.then(res =>{
					$("#savePermissions").attr('disabled', false).html('Save Permissions')
					if(res.data.status === 'True') {
                        this.$toast.success(res.data.message)
                        this.listPermissions(this.user_id)
                        this.$emit('saved');
						return
					}
			
			    this.$toast.error(res.data.message)
				}).catch(err =>{
					$("#savePermissions").attr('disabled', false).html('Save Permissions')
					this.$toast.error('An error occurred')
				})
		},
	},
}
</script>