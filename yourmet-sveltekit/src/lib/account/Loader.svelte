<script lang="ts">
	import { user } from "$lib/stores"
	import { reload } from '$lib/functions';
  reload(1, $user.email);
</script>