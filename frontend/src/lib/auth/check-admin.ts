export async function checkIsAdmin() {
    const res = await fetch("/api/auth/is-admin");

    return res.ok
}
