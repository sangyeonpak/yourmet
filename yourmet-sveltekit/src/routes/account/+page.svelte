<script lang="ts">
	import { userInfo, gallery, seen } from '$lib/stores';
	let today = new Date();
	let greeting: string;
  let displayed = [...$gallery];
  $: filtered = displayed.filter(container => container.image_id !== null);
	if (today.getHours() > 0 && today.getHours() < 12) {
		greeting = 'morning';
	} else if (today.getHours() >= 12 && today.getHours() < 18) {
		greeting = 'afternoon';
	} else {
		greeting = 'evening';
	}
</script>

<title>Account - YourMet</title>
{#if $userInfo}
	<div class="stats">
		<div class="accountHeader">
			{#if $userInfo.first_name}Good {greeting}, {$userInfo.first_name}.{:else}Good {greeting}.{/if}
		</div>
		<div class="seen">
			{#if $seen.length == 0}
				<span class="info">You have not seen any artworks yet.</span>
			{:else if $seen.length == 1}
				<span class="info">You have seen 1 artwork. It is:</span>
				<ul>
					<li>
						<a href={$seen[0].info_url} target="_blank" rel="noreferrer" class="listInfo">
							{$seen[0].artist || 'Unknown artist'} -
							<span class="name">{$seen[0].name || 'Untitled'}</span>
						</a>
					</li>
				</ul>
			{:else}
				<span class="info">You have seen {$seen.length} artworks. They are:</span>
				<ul>
					{#each $seen as artwork}
						<li>
							<a href={artwork.info_url} target="_blank" rel="noreferrer" class="listInfo">
								{artwork.artist || 'Unknown artist'} -
								<span class="name">{artwork.name || 'Untitled'}</span>
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="gallery">
			{#if filtered.length == 0}
				<span class="info">You have not displayed any artworks yet.</span>
			{:else if filtered.length == 1}
				<span class="info"
					>You have 1 displayed artwork. It is:
					<ul>
						<li>
							<a href={filtered[0].info_url} target="_blank" rel="noreferrer" class="listInfo">
								{filtered[0].artist || 'Unknown artist'} -
								<span class="name">{filtered[0].name || 'Untitled'}</span>
							</a>
						</li>
					</ul>
				</span>
			{:else}
				<span class="info"
					>You have {filtered.length} displayed artworks. They are:
					<ul>
						{#each filtered as artwork}
							<li>
								<a href={artwork.info_url} target="_blank" rel="noreferrer" class="listInfo">
									{artwork.artist || 'Unknown artist'} -
									<span class="name">{artwork.name || 'Untitled'}</span>
								</a>
							</li>
						{/each}
					</ul>
				</span>
			{/if}
		</div>
	</div>
{/if}

<style>
	.info {
		font-weight: 500;
	}
	.seen {
		margin-bottom: 5%;
	}
	.stats {
		text-align: start;
		padding: 3% 12% 0 12%;
	}
	ul {
		margin-top: 1rem;
	}
	.name {
		font-style: italic;
		font-weight: 500;
	}
	a {
		font-weight: 400;
	}
	li {
		margin-bottom: 1rem;
	}
	li:hover {
		text-decoration: underline;
	}
</style>
