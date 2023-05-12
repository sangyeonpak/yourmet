import { user, userInfo } from '$lib/stores';
import { get } from 'svelte/store';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { checkUser } from '$lib/functions';
import { setError, message, superValidate } from 'sveltekit-superforms/server';

const editProfileSchema = z.object({
	first_name: z
		.string()
		.min(2)
		.max(24)
		.regex(/^[a-zA-Z-" "]+$/)
		.optional(),
	last_name: z
		.string()
		.min(2)
		.max(24)
		.regex(/^[a-zA-Z-" "]+$/)
		.optional(),
	username: z
		.string()
		.min(4)
		.max(16)
		.regex(/^[a-zA-Z0-9_-]+$/)
		.optional(),
	favorite_artist: z
		.string()
		.max(48)
		.regex(/^[a-zA-Z0-9" "_-]+$/)
		.optional(),
	favorite_artwork: z
		.string()
		.max(48)
		.regex(/^[a-zA-Z0-9" "-]+$/)
		.optional(),
	favorite_period: z
		.string()
		.max(48)
		.regex(/^[a-zA-Z-" "]+$/)
		.optional(),
	email: z.string().optional()
});
export async function load(event) {
	const form = await superValidate(event, editProfileSchema);
	return {
		form
	};
}
export const actions = {
	default: async (event) => {
		const form = await superValidate(event, editProfileSchema);
		let before: string = event.url.href;
		let url = before.replace('/account/profile', `/api/users/`);
		// console.log(url);
		// console.log(JSON.stringify(form.data));
		const data = await fetch(url, {
			mode: 'cors',
			method: 'PATCH',
			body: JSON.stringify(form.data),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		console.log(data.status);
		if (data.status == 200) {
			const checked = await fetch(url + form.data.email, { method: 'GET' }).then((data) =>
				data.json()
			);
			if (checked.length == 0) {
				console.log('adding a new user');
				const added = await fetch(`/api/users/`, {
					mode: 'cors',
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(get(user))
				}).then((data) => data.json());
				userInfo.set(added);
			} else {
				userInfo.set(checked[0]);
				return message(form, 'Valid form');
			}
		} else {
			return setError(form, "username", "Username already exists.")
		}
	}
};
