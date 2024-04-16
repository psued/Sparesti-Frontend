<template>
	<div>
		<div class="static-content">
			<p>Welcome to SpareSti! <br>Application to make your wallet happier. <br>Free to use, money back guarantee.</p>
		</div>
		<div class="dynamic-content">
      <component :is="components[currentView]" @change-view="changeView" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import SignUpForm from '../components/SignUpForm.vue'
import CompleteAccountForm from '../components/CompleteAccountForm.vue'

type ComponentMap = {
  [key: string]: ReturnType<typeof defineComponent>;
};

const components: ComponentMap = {
	LoginForm,
	SignUpForm,
	CompleteAccountForm
}

const currentView = ref('LoginForm');

const changeView = (viewName: string) => {
  if (components[viewName]) {
		console.log('Changing view to', viewName);
    currentView.value = viewName;
  } else {
    console.error(`The component ${viewName} does not exist.`);
  }
};
</script>

<style scoped>
.static-content {
	font-size: 1.5rem;
	text-align: center;
	margin-top: 2rem;
	color: #000;
}
</style>
