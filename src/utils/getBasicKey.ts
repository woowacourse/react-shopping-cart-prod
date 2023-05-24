const getBasicKey = (id: string, password: string) => btoa(`${id}:${password}`);

export default getBasicKey;
