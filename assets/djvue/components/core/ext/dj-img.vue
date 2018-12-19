<template>
	<div :class="{'v-responsive v-image':!error,'v-responsive':error}">
		<v-img :src="src" @error="onError" v-bind="$attrs">
		<v-icon v-if="error" v-bind="$attrs">{{icon}}</v-icon>
	</div>	
</template>	

<script>
	export default {
		inheritAttrs: false,
		props:["src","icon"],
		data: ()=>({
			error: false
		}),
		methods:{
			onError(){
				this.error = true
			}
		},
		watch:{
			src(newValue,oldValue){
				this.error = false
			}
		}
	}
</script>