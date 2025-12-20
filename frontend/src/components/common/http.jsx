export const apiUrl = 'http://localhost:8000/api'

export const adminToken = () => {
    const data = JSON.parse(localStorage.getItem('adminInfo'))
    return data.token;
}

export const userToken = () => {
    const raw = localStorage.getItem('userInfo');
    if (!raw) return null;

    try {
        return JSON.parse(raw)?.token || null;
    } catch {
        return null;
    }
};

export const STRIPE_PUBLIC_KEY = 'pk_test_51SfujUEIThi7WV18XSY4OpxfCtPEs2wdmHeOJWMtgXuDcB904T0edjw5tHxETUE2iZTNwnKH6B0HTy0XgIzErGry00kxzOVHfS'

