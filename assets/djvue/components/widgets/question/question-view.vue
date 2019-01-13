<template>
	<div>
		<v-layout column pl-2>
          <h3 :class="`headline font-weight-light ${(validation != true)?'warning--text':'primary--text'}`">{{title}}</h3>
          <p class="body-1 font-weight-light">{{note}}</p>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row class="caption" color="warning" v-if="validation != true">
          <v-spacer></v-spacer>
          <div v-if="validation != true">
            <span class="warning--text caption pa-2 font-weight-light font-italic">{{validation}}</span>
          </div>
          <div v-else>
            <span class="caption pa-2">&nbsp;</span>
          </div>
        </v-layout>

	</div>
</template>

<script>

  
	export default {

		props:["title", "note", "validation"]

	}

</script>		