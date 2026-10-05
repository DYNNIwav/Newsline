import { supabase } from './supabase.js';

export async function getUser() {
    const { data } = await supabase.auth.getSession();
    return data.session ? data.session.user : null;
}

export async function isLoggedIn() {
    const user = await getUser();
    return user !== null;
}

export async function register(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: new URL('./login.html', window.location.href).href,
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        if (error.message === 'Email not confirmed') {
            throw new Error('You need to confirm your email first. Check your inbox for the link.');
        }
        if (error.message === 'Invalid login credentials') {
            throw new Error('Wrong email or password.');
        }
        throw new Error(error.message);
    }

    return data;
}

export async function logout() {
    await supabase.auth.signOut();
}
