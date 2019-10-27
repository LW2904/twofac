import { useRef, useEffect } from 'react';

import totp from 'steam-totp';

export function getBaseName() {
	const { PUBLIC_URL } = process.env;

	return PUBLIC_URL ?
		new URL(PUBLIC_URL).pathname
	: '/';
}

export function generateMobileCode(secret, offset = 0) {
    if (!secret) {
        return '';
    }

    return totp.getAuthCode(secret, offset);
}

export function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export function getRemainingTime() {
    return 30 - (Math.floor(Date.now() / 1000) % 30);
}

export function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export class LocalSecretStore {
    static prefix = 'secret_';

    static parseAlias(alias) {
        return alias.split(LocalSecretStore.prefix)[1];
    }

    static getAll() {
        const secrets = [];

        for (let i = 0; i < localStorage.length; i++) {
            const alias = localStorage.key(i);

            if (!alias.includes(LocalSecretStore.prefix))
                continue;

            secrets.push({
                alias: LocalSecretStore.parseAlias(alias),
                secret: localStorage.getItem(alias),
            });
        }

        return secrets;
    }

    static get(alias) {
        return localStorage.getItem(LocalSecretStore.prefix + alias);
    }

    static add(alias, secret) {
        localStorage.setItem(LocalSecretStore.prefix + alias, secret);
    }

    static remove(alias) {
        localStorage.removeItem(LocalSecretStore.prefix + alias);
    }
}
