<script lang="ts">
	import { user, userInfo, seen, gallery } from "$lib/stores";
	import { checkUser } from '$lib/functions'
	checkUser($user.email)
</script>