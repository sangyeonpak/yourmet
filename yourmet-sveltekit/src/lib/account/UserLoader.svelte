<script lang="ts">
	import { user } from "$lib/stores"
	import { checkUser } from '$lib/functions';
  checkUser($user.email);
</script>