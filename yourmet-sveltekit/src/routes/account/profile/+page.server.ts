import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

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
    .optional()
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
    console.log(form);
	}
};
