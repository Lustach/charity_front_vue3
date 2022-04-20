<template>
  <div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  name: 'ResetPasswordSpacer',
  mounted() {
    localStorage.setItem('ResU',this.$route.query.u);
    localStorage.setItem('ResT',this.$route.query.tk);
    this.$router.push('/password?action=create');
  },
  methods: {
    ...mapMutations(['setState',]),
  },
};
</script>

<style scoped>

</style>
