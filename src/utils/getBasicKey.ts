const getBasicKey = (id: string, password: number) => btoa(`${id}:${password}`);

export default getBasicKey;
