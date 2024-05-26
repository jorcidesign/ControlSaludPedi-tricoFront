const API_URL = '/api/Service.svc';

const iniciarSesion = async (email, contrasena) => {
    try {
        console.log(email);
        console.log(contrasena);

        const response = await fetch(`${API_URL}/IniciarSesion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, contrasena })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong');
        }

        return await response.json();
    } catch (error) {
        console.error('Error iniciando sesión:', error.message);
        throw error;
    }
};

export { iniciarSesion };